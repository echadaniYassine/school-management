<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Http\Resources\BlogPostResource;
use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;

class BlogPostController extends Controller
{
    /**
     * Apply the BlogPostPolicy to all resourceful methods.
     * This single line secures the entire controller based on the policy rules.
     */
    public function __construct()
    {
        $this->authorizeResource(BlogPost::class, 'blog_post');
    }

    /**
     * Display a listing of the resource.
     * Anyone (including guests) can view the list of posts.
     */
    public function index()
    {
        // Eager load the author relationship to prevent N+1 query problem.
        // We only select the columns we need from the users table for efficiency.
        $posts = BlogPost::with('author:id,name,role')->latest('published_at')->paginate(10);

        return BlogPostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     * Any authenticated user can create a post.
     */
    public function store(StoreBlogPostRequest $request)
    {
        $validatedData = $request->validated();

        // The author is always the currently authenticated user.
        $validatedData['author_id'] = Auth::id();

        // Handle file upload if present.
        if ($request->hasFile('featured_image_file')) {
            $validatedData['featured_image'] = $request->file('featured_image_file')->store('blog_images', 'public');
        }

        $blogPost = BlogPost::create($validatedData);

        // Return the new resource with the author relationship loaded.
        return new BlogPostResource($blogPost->load('author:id,name,role'));
    }

    /**
     * Display the specified resource.
     * Anyone (including guests) can view a single post.
     */
    public function show(BlogPost $blogPost)
    {
        // Eager load the author relationship for this single post.
        return new BlogPostResource($blogPost->load('author:id,name,role'));
    }

    /**
     * Update the specified resource in storage.
     * Only the original author or an admin can update.
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost)
    {
        $validatedData = $request->validated();

        // Handle file updates or removal.
        if ($request->hasFile('featured_image_file')) {
            // Delete the old image if it exists.
            if ($blogPost->featured_image) {
                Storage::disk('public')->delete($blogPost->featured_image);
            }
            // Store the new image.
            $validatedData['featured_image'] = $request->file('featured_image_file')->store('blog_images', 'public');
        } elseif ($request->boolean('featured_image_remove')) {
            // If the remove flag is sent and is true.
            if ($blogPost->featured_image) {
                Storage::disk('public')->delete($blogPost->featured_image);
            }
            $validatedData['featured_image'] = null;
        }

        $blogPost->update($validatedData);

        // Use fresh() to get the model with all updates, then load the relationship.
        return new BlogPostResource($blogPost->fresh()->load('author:id,name,role'));
    }

    /**
     * Remove the specified resource from storage.
     * Only the original author or an admin can delete.
     */
    public function destroy(BlogPost $blogPost)
    {
        // Delete the associated featured image from storage first.
        if ($blogPost->featured_image) {
            Storage::disk('public')->delete($blogPost->featured_image);
        }

        $blogPost->delete();

        // Return a 204 No Content response, which is standard for a successful delete.
        return response()->noContent();
    }
}