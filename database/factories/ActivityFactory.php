<?php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
class ActivityFactory extends Factory {
    public function definition(): array {
        return [
            'author_id' => User::factory(),
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(2),
            'date' => fake()->dateTimeBetween('+1 week', '+3 months')->format('Y-m-d'),
            'location' => fake()->streetAddress,
            'capacity' => fake()->numberBetween(20, 200),
            'status' => fake()->randomElement(['active', 'draft', 'cancelled']),
        ];
    }
}