<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnnouncementFactory extends Factory
{
    public function definition(): array
    {
        return [
            'author_id' => User::factory(['role' => fake()->randomElement(['admin', 'teacher'])]),
            'title' => [
                'fr' => fake()->sentence(),
                'ar' => fake()->sentence(),
            ],
            'content' => [
                'fr' => fake()->paragraphs(3, true),
                'ar' => fake()->paragraphs(3, true),
            ],
            'type' => fake()->randomElement(['general', 'urgent', 'academic', 'administrative']),
            'audience' => fake()->randomElement(['all', 'students', 'teachers', 'parents']),
            'published_at' => fake()->optional(0.8)->dateTimeBetween('-1 month', 'now'),
            'expires_at' => fake()->optional(0.3)->dateTimeBetween('now', '+3 months'),
            'is_active' => true,
        ];
    }
}
