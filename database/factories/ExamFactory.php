<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\Course;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExamFactory extends Factory
{ // Ensure this is the only ExamFactory.php
    public function definition(): array
    {
        // Find or create a teacher/admin user to be the author
        $author = User::whereIn('role', [UserRole::TEACHER, UserRole::ADMIN])
            ->inRandomOrder()
            ->first()
            ?? User::factory()->withRole(UserRole::TEACHER)->create();

        return [
            'name' => fake()->words(3, true) . ' Exam',
            'type' => fake()->randomElement(['CC', 'EFF']),
            'course_id' => Course::factory(),
            'team_id' => Team::factory(),
            'author_id' => $author->id,
        ];
    }
}
