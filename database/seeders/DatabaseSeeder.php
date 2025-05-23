<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
use App\Models\Teacher;
use App\Models\StudentParent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a specific user
        User::factory()->create([
            'name' => 'Echadani Yassine',
            'email' => 'yassine@gmail.com',
            'password' => Hash::make('12345678'),
            'date_of_birth' => '2004-10-10',
            'gender' => 'male',
            'last_login_date' => now(),
        ]);

        // Create 20 random users
        User::factory(20)->create();

        // Create a specific teacher
        Teacher::factory()->create([
            'name' => 'Prof. El Alami',
            'email' => 'teacher@example.com',
            'password' => Hash::make('12345678'),
            'date_of_birth' => '1980-03-15',
            'gender' => 'female',
            'address' => 'Casablanca, Morocco',
            'phone' => '0600112233',
        ]);

        // Create 20 random teachers
        Teacher::factory(20)->create();

        // Create a specific admin
        Admin::factory()->create([
            'name' => 'Admin General',
            'email' => 'admin@example.com',
            'password' => Hash::make('12345678'),
            'date_of_birth' => '1975-07-20',
            'gender' => 'male',
            'address' => 'Rabat, Morocco',
            'phone' => '0699887766',
        ]);

        // Create 20 random admins
        Admin::factory(20)->create();

        // Create predefined categories
        $categories = collect([
            ['name' => 'Web Development', 'description' => 'Courses related to building websites and web applications.'],
            ['name' => 'Data Science', 'description' => 'Learn about data analysis, machine learning, and big data.'],
            ['name' => 'Mobile Development', 'description' => 'Courses for creating applications for mobile devices.'],
            ['name' => 'Business & Entrepreneurship', 'description' => 'Develop skills for starting and managing a business.'],
            ['name' => 'Design & UX', 'description' => 'Courses on user interface, user experience, and graphic design.'],
        ])->map(function ($categoryData) {
            return Category::factory()->create([
                'name' => $categoryData['name'],
                'slug' => Str::slug($categoryData['name']),
                'description' => $categoryData['description'],
            ]);
        });

        // Fallback: Create categories if somehow the list is empty
        if ($categories->isEmpty()) {
            $categories = Category::factory(5)->create();
        }

        // Create 11 random courses with random categories
        for ($i = 0; $i < 11; $i++) {
            Course::factory()->create([
                'category_id' => $categories->random()->id,
            ]);
        }

        // Optionally: Create 3 courses for each category
        $coursesPerCategory = 3;
        $categories->each(function ($category) use ($coursesPerCategory) {
            Course::factory($coursesPerCategory)->create([
                'category_id' => $category->id,
            ]);
        });

        // Create a specific parent
        StudentParent::factory()->create([
            'name' => 'Parent Default',
            'email' => 'parent@example.com',
            'password' => Hash::make('password'),
            'date_of_birth' => '1970-01-01',
            'gender' => 'female',
            'address' => 'Anytown, Morocco',
            'phone' => '0612345678',
            'last_login_date' => now(),
        ]);

        // Create 20 random student parents
        StudentParent::factory(20)->create();
    }
}
