<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExamRecordRequest;
use App\Http\Requests\UpdateExamRecordRequest;
use App\Http\Resources\ExamRecordResource;
use App\Models\Exam;
use App\Models\ExamRecord;
use Illuminate\Http\Response;

class ExamRecordController extends Controller
{
    public function index(Exam $exam)
    {
        // The policy will check if the user can view records for this specific exam.
        $this->authorize('viewAny', [ExamRecord::class, $exam]);
        $records = $exam->examRecords()->with(['student', 'grader'])->paginate();
        return ExamRecordResource::collection($records);
    }

    public function store(StoreExamRecordRequest $request)
    {
        // StoreExamRecordRequest handles validation. We will manually authorize.
        $exam = Exam::findOrFail($request->input('exam_id'));
        $this->authorize('create', [ExamRecord::class, $exam]);

        $validatedData = array_merge($request->validated(), [
            'grader_id' => auth()->id() // THE FIX: Use 'grader_id'
        ]);

        $record = ExamRecord::create($validatedData);
        return (new ExamRecordResource($record->load(['student', 'grader', 'exam'])))
            ->response()->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(ExamRecord $record)
    {
        $this->authorize('view', $record);
        return new ExamRecordResource($record->load(['student', 'grader', 'exam']));
    }

    public function update(UpdateExamRecordRequest $request, ExamRecord $record)
    {
        $this->authorize('update', $record);
        $record->update($request->validated());
        return new ExamRecordResource($record->fresh()->load(['student', 'grader', 'exam']));
    }

    public function destroy(ExamRecord $record)
    {
        $this->authorize('delete', $record);
        $record->delete();
        return response()->noContent();
    }
}
