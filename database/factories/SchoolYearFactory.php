<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SchoolYearFactory extends Factory
{
    public function definition(): array
    {
        // Create realistic and consistent school year data
        $startYear = $this->faker->unique()->numberBetween(2020, 2030);
        
        return [
            'name' => $startYear . '-' . ($startYear + 1),
            'start_date' => $startYear . '-09-01',
            'end_date' => ($startYear + 1) . '-06-30',
            'is_active' => false, // The seeder will explicitly set one to true
        ];
    }
}