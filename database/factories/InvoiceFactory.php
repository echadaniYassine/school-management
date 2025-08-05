<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            // Invoices are always for students
            'student_id' => User::factory(['role' => 'student']),
            'title' => 'Frais de scolarité - ' . fake()->monthName(),
            'description' => 'Paiement mensuel des frais de scolarité.',
            'amount' => fake()->randomFloat(2, 800, 2500), // Realistic tuition in MAD
            'due_date' => fake()->dateTimeThisYear(),
            'status' => fake()->randomElement(['unpaid', 'paid', 'overdue']),
        ];
    }
}