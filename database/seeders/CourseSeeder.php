<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Course;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $classrooms = Classroom::with('schoolYear')->whereHas('schoolYear', function ($query) {
            $query->where('is_active', true);
        })->get();
        
        $subjects = Subject::all();
        $teachers = User::where('role', 'teacher')->get();

        if ($classrooms->isEmpty() || $subjects->isEmpty() || $teachers->isEmpty()) {
            $this->command->warn('Cannot seed courses. Please seed Classrooms, Subjects, and Teachers first.');
            return;
        }

        foreach ($classrooms as $classroom) {
            // Assign a few random subjects to each classroom
            $assignedSubjects = $subjects->random(rand(4, 6));
            foreach ($assignedSubjects as $subject) {
                Course::factory()->create([
                    'classroom_id' => $classroom->id,
                    'subject_id' => $subject->id,
                    'teacher_id' => $teachers->random()->id,
                ]);
            }
        }
    }
}