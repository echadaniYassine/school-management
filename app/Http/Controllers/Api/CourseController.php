<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CourseController extends Controller
{
    public function __construct()
    {
        // FIXED: Parameter name now matches route model binding.
        $this->authorizeResource(Course::class, 'course');
    }

    public function index(Request $request)
    {
        // Public view is allowed by the policy.
        $query = Course::query();

        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(fn ($q) => 
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('code', 'like', "%{$searchTerm}%")
                  ->orWhere('instructor', 'like', "%{$searchTerm}%")
            );
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $courses = $query->latest()->paginate($request->input('per_page', 15));
        return CourseResource::collection($courses);
    }

    public function store(StoreCourseRequest $request)
    {
        $course = Course::create($request->validated());
        return (new CourseResource($course))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Course $course)
    {
        // Public view is allowed by the policy.
        return new CourseResource($course);
    }

    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());
        return new CourseResource($course->fresh());
    }

    public function destroy(Course $course)
    {
        $course->delete();
        // BEST PRACTICE: Return 204 No Content for successful deletion.
        return response()->noContent();
    }
}