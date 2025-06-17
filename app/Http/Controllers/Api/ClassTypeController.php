<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClassTypeRequest;
use App\Http\Requests\UpdateClassTypeRequest;
use App\Http\Resources\ClassTypeResource;
use App\Models\ClassType;
use Illuminate\Http\Response;

class ClassTypeController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(ClassType::class, 'class_type');
    }

    public function index()
    {
        // BEST PRACTICE: Paginate results for consistency and performance.
        return ClassTypeResource::collection(ClassType::latest()->paginate(15)); // Default pagination
    }

    public function store(StoreClassTypeRequest $request)
    {
        $classType = ClassType::create($request->validated());
        return (new ClassTypeResource($classType))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(ClassType $classType)
    {
        return new ClassTypeResource($classType);
    }

    public function update(UpdateClassTypeRequest $request, ClassType $classType)
    {
        $classType->update($request->validated());
        return new ClassTypeResource($classType->fresh());
    }

    public function destroy(ClassType $classType)
    {
        $classType->delete();
        return response()->noContent();
    }
}