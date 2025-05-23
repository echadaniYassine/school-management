<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTeacherRequest;  // We'll create this
use App\Http\Requests\Admin\UpdateTeacherRequest; // And this
use App\Http\Resources\Admin\TeacherResource;    // And this
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::latest()->paginate(10); // Or ::all() if no pagination needed initially
        return TeacherResource::collection($teachers);
    }

    public function store(StoreTeacherRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['password'] = Hash::make($validatedData['password']);

        $teacher = Teacher::create($validatedData);

        return (new TeacherResource($teacher))
                ->additional(['message' => 'Teacher created successfully.'])
                ->response()
                ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Teacher $teacher)
    {
        return new TeacherResource($teacher);
    }

    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $validatedData = $request->validated();

        if (!empty($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        } else {
            unset($validatedData['password']); // Don't update password if not provided
        }

        $teacher->update($validatedData);

        return (new TeacherResource($teacher))
                ->additional(['message' => 'Teacher updated successfully.']);
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete(); // Soft delete

        return (new TeacherResource($teacher)) // Return deleted resource for frontend info
                ->additional(['message' => 'Teacher deleted successfully.'])
                ->response()
                ->setStatusCode(Response::HTTP_OK); // Or 204 if no content needed
    }
}