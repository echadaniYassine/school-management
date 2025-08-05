<?php

namespace Database\Factories;

use App\Models\Grade;
use App\Models\SchoolYear;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClassroomFactory extends Factory
{
    public function definition(): array
    {
        return [
            'grade_id' => Grade::factory(),
            'school_year_id' => SchoolYear::factory(),
            // Important: Ensure the main teacher is actually a teacher
            'main_teacher_id' => User::factory(['role' => 'teacher']),
            'name' => fake()->word() . ' ' . fake()->randomLetter(),
        ];
    }
}