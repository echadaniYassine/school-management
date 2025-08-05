<?php

namespace Database\Factories;

use App\Models\Classroom;
use App\Models\SchoolYear;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EnrollmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            // Important: Ensure the enrolled user is a student
            'student_id' => User::factory(['role' => 'student']),
            'classroom_id' => Classroom::factory(),
            'school_year_id' => SchoolYear::factory(),
        ];
    }
}