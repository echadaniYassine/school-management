<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class BlogPostController extends Controller
{
    protected string $imageDisk = 'public';
    protected string $imagePath = 'blog_images';

    public function __construct()
    {
        $this->authorizeResource(BlogPost::class, 'blog_post');
    }

    public function index()
    {
        // Public view is allowed by the policy.
        $posts = BlogPost::with('author')->latest('updated_at')->paginate(10);
        return BlogPostResource::collection($posts);
    }

    public function store(StoreBlogPostRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['author_id'] = auth()->id();

        if ($request->hasFile('featured_image_file')) {
            $path = $request->file('featured_image_file')->store($this->imagePath, $this->imageDisk);
            $validatedData['featured_image'] = $path;
        }

        $blogPost = BlogPost::create($validatedData);

        return (new BlogPostResource($blogPost->load('author')))
                ->response()
                ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(BlogPost $blogPost)
    {
        // Public view is allowed by the policy.
        return new BlogPostResource($blogPost->load('author'));
    }

    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('featured_image_file')) {
            if ($blogPost->featured_image) {
                Storage::disk($this->imageDisk)->delete($blogPost->featured_image);
            }
            $path = $request->file('featured_image_file')->store($this->imagePath, $this->imageDisk);
            $validatedData['featured_image'] = $path;
        } elseif ($request->boolean('featured_image_remove')) {
            if ($blogPost->featured_image) {
                Storage::disk($this->imageDisk)->delete($blogPost->featured_image);
            }
            $validatedData['featured_image'] = null;
        }

        $blogPost->update($validatedData);
        // BEST PRACTICE: Use fresh()->load('relation') for consistency or fresh() if relation isn't always needed.
        return new BlogPostResource($blogPost->fresh()->load('author'));
    }

    public function destroy(BlogPost $blogPost)
    {
        if ($blogPost->featured_image) {
            Storage::disk($this->imageDisk)->delete($blogPost->featured_image);
        }
        $blogPost->delete();
        return response()->noContent();
    }
}