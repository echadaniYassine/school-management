<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBlogPostRequest;
use App\Http\Requests\Admin\UpdateBlogPostRequest;
use App\Http\Resources\Admin\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth; // Import Auth

class BlogPostController extends Controller
{
    protected $imageDisk = 'public'; // Define the disk, e.g., 'public', 's3'
    protected $imagePath = 'blog_images'; // Define the base path for images on the disk

    public function index()
    {
        $posts = BlogPost::latest('updated_at')->paginate(10);
        return BlogPostResource::collection($posts);
    }

    public function store(StoreBlogPostRequest $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('featured_image_file') && $request->file('featured_image_file')->isValid()) {
            $path = $request->file('featured_image_file')->store($this->imagePath, $this->imageDisk);
            $validatedData['featured_image'] = $path; // Store the relative path
        }

        if (empty($validatedData['author']) && Auth::check()) {
            $validatedData['author'] = Auth::user()->name; // Get name of authenticated user
        }
        // If using author_id:
        // if (Auth::check()) {
        //     $validatedData['author_id'] = Auth::id();
        // }


        $blogPost = BlogPost::create($validatedData);
        return new BlogPostResource($blogPost);
    }

    public function show(BlogPost $blogPost)
    {
        return new BlogPostResource($blogPost);
    }

    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('featured_image_file') && $request->file('featured_image_file')->isValid()) {
            // Delete old image if it exists
            if ($blogPost->featured_image) {
                Storage::disk($this->imageDisk)->delete($blogPost->featured_image);
            }
            $path = $request->file('featured_image_file')->store($this->imagePath, $this->imageDisk);
            $validatedData['featured_image'] = $path;
        } elseif ($request->filled('featured_image_remove') && $request->boolean('featured_image_remove')) {
            if ($blogPost->featured_image) {
                Storage::disk($this->imageDisk)->delete($blogPost->featured_image);
            }
            $validatedData['featured_image'] = null;
        }
        // Ensure featured_image is not removed from $validatedData if neither file nor remove flag is present
        // (it won't be unless explicitly set above, which is good)


        $blogPost->update($validatedData);
        return new BlogPostResource($blogPost->fresh()); // Use fresh to get updated relations/timestamps
    }

    public function destroy(BlogPost $blogPost)
    {
        if ($blogPost->featured_image) {
            Storage::disk($this->imageDisk)->delete($blogPost->featured_image);
        }
        $blogPost->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}