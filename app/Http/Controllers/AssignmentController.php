<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\AssignmentResource;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;

class AssignmentController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Assignment::class, 'assignment');
    }

    public function index(Request $request)
    {
        // Eager load the creator relationship
        $query = Assignment::with('creator:id,name,role'); // Only get needed columns

        // Filtering logic is good, remains mostly the same.
        // ...

        $assignments = $query->latest('due_date')->paginate(10);
        return AssignmentResource::collection($assignments);
    }

    public function store(StoreAssignmentRequest $request)
    {
        $validatedData = $request->validated();
        // The creator is the logged-in user (teacher/admin)
        $validatedData['created_by_id'] = Auth::id();

        if ($request->hasFile('instructions_file')) {
            $validatedData['instructions_file_path'] = $request->file('instructions_file')->store('assignment_instructions', 'private');
        }

        $assignment = Assignment::create($validatedData);
        return new AssignmentResource($assignment->load('creator:id,name,role'));
    }

    public function show(Assignment $assignment)
    {
        return new AssignmentResource($assignment->load('creator:id,name,role'));
    }

    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $assignment->update($request->validated());
        // Handle file updates as before
        // ...
        return new AssignmentResource($assignment->fresh()->load('creator:id,name,role'));
    }

    public function destroy(Assignment $assignment)
    {
        // File deletion logic is good
        if ($assignment->instructions_file_path) {
            Storage::disk('private')->delete($assignment->instructions_file_path);
        }
        $assignment->delete();
        return response()->noContent();
    }

    // downloadInstructions method is fine, no changes needed.
}
