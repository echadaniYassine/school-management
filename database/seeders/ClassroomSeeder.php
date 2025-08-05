<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Grade;
use App\Models\SchoolYear;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    public function run(): void
    {
        $activeYear = SchoolYear::where('is_active', true)->first();
        $grades = Grade::all();
        $teachers = User::where('role', 'teacher')->get();

        if (!$activeYear || $grades->isEmpty() || $teachers->isEmpty()) {
            $this->command->warn('Cannot seed classrooms. Please seed Users, SchoolYears, and Grades first.');
            return;
        }

        foreach ($grades as $grade) {
            // Create 2 classrooms (A and B) for each grade level
            Classroom::factory()->create([
                'grade_id' => $grade->id,
                'school_year_id' => $activeYear->id,
                'main_teacher_id' => $teachers->random()->id,
                'name' => $grade->name_fr . ' - Groupe A',
            ]);
            Classroom::factory()->create([
                'grade_id' => $grade->id,
                'school_year_id' => $activeYear->id,
                'main_teacher_id' => $teachers->random()->id,
                'name' => $grade->name_fr . ' - Groupe B',
            ]);
        }
    }
}