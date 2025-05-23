<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Course::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
        $statuses = ['draft', 'published', 'archived'];
        $categories = ['Programming', 'Business', 'Design', 'Marketing', 'Personal Development'];

        return [
            'title' => $this->faker->sentence(rand(3, 6)),
            'code' => strtoupper($this->faker->unique()->bothify('??###')), // e.g., CS101
            'description' => $this->faker->paragraph(rand(2, 5)),
            'instructor' => $this->faker->name(),
            'category' => $this->faker->randomElement($categories),
            'level' => $this->faker->randomElement($levels),
            'duration' => $this->faker->randomElement(['4 Weeks', '8 Weeks', '12 Weeks', '1 Semester']),
            'status' => $this->faker->randomElement($statuses),
            'thumbnail_url' => $this->faker->imageUrl(640, 480, 'education', true),
            'price' => $this->faker->randomElement([0.00, 19.99, 49.99, 99.00, 149.50]),
            // 'user_id' => \App\Models\User::factory(), // If you have an instructor relationship
        ];
    }
}