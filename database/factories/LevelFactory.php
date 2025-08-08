<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LevelFactory extends Factory
{
    public function definition(): array
    {
        return [
            'code' => fake()->unique()->randomElement(['PRIMARY', 'MIDDLE', 'HIGH']),
            'name' => [
                'fr' => fake()->words(2, true),
                'ar' => fake()->words(2, true),
            ],
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }
}
