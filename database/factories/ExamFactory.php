<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'name_fr' => 'Examen: ' . fake()->words(2, true),
            'name_ar' => 'امتحان: ' . fake()->words(2, true),
            'type' => fake()->randomElement(['Quiz', 'Midterm', 'Final']),
            'exam_date' => fake()->dateTimeBetween('+2 weeks', '+3 months'),
        ];
    }
}