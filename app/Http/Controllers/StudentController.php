<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\StudentParent;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\StudentResource;
use App\Http\Resources\StudentParentResource;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {

        return StudentResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $formFields['last_login_date'] = new \DateTime();
        $student = User::create($formFields);
        $response = new StudentResource($student);
        return response()->json([
            'student' => $response,
            'message' => __('Student created successfully')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentParent $student)
    {
        return new StudentResource($student);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, User $student)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $student->update($formFields);
        return response()->json([
            'student' => new StudentResource($student),
            'message' => __('Student updated successfully')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $student)
    {
        $student->delete();

        return new StudentResource($student);
    }
}
