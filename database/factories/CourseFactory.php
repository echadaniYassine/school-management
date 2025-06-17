<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(rand(3, 6)),
            'code' => strtoupper(fake()->unique()->bothify('??###')),
            'description' => fake()->paragraph(rand(2, 5)),
            'instructor' => fake()->name(),
            'category' => fake()->randomElement(['Programming', 'Business', 'Design', 'Marketing', 'Personal Development']),
            'level' => fake()->randomElement(['Beginner', 'Intermediate', 'Advanced', 'All Levels']),
            'duration' => fake()->randomElement(['4 Weeks', '8 Weeks', '1 Semester']),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'thumbnail_url' => fake()->imageUrl(640, 480, 'education', true),
            'price' => fake()->randomElement([0.00, 19.99, 49.99, 99.00]),
        ];
    }
}