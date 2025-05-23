<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $statuses = ['active', 'draft', 'cancelled'];
        $categories = ['academic', 'sports', 'cultural', 'social'];

        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(2),
            'date' => $this->faker->dateTimeBetween('+1 week', '+3 months')->format('Y-m-d'),
            'location' => $this->faker->streetAddress,
            'capacity' => $this->faker->numberBetween(20, 200),
            'status' => $this->faker->randomElement($statuses),
            'category' => $this->faker->randomElement($categories),
        ];
    }
}
