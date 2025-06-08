<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // === USER SEEDING (NEW WAY) ===

        // 1. Create a specific Admin user
        User::factory()->create([
            'name' => 'Admin General',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. Create a specific Teacher user AND their profile
        $teacher = User::factory()->create([
            'name' => 'Prof. El Alami',
            'email' => 'teacher@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '0600112233',
        ]);
        // Create the associated teacher profile
        $teacher->teacherProfile()->create([
            'qualifications' => 'PhD in Computer Science',
            'date_of_birth' => '1980-03-15',
            'gender' => 'female',
            'address' => 'Casablanca, Morocco',
        ]);

        // 3. Create a specific Parent user
        $parent = User::factory()->create([
            'name' => 'Parent Default',
            'email' => 'parent@example.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
            'phone' => '0612345678',
        ]);

        // 4. Create a specific Student user AND their profile, linked to the parent
        $student = User::factory()->create([
            'name' => 'Echadani Yassine',
            'email' => 'student@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
        // Create the associated student profile and link the parent's ID
        $student->studentProfile()->create([
            'parent_id' => $parent->id,
            'student_id_number' => 'S1001',
            'date_of_birth' => '2004-10-10',
            'gender' => 'male',
            'address' => 'Rabat, Morocco',
        ]);

        // === CATEGORY & COURSE SEEDING (Your code was good, minor tweak) ===

        // $categories = collect([
        //     ['name' => 'Web Development', 'description' => 'Courses on building websites and web applications.'],
        //     ['name' => 'Data Science', 'description' => 'Learn about data analysis and machine learning.'],
        //     ['name' => 'Mobile Development', 'description' => 'Courses for creating applications for mobile devices.'],
        // ])->map(function ($categoryData) {
        //     return Category::factory()->create([
        //         'name' => $categoryData['name'],
        //         'slug' => Str::slug($categoryData['name']),
        //         'description' => $categoryData['description'],
        //     ]);
        // });

        // Create a course for our specific teacher
        // Course::factory()->create([
        //     'name' => 'Advanced Laravel',
        //     'teacher_id' => $teacher->id,
        //     'category_id' => $categories->firstWhere('name', 'Web Development')->id,
        // ]);
        
        // // Create 10 more random courses, assigning them to our specific teacher for simplicity
        // Course::factory(10)->create([
        //     'teacher_id' => $teacher->id,
        //     'category_id' => $categories->random()->id,
        // ]);
    }
}