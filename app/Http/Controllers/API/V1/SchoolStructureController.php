<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\GradeResource;
use App\Http\Resources\LevelResource;
use App\Http\Resources\SubjectResource;
use App\Models\Grade;
use App\Models\Level;
use App\Models\Subject;

class SchoolStructureController extends Controller
{
    public function __construct()
    {
        // All methods in this controller are for admins only.
        $this->middleware('can:admin');
    }

    public function getLevels()
    {
        return LevelResource::collection(Level::all());
    }

    public function getGrades()
    {
        return GradeResource::collection(Grade::with('level')->get());
    }

    public function getSubjects()
    {
        return SubjectResource::collection(Subject::all());
    }
}
