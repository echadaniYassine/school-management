<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClassroomResource;
use App\Models\Classroom;
use App\Models\SchoolYear;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    /**
     * Display a listing of classrooms for the currently active school year.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        // Find the currently active school year to avoid showing old data.
        $activeYear = SchoolYear::where('is_active', true)->firstOrFail();

        // Eager-load the grade and mainTeacher relationships to prevent N+1 problems.
        $classrooms = Classroom::with(['grade', 'mainTeacher'])
            ->where('school_year_id', $activeYear->id)
            ->orderBy('name')
            ->get();

        return ClassroomResource::collection($classrooms);
    }

    /**
     * Display the specified classroom with all its details.
     *
     * @param  \App\Models\Classroom  $classroom
     * @return \App\Http\Resources\ClassroomResource
     */
    public function show(Classroom $classroom)
    {
        // An admin or teacher would want to see a classroom's full details.
        // We will assume authorization is handled by a middleware group or will be added later.

        // Eager-load all the details needed for a single classroom view.
        $classroom->load([
            'grade.level',
            'mainTeacher',
            'courses.subject',
            'courses.teacher',
            'enrollments.student' // We get students via the enrollment relationship
        ]);

        // For a cleaner API response, we'll transform the enrollments into a simple list of students.
        // The 'students' relation doesn't exist on the base model, but we can add it dynamically
        // before passing the model to the resource.
        $students = $classroom->enrollments->pluck('student')->sortBy('name')->values();
        $classroom->setRelation('students', $students);

        return new ClassroomResource($classroom);
    }
}

// Note: `store`, `update`, and `destroy` methods are intentionally omitted.
// Classroom management is typically a complex, infrequent administrative task
// better suited for a dedicated admin panel with specific service classes rather
// than a simple RESTful CRUD API endpoint.