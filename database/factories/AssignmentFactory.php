<?php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
class AssignmentFactory extends Factory {
    public function definition(): array {
        return [
            'author_id' => User::factory(),
            'title' => fake()->sentence(4) . ' Assignment',
            'description' => fake()->paragraph(3),
            'course' => fake()->randomElement(["Mathematics 101", "World History", "Physics 201"]),
            'due_date' => fake()->dateTimeBetween('+1 week', '+2 months')->format('Y-m-d'),
            'status' => fake()->randomElement(['draft', 'published', 'archived', 'graded']),
            'assigned_to_description' => 'Grade ' . fake()->numberBetween(9, 12),
        ];
    }
}