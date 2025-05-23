<?php

namespace App\Http\Controllers; // Ensure this is App\Http\Controllers\Api\CategoryController if using API prefix

use App\Models\Category;
use App\Http\Resources\CategoryResource; // Import CategoryResource
use Illuminate\Http\Request;
// If this controller is for API, it should be in App\Http\Controllers\Api
// and extend App\Http\Controllers\Controller or a base API controller.

class CategoryController extends Controller // Or Api\CategoryController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return all categories, ordered by name. Not paginated for a dropdown.
        $categories = Category::orderBy('name')->get();
        return CategoryResource::collection($categories);
    }

    // ... other CRUD methods if you want full category management via API
    // For now, only index is needed for the course form.
    // Implement store, show, update, destroy similarly to CourseController if needed.
}