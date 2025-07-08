<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBlogPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Correctly authorizes against the specific blog post being updated.
        return $this->user()->can('update', $this->route('blog_post'));
    }

    public function rules(): array
    {
        $postId = $this->route('blog_post')->id;

        return [
            'title' => 'sometimes|required|string|max:255',
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', Rule::unique('blog_posts', 'slug')->ignore($postId)],
            'content' => 'sometimes|required|string',
            'status' => ['sometimes', 'required', 'string', Rule::in(['published', 'draft', 'archived'])],
            'category' => 'nullable|string|max:100',
            // 'tags' => 'nullable|array',
            // 'tags.*' => 'nullable|string|max:50',
            'featured_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'featured_image_remove' => 'nullable|boolean', // For explicitly removing the image
            'published_at' => 'nullable|date_format:Y-m-d H:i:s',
        ];
    }
    
    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Handles converting a comma-separated string of tags into an array.
        if ($this->has('tags') && is_string($this->tags)) {
            $this->merge(['tags' => array_map('trim', explode(',', $this->tags))]);
        } elseif ($this->has('tags') && !is_array($this->tags)) {
             $this->merge(['tags' => []]);
        }

        // Ensures the 'featured_image_remove' input is a proper boolean.
        if ($this->has('featured_image_remove')) {
            $this->merge([
                'featured_image_remove' => filter_var($this->featured_image_remove, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE),
            ]);
        }
    }
}