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
        // ** THE REFACTOR IS HERE **
        // Replace the manual `if` check with one line.
        $this->authorize('delete', $assignment);

        $assignment->delete();
        return response()->noContent();
    }
}
