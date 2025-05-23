<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBlogPostRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Add admin authorization logic
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug',
            'content' => 'required|string',
            'status' => ['required', 'string', Rule::in(['published', 'draft', 'archived'])],
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:50',
            'featured_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // Validate the uploaded file
            'author' => 'nullable|string|max:100',
            // 'author_id' => 'nullable|exists:users,id', // If using author_id
            'published_at' => 'nullable|date_format:Y-m-d H:i:s',
        ];
    }

    /**
     * Prepare the data for validation.
     * Sometimes tags might come as a string from FormData, convert to array.
     */
    protected function prepareForValidation()
    {
        if ($this->has('tags') && is_string($this->tags)) {
            $this->merge([
                'tags' => array_map('trim', explode(',', $this->tags)),
            ]);
        } elseif ($this->has('tags') && !is_array($this->tags)) {
             $this->merge(['tags' => []]); // Ensure it's an array or empty if malformed
        }
    }
}