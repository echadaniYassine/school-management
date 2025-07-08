<?php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;
class BlogPostFactory extends Factory {
    public function definition(): array {
        $title = fake()->sentence(5);
        return [
            'author_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => '<p>' . implode('</p><p>', fake()->paragraphs(5)) . '</p>',
            'status' => fake()->randomElement(['published', 'draft', 'archived']),
            'category' => fake()->randomElement(['Technology', 'Lifestyle', 'Education']),
            // 'tags' => fake()->words(rand(2, 5)),
            'featured_image' => fake()->optional()->imageUrl(640, 480, 'posts', true),
            'published_at' => fake()->optional()->dateTimeThisYear(),
        ];
    }
}