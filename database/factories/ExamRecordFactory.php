<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\Exam;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExamRecordFactory extends Factory
{
    public function definition(): array
    {
        $student = User::where('role', UserRole::STUDENT)->inRandomOrder()->first() ?? User::factory()->withRole(UserRole::STUDENT)->create();
        $grader = User::whereIn('role', [UserRole::TEACHER, UserRole::ADMIN])->inRandomOrder()->first() ?? User::factory()->withRole(UserRole::TEACHER)->create();
        return [
            'exam_id' => Exam::factory(),
            'user_id' => $student->id,
            'note' => fake()->randomFloat(2, 5, 20),
            'comment' => fake()->optional()->sentence(),
            'author_id' => $grader->id,
        ];
    }
}
