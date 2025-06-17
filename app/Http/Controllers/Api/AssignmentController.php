<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Http\Resources\AssignmentResource;
use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AssignmentController extends Controller
{
    protected string $instructionsDisk = 'private';
    protected string $instructionsPath = 'assignment_instructions';

    public function __construct()
    {
        $this->authorizeResource(Assignment::class, 'assignment');
    }
    
    public function index(Request $request)
    {
        // Public view is allowed by the policy.
        $query = Assignment::with('author')->latest('due_date');

        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(fn($q) => $q->where('title', 'LIKE', "%{$searchTerm}%")->orWhere('course', 'LIKE', "%{$searchTerm}%"));
        }
        if ($request->filled('course') && $request->input('course') !== 'All Courses') {
            $query->where('course', $request->input('course'));
        }
        if ($request->filled('status') && $request->input('status') !== 'All Statuses') {
            $query->where('status', $request->input('status'));
        }
        
        $assignments = $query->paginate($request->input('per_page', 10));
        return AssignmentResource::collection($assignments);
    }

    public function store(StoreAssignmentRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['author_id'] = auth()->id();

        if ($request->hasFile('instructions_file')) {
            $path = $request->file('instructions_file')->store($this->instructionsPath, $this->instructionsDisk);
            $validatedData['instructions_file_path'] = $path;
        }

        $assignment = Assignment::create($validatedData);

        return (new AssignmentResource($assignment->load('author')))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Assignment $assignment)
    {
        // Public view is allowed by the policy.
        return new AssignmentResource($assignment->load('author'));
    }

    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('instructions_file')) {
            if ($assignment->instructions_file_path) {
                Storage::disk($this->instructionsDisk)->delete($assignment->instructions_file_path);
            }
            $path = $request->file('instructions_file')->store($this->instructionsPath, $this->instructionsDisk);
            $validatedData['instructions_file_path'] = $path;
        } elseif ($request->boolean('instructions_file_remove')) {
             if ($assignment->instructions_file_path) {
                Storage::disk($this->instructionsDisk)->delete($assignment->instructions_file_path);
            }
            $validatedData['instructions_file_path'] = null;
        }

        $assignment->update($validatedData);
        return new AssignmentResource($assignment->fresh()->load('author'));
    }

    public function destroy(Assignment $assignment)
    {
        if ($assignment->instructions_file_path) {
            Storage::disk($this->instructionsDisk)->delete($assignment->instructions_file_path);
        }
        $assignment->delete();
        return response()->noContent();
    }

    public function downloadInstructions(Assignment $assignment)
    {
        // BEST PRACTICE: Authorize the download action separately.
        $this->authorize('view', $assignment); 

        if (!$assignment->instructions_file_path || !Storage::disk($this->instructionsDisk)->exists($assignment->instructions_file_path)) {
            return response()->json(['message' => 'Instruction file not found.'], 404);
        }
        
        $friendlyFilename = Str::slug($assignment->title . '-instructions') . '.' . pathinfo($assignment->instructions_file_path, PATHINFO_EXTENSION);
        
        return Storage::disk($this->instructionsDisk)->download($assignment->instructions_file_path, $friendlyFilename);
    }
}