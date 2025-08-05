<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnnouncementFactory extends Factory
{
    public function definition(): array
    {
        return [
            // Announcements are typically from admins or teachers
            'author_id' => User::factory(['role' => fake()->randomElement(['admin', 'teacher'])]),
            'title_fr' => fake()->sentence(4),
            'title_ar' => fake()->sentence(4),
            'content_fr' => fake()->paragraphs(3, true),
            'content_ar' => fake()->paragraphs(3, true),
            'published_at' => fake()->randomElement([now(), null]),
        ];
    }
}