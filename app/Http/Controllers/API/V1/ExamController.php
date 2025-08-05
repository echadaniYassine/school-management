<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Http\Resources\ExamResource;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     * - Admins see all exams.
     * - Teachers see only the exams for courses they teach.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Exam::with(['course.subject', 'course.teacher']);

        // A teacher should only see exams for their own courses.
        if ($user->role->value === 'teacher') {
            $query->whereHas('course', function ($q) use ($user) {
                $q->where('teacher_id', $user->id);
            });
        }
        // Admins can see all, so no additional query is needed.

        $exams = $query->latest('exam_date')->paginate(20);

        return ExamResource::collection($exams);
    }

    /**
     * Store a newly created exam in storage.
     */
    public function store(StoreExamRequest $request)
    {
        // The StoreExamRequest class handles ALL validation and authorization.
        // If the code reaches this point, the request is valid and authorized.
        $exam = Exam::create($request->validated());

        // Load relationships for a complete response.
        $exam->load(['course.subject', 'course.teacher']);

        return (new ExamResource($exam))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the specified exam.
     */
    public function show(Exam $exam)
    {
        // ** THE REFACTOR IS HERE **
        $this->authorize('view', $exam);
        $exam->load(['course.subject', 'course.teacher', 'examRecords.student']);
        return new ExamResource($exam);
    }

    /**
     * Update the specified exam in storage.
     */
    public function update(UpdateExamRequest $request, Exam $exam)
    {
        // The UpdateExamRequest class handles ALL validation and authorization.
        $exam->update($request->validated());

        // Return the updated resource with fresh data from the database.
        return new ExamResource($exam->fresh()->load(['course.subject', 'course.teacher']));
    }

    /**
     * Remove the specified exam from storage.
     */
    public function destroy(Exam $exam)
    {
        // ** THE REFACTOR IS HERE **
        $this->authorize('delete', $exam);
        $exam->delete();
        return response()->noContent();
    }
}
