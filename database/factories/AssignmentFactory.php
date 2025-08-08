<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assignment>
 */
class AssignmentFactory extends Factory
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
            'title' => [
                'fr' => fake()->sentence(4),
                'ar' => fake()->sentence(4),
            ],
            'description' => [
                'fr' => fake()->paragraph(),
                'ar' => fake()->paragraph(),
            ],
            'due_date' => fake()->dateTimeBetween('now', '+1 month'),
            'file_path' => fake()->optional()->filePath(),
        ];
    }
}
