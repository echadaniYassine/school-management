<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExamRecord>
 */
class ExamRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'exam_id' => Exam::factory(),
            'student_id' => User::factory(['role' => 'student']),
            'grader_id' => User::factory(['role' => 'teacher']),
            'score' => fake()->randomFloat(2, 5, 20), // Moroccan grading scale
            'comment' => fake()->optional()->sentence(),
        ];
    }
}