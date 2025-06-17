<?php

namespace Database\Factories;

use App\Models\ClassType;
use App\Models\Team; // Import the Team model
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TeamFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Team::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $teamName = $this->faker->words(2, true) . ' Team'; // e.g., "Alpha Eagles Team"
        return [
            'name' => $teamName,
            'code' => $this->faker->unique()->regexify('[A-Z0-9]{3,5}-[0-9]{2,4}'), // e.g., DEV-101 or TEAMX-2023
            // Ensure a ClassType exists or create one
            'class_type_id' => ClassType::factory(),
        ];
    }
}