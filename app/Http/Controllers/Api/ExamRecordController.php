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
    public function __construct()
    {
        // BEST PRACTICE: Manually authorize as it's a nested resource with shallow routing.
        $this->authorizeResource(ExamRecord::class, 'record');
    }

    /**
     * Display a listing of the resource for a specific exam.
     * Route: GET /api/admin/exams/{exam}/records
     */
    public function index(Exam $exam)
    {
        $this->authorize('viewAny', [ExamRecord::class, $exam]);

        $records = $exam->examRecords()->with(['student', 'author'])->paginate();
        return ExamRecordResource::collection($records);
    }

    /**
     * Store a newly created resource in storage.
     * Route: POST /api/admin/exams/{exam}/records
     */
    public function store(StoreExamRecordRequest $request, Exam $exam)
    {
        // Authorization is handled by the Form Request
        $validatedData = $request->validated();
        $validatedData['author_id'] = auth()->id();

        $record = $exam->examRecords()->create($validatedData);

        return (new ExamRecordResource($record->load(['student', 'author', 'exam'])))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     * Route: GET /api/admin/records/{record} (using shallow nesting)
     */
    public function show(ExamRecord $record)
    {
        // Authorization is handled by authorizeResource
        return new ExamRecordResource($record->load(['student', 'author', 'exam']));
    }

    /**
     * Update the specified resource in storage.
     * Route: PUT/PATCH /api/admin/records/{record}
     */
    public function update(UpdateExamRecordRequest $request, ExamRecord $record)
    {
        // Authorization is handled by the Form Request
        $record->update($request->validated());
        return new ExamRecordResource($record->fresh()->load(['student', 'author', 'exam']));
    }

    /**
     * Remove the specified resource from storage.
     * Route: DELETE /api/admin/records/{record}
     */
    public function destroy(ExamRecord $record)
    {
        // Authorization is handled by authorizeResource
        $record->delete();
        return response()->noContent();
    }
}