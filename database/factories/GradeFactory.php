<?php

namespace Database\Factories;

use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

class GradeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'level_id' => Level::factory(),
            'code' => fake()->unique()->bothify('G#?'),
            'name' => [
                'fr' => fake()->words(3, true),
                'ar' => fake()->words(3, true),
            ],
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }
}
