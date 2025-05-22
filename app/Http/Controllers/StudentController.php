<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\StudentParent;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\StudentResource;
use App\Http\Resources\StudentParentResource;
use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
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
    public function store(StoreStudentParentRequest $request)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $formFields['last_login_date'] = new \DateTime();
        $student = User::create($formFields);
        $response = new StudentParentResource($student);
        return response()->json([
            'student' => $response,
            'message' => __('Parent created successfully')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentParent $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentParentRequest $request, StudentParent $student)
    {
        $formFields = $request->validated();
        $formFields['password'] = Hash::make($formFields['password']);
        $student->update($formFields);
        return response()->json([
            'student' => $student,
            'message' => __('Parent updated successfully')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $student)
    {
        $student->delete();

        return new StudentResource($student);
    }
}
