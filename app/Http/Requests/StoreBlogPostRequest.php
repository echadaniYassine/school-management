<?php
namespace App\Http\Requests;

use App\Models\BlogPost;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBlogPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', BlogPost::class);
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug',
            'content' => 'required|string',
            'status' => ['required', 'string', Rule::in(['published', 'draft', 'archived'])],
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:50',
            'featured_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
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
    }
}