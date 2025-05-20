<?php

namespace App\Http\Controllers;

use App\Models\StudentParent;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\StudentParentResource;
use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;

class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StudentParentResource::collection(StudentParent::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentParentRequest $request)
    {
        $formFields = $request->validated();

        // Ajoute le champ last_login_date
        $formFields['last_login_date'] = now();

        // Hasher le mot de passe (à ajouter si tu veux un champ 'password' aussi)
        // $formFields['password'] = Hash::make($formFields['password']);

        $parent = StudentParent::create($formFields);

        return new StudentParentResource($parent);
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
    public function update(UpdateStudentParentRequest $request, StudentParent $studentParent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $studentParent)
    {
        //
    }
}
