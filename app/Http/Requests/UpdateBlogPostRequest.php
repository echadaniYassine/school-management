<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBlogPostRequest extends FormRequest
{
    public function authorize(): bool
    {
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
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:50',
            'featured_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'featured_image_remove' => 'nullable|boolean',
            'published_at' => 'nullable|date_format:Y-m-d H:i:s',
        ];
    }
    
    protected function prepareForValidation(): void
    {
        if ($this->has('tags') && is_string($this->tags)) {
            $this->merge(['tags' => array_map('trim', explode(',', $this->tags))]);
        } elseif ($this->has('tags') && !is_array($this->tags)) {
             $this->merge(['tags' => []]);
        }

        if ($this->has('featured_image_remove')) {
            $this->merge([
                'featured_image_remove' => filter_var($this->featured_image_remove, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE),
            ]);
        }
    }
}