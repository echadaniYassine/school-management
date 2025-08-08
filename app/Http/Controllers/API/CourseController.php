<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;

class CourseController extends Controller
{
    public function index()
    {
        // THE FIX: Check if the user can 'viewAny' Course.
        $this->authorize('viewAny', Course::class);
        $courses = Course::with(['classroom.grade', 'subject', 'teacher'])->get();
        return CourseResource::collection($courses);
    }

    public function store(StoreCourseRequest $request)
    {
        // This is already correct as the Form Request handles authorization.
        $course = Course::create($request->validated());
        return new CourseResource($course->load(['classroom', 'subject', 'teacher']));
    }

    public function show(Course $course)
    {
        // THE FIX: Check if the user can 'view' this specific $course.
        $this->authorize('view', $course);
        return new CourseResource($course->load(['classroom', 'subject', 'teacher']));
    }

    public function update(UpdateCourseRequest $request, Course $course)
    {
        // This is already correct as the Form Request handles authorization.
        $course->update($request->validated());
        return new CourseResource($course->fresh()->load(['classroom', 'subject', 'teacher']));
    }

    public function destroy(Course $course)
    {
        // THE FIX: Check if the user can 'delete' this specific $course.
        $this->authorize('delete', $course);
        $course->delete();
        return response()->noContent();
    }
}
