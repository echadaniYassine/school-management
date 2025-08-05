<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Enrollment;
use App\Models\SchoolYear;
use App\Models\User;
use Illuminate\Database\Seeder;

class EnrollmentSeeder extends Seeder
{
    public function run(): void
    {
        $activeYear = SchoolYear::where('is_active', true)->first();
        $classrooms = Classroom::where('school_year_id', $activeYear->id)->get();
        $students = User::where('role', 'student')->get();
        $parents = User::where('role', 'parent')->get();

        if ($classrooms->isEmpty() || $students->isEmpty() || $parents->isEmpty()) {
            $this->command->warn('Cannot run enrollment seeder. Missing active classrooms, students, or parents.');
            return;
        }

        // Enroll each student into a random classroom for the active year
        foreach ($students as $student) {
            $classroom = $classrooms->random();
            Enrollment::factory()->create([
                'student_id' => $student->id,
                'classroom_id' => $classroom->id,
                'school_year_id' => $activeYear->id,
            ]);

            // Attach one or two parents (guardians) to this student
            $assignedParents = $parents->random(rand(1, 2));
            $student->guardians()->attach($assignedParents->pluck('id'));
        }
    }
}