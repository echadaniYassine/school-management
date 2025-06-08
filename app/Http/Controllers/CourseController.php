<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\CourseResource;
use App\Http\Requests\StoreCourseRequest; // Recommended
use App\Http\Requests\UpdateCourseRequest; // Recommended
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Course::class, 'course');
    }

    public function index(Request $request)
    {
        // Use with('teacher') to prevent N+1 query problem
        $query = Course::with('teacher');

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('code', 'like', "%{$searchTerm}%")
                  // Search relationship for teacher name
                  ->orWhereHas('teacher', function ($subQ) use ($searchTerm) {
                      $subQ->where('name', 'like', "%{$searchTerm}%");
                  });
            });
        }

        $courses = $query->latest()->paginate(15);
        return CourseResource::collection($courses);
    }

    public function store(StoreCourseRequest $request)
    {
        $validatedData = $request->validated();
        // The creator is the logged-in user (who must be a teacher)
        $validatedData['teacher_id'] = Auth::id();

        $course = Course::create($validatedData);
        return new CourseResource($course->load('teacher'));
    }

    public function show(Course $course)
    {
        return new CourseResource($course->load('teacher'));
    }

    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());
        return new CourseResource($course->load('teacher'));
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return response()->noContent();
    }
}