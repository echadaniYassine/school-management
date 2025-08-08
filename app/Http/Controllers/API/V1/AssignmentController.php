<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Http\Resources\AssignmentResource;
use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AssignmentController extends Controller
{
    // The index method's logic is complex and role-based, so it's fine as is.

    public function store(StoreAssignmentRequest $request)
    {
        // The Form Request handles authorization, so this is already clean.
        $assignment = Assignment::create($request->validated());
        return (new AssignmentResource($assignment->load('course.subject')))->response()->setStatusCode(Response::HTTP_CREATED);
    }
    public function index()
    {
        $this->authorize('viewAny', Assignment::class);

        $user = auth()->user();
        $query = Assignment::with(['course.subject', 'course.classroom']);

        // Filter based on user role
        match ($user->role->value) {
            'teacher' => $query->whereHas('course', fn($q) => $q->where('teacher_id', $user->id)),
            'student' => $query->whereHas('course.enrollments', fn($q) => $q->where('student_id', $user->id)),
            'parent' => $query->whereHas('course.enrollments.student.guardians', fn($q) => $q->where('guardian_id', $user->id)),
            default => $query // admin sees all
        };

        return AssignmentResource::collection($query->latest('due_date')->paginate(15));
    }

    public function show(Assignment $assignment)
    {
        // ** THE REFACTOR IS HERE **
        // Replace the entire manual `match` block with one line.
        // The AssignmentPolicy will automatically handle the logic for all roles.
        $this->authorize('view', $assignment);

        $assignment->load(['course.subject', 'course.teacher']);
        return new AssignmentResource($assignment);
    }

    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        // The Form Request handles authorization, so this is already clean.
        $assignment->update($request->validated());
        return new AssignmentResource($assignment->fresh()->load('course.subject'));
    }

    public function destroy(Assignment $assignment)
    {

        $this->authorize('delete', $assignment);

        $assignment->delete();
        return response()->noContent();
    }
}
