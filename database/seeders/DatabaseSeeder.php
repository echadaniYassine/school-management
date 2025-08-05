<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // For development, it's often best to start with a clean slate.
        // The 'migrate:fresh' command is better, but this is an option.
        // \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        // \App\Models\User::truncate();
        // ... truncate other tables
        // \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        // Call seeders in a specific order to respect foreign key constraints.
        $this->call([
            UserSeeder::class,
            SchoolStructureSeeder::class, // Seeds Years, Levels, Grades, Subjects
            ClassroomSeeder::class,
            CourseSeeder::class,
            EnrollmentSeeder::class, // Seeds Enrollments and links Parents to Students
            
            // Only run these in a local development environment
            // as they generate a lot of data.
            // if (App::environment('local')) {
            //     $this->call([
            //         AnnouncementSeeder::class,
            //         FinancialSeeder::class, // Seeds Invoices and Payments
            //     ]);
            // }
        ]);
    }
}