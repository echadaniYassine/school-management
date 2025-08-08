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

            'name' => [
                'fr' => fake()->sentence(3),
                'ar' => fake()->sentence(3),
            ],
            'type' => fake()->randomElement(['Quiz', 'Midterm', 'Final', 'Test']),
            'exam_date' => fake()->dateTimeBetween('now', '+2 months'),
            'duration_minutes' => fake()->randomElement([60, 90, 120, 180]),
        ];
    }
}
