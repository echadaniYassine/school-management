<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Http\Resources\ExamResource;
use App\Models\Exam;
use Illuminate\Http\Response;

class ExamController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Exam::class, 'exam');
    }

    public function index()
    {
        $exams = Exam::with(['course', 'team', 'author'])->latest()->paginate();
        return ExamResource::collection($exams);
    }

    public function store(StoreExamRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['author_id'] = auth()->id();

        $exam = Exam::create($validatedData);

        return (new ExamResource($exam->load(['course', 'team', 'author'])))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Exam $exam)
    {
        return new ExamResource($exam->load(['course', 'team', 'author']));
    }

    public function update(UpdateExamRequest $request, Exam $exam)
    {
        $exam->update($request->validated());
        return new ExamResource($exam->fresh()->load(['course', 'team', 'author']));
    }

    public function destroy(Exam $exam)
    {
        $exam->delete();
        return response()->noContent();
    }
}