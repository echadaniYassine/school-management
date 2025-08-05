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
            'title_fr' => 'Devoir: ' . fake()->sentence(3),
            'title_ar' => 'واجب: ' . fake()->sentence(3),
            'description_fr' => fake()->paragraph(2),
            'description_ar' => fake()->paragraph(2),
            'due_date' => fake()->dateTimeBetween('+1 week', '+2 months'),
            'file_path' => null,
        ];
    }
}