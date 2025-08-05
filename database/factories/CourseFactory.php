<?php

namespace Database\Factories;

use App\Models\Classroom;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'classroom_id' => Classroom::factory(),
            'subject_id' => Subject::factory(),
            // Important: Ensure the course teacher is actually a teacher
            'teacher_id' => User::factory(['role' => 'teacher']),
            'description_fr' => fake()->paragraph(),
            'description_ar' => fake()->paragraph(),
        ];
    }
}