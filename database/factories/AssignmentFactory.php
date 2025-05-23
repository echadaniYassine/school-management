<?php

namespace Database\Factories;

use App\Models\User;
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
     public function definition()
    {
        $statuses = ['draft', 'published', 'archived', 'graded'];
        $courses = ["Mathematics 101", "World History", "Physics 201", "English Literature", "Computer Science Basics"];

        return [
            'title' => $this->faker->sentence(4) . ' Assignment',
            'description' => $this->faker->paragraph(3),
            'course' => $this->faker->randomElement($courses),
            'due_date' => $this->faker->dateTimeBetween('+1 week', '+2 months')->format('Y-m-d'),
            'status' => $this->faker->randomElement($statuses),
            'assigned_to_description' => 'Grade ' . $this->faker->numberBetween(9, 12) . ' - Section ' . $this->faker->randomLetter(),
            'created_by_id' => User::where('email', 'like', '%admin%')->inRandomOrder()->first()?->id ?? User::factory(), // Example: find an admin or create one
        ];
    }
}
