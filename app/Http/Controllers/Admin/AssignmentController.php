<?php

namespace App\Http\Controllers\Admin;

use App\Models\Assignment;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Admin\AssignmentResource;   // To be created
use App\Http\Requests\Admin\StoreAssignmentRequest;  // To be created
use App\Http\Requests\Admin\UpdateAssignmentRequest; // To be created

class AssignmentController extends Controller
{
    protected $instructionsDisk = 'private'; // Or 'public', depending on access needs
    protected $instructionsPath = 'assignment_instructions';

    public function index(Request $request)
    {
        $query = Assignment::with('creator')->latest('due_date');

        // Basic filtering based on frontend AdminViewAssignments
        if ($request->has('search') && !empty($request->input('search'))) {
            $searchTerm = $request->input('search');
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('course', 'LIKE', "%{$searchTerm}%");
            });
        }
        if ($request->has('course') && $request->input('course') !== 'All Courses' && !empty($request->input('course'))) {
            $query->where('course', $request->input('course'));
        }
        if ($request->has('status') && $request->input('status') !== 'All Statuses' && !empty($request->input('status'))) {
            $query->where('status', $request->input('status'));
        }


        $assignments = $query->paginate($request->input('per_page', 10));
        return AssignmentResource::collection($assignments);
    }

    public function store(StoreAssignmentRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['created_by_id'] = Auth::id();

        if ($request->hasFile('instructions_file') && $request->file('instructions_file')->isValid()) {
            $path = $request->file('instructions_file')->store($this->instructionsPath, $this->instructionsDisk);
            $validatedData['instructions_file_path'] = $path;
        }

        $assignment = Assignment::create($validatedData);
        return new AssignmentResource($assignment->load('creator'));
    }

    public function show(Assignment $assignment)
    {
        return new AssignmentResource($assignment->load('creator'));
    }

    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('instructions_file') && $request->file('instructions_file')->isValid()) {
            if ($assignment->instructions_file_path) {
                Storage::disk($this->instructionsDisk)->delete($assignment->instructions_file_path);
            }
            $path = $request->file('instructions_file')->store($this->instructionsPath, $this->instructionsDisk);
            $validatedData['instructions_file_path'] = $path;
        } elseif ($request->filled('instructions_file_remove') && $request->boolean('instructions_file_remove')) {
            if ($assignment->instructions_file_path) {
                Storage::disk($this->instructionsDisk)->delete($assignment->instructions_file_path);
            }
            $validatedData['instructions_file_path'] = null;
        }

        $assignment->update($validatedData);
        return new AssignmentResource($assignment->fresh()->load('creator'));
    }

    public function destroy(Assignment $assignment)
    {
        if ($assignment->instructions_file_path) {
            Storage::disk($this->instructionsDisk)->delete($assignment->instructions_file_path);
        }
        // Add logic here to handle related submissions if necessary before deleting an assignment
        $assignment->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    // Optional: Endpoint to download instruction file
    public function downloadInstructions(Assignment $assignment)
    {
        if (!$assignment->instructions_file_path || !Storage::disk($this->instructionsDisk)->exists($assignment->instructions_file_path)) {
            return response()->json(['message' => 'Instruction file not found.'], 404);
        }
        // Generate a user-friendly filename
        $originalFilename = pathinfo($assignment->instructions_file_path, PATHINFO_BASENAME); // This is the stored hashname
        // To get a more friendly name, you might need to store original filename too, or construct one:
        $friendlyFilename = Str::slug($assignment->title . '-instructions') . '.' . pathinfo($originalFilename, PATHINFO_EXTENSION);

        return Storage::disk($this->instructionsDisk)->download($assignment->instructions_file_path, $friendlyFilename);
    }
}