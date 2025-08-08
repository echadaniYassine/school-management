<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SubjectFactory extends Factory
{
    public function definition(): array
    {
        return [
            'code' => fake()->unique()->lexify('????'),
            'name' => [
                'fr' => fake()->words(2, true),
                'ar' => fake()->words(2, true),
            ],
            'color' => fake()->hexColor(),
            'is_active' => true,
        ];
    }
}
