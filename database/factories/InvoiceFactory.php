<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'student_id' => User::factory(['role' => 'student']),
            'invoice_number' => 'INV-' . strtoupper(Str::random(8)),
            'title' => [
                'fr' => fake()->sentence(4),
                'ar' => fake()->sentence(4),
            ],
            'description' => [
                'fr' => fake()->paragraph(),
                'ar' => fake()->paragraph(),
            ],
            'amount' => fake()->randomFloat(2, 100, 2000),
            'due_date' => fake()->dateTimeBetween('now', '+3 months'),
            'status' => fake()->randomElement(['unpaid', 'paid', 'overdue', 'cancelled']),
            'paid_at' => fake()->optional(0.3)->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
