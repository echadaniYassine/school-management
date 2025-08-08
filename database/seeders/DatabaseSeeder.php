<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SchoolYearSeeder::class,
            LevelSeeder::class,
            GradeSeeder::class,
            SubjectSeeder::class,
            UserSeeder::class,
            ClassroomSeeder::class,
            EnrollmentSeeder::class,
            CourseSeeder::class,
            AnnouncementSeeder::class,
            AssignmentSeeder::class,
            ExamSeeder::class,
            InvoiceSeeder::class,
        ]);
    }
}
