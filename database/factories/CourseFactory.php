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
            'teacher_id' => User::factory(['role' => 'teacher']),
            'code' => fake()->unique()->bothify('????-###'),
            'description' => [
                'fr' => fake()->paragraph(),
                'ar' => fake()->paragraph(),
            ],
            'hours_per_week' => fake()->numberBetween(1, 6),
            'is_active' => true,
        ];
    }
}
