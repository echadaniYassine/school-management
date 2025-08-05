<?php

namespace Database\Factories;

use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

class GradeFactory extends Factory
{
    public function definition(): array
    {
        // The seeder provides specific names, so these are just placeholders.
        return [
            'level_id' => Level::factory(),
            'name_fr' => fake()->words(3, true),
            'name_ar' => fake()->words(3, true),
        ];
    }
}