<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;

class CourseController extends Controller
{
    public function index()
    {
        // Only admins can see the full list of courses.
        $this->authorize('admin');
        $courses = Course::with(['classroom.grade', 'subject', 'teacher'])->get();
        return CourseResource::collection($courses);
    }
    public function store(StoreCourseRequest $request)
    {
        $course = Course::create($request->validated());
        return new CourseResource($course->load(['classroom', 'subject', 'teacher']));
    }
    public function show(Course $course)
    {
        $this->authorize('admin');
        return new CourseResource($course->load(['classroom', 'subject', 'teacher']));
    }
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());
        return new CourseResource($course->fresh()->load(['classroom', 'subject', 'teacher']));
    }
    public function destroy(Course $course)
    {
        $this->authorize('admin');
        $course->delete();
        return response()->noContent();
    }
}
