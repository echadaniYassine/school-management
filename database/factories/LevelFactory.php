<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LevelFactory extends Factory
{
    public function definition(): array
    {
        // The seeder provides specific names, so these are just placeholders.
        return [
            'name_fr' => fake()->word(),
            'name_ar' => fake()->word(),
        ];
    }
}