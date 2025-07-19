<?php
namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Activity;
use App\Models\Assignment;
use App\Models\BlogPost;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create specific, predictable users for testing/development
        $admin = User::factory()->withRole(UserRole::ADMIN)->create([
            'name' => 'Admin General', 
            'email' => 'admin@gmail.com', 
            'password' => Hash::make('password')
        ]);
        
        $teacher = User::factory()->withRole(UserRole::TEACHER)->create([
            'name' => 'Prof. El Alami', 
            'email' => 'teacher@gmail.com', 
            'password' => Hash::make('password')
        ]);
        
        User::factory()->withRole(UserRole::STUDENT)->create([
            'name' => 'Echadani Yassine', 
            'email' => 'yassine@gmail.com', 
            'password' => Hash::make('password')
        ]);
        
        User::factory()->withRole(UserRole::PARENT)->create([
            'name' => 'Parent Default', 
            'email' => 'parent@gmail.com', 
            'password' => Hash::make('password')
        ]);

        // // Create random users
        // User::factory(10)->withRole(UserRole::STUDENT)->create();
        // $teachers = User::factory(5)->withRole(UserRole::TEACHER)->create();
        // User::factory(5)->withRole(UserRole::PARENT)->create();

        // Create content and associate with authors
        // Course::factory(20)->create();
        // Activity::factory(10)->create(['author_id' => $teachers->random()->id]);
        // Assignment::factory(15)->create(['author_id' => $teachers->random()->id]);
        // BlogPost::factory(8)->create(['author_id' => $admin->id]);
    }
}