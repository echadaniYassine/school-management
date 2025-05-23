<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $title = $this->faker->sentence(5);
        $statuses = ['published', 'draft', 'archived'];
        $categories = ['Technology', 'Lifestyle', 'Education', 'News', 'Tutorials'];

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => '<p>' . implode('</p><p>', $this->faker->paragraphs(5)) . '</p>',
            'status' => $this->faker->randomElement($statuses),
            'category' => $this->faker->randomElement($categories),
            'tags' => $this->faker->words(rand(2, 5)),
            'featured_image' => $this->faker->imageUrl(640, 480, 'posts', true), // placeholder
            'author' => $this->faker->name,
            'author_id' => User::inRandomOrder()->first()?->id,
            'published_at' => $this->faker->randomElement([null, $this->faker->dateTimeThisYear()]),
            'created_at' => $this->faker->dateTimeThisYear(),
            'updated_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}
