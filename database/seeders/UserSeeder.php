<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create the main Admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@lms.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Student User',
            'email' => 'student@lms.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
        User::factory()->create([
            'name' => 'teacher User',
            'email' => 'teacher@lms.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);

        // 2. Create Teachers
        User::factory(10)->create(['role' => 'teacher']);

        // 3. Create Students
        User::factory(50)->create(['role' => 'student']);

        // 4. Create Parents
        User::factory(50)->create(['role' => 'parent']);
    }
}
