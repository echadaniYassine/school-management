<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\Level;
use App\Models\SchoolYear;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class SchoolStructureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed School Years
        SchoolYear::factory()->create([
            'name' => '2024-2025',
            'start_date' => '2024-09-01',
            'end_date' => '2025-06-30',
            'is_active' => true,
        ]);
        SchoolYear::factory()->create([
            'name' => '2023-2024',
            'start_date' => '2023-09-01',
            'end_date' => '2024-06-30',
            'is_active' => false,
        ]);

        // 2. Seed Levels and their corresponding Grades
        $this->seedLevelAndGrades('Primaire', 'الابتدائي', [
            '1ère Année Primaire' => 'السنة الأولى ابتدائي',
            '2ème Année Primaire' => 'السنة الثانية ابتدائي',
            '3ème Année Primaire' => 'السنة الثالثة ابتدائي',
            '4ème Année Primaire' => 'السنة الرابعة ابتدائي',
            '5ème Année Primaire' => 'السنة الخامسة ابتدائي',
            '6ème Année Primaire' => 'السنة السادسة ابتدائي',
        ]);

        $this->seedLevelAndGrades('Collège', 'الإعدادي', [
            '1ère Année Collège' => 'السنة الأولى إعدادي',
            '2ème Année Collège' => 'السنة الثانية إعدادي',
            '3ème Année Collège' => 'السنة الثالثة إعدادي',
        ]);

        // 3. Seed Subjects
        $subjects = [
            'Mathématiques' => 'الرياضيات',
            'Langue Française' => 'اللغة الفرنسية',
            'Langue Arabe' => 'اللغة العربية',
            'Éducation Islamique' => 'التربية الإسلامية',
            'Histoire-Géographie' => 'التاريخ والجغرافيا',
            'Physique-Chimie' => 'الفيزياء والكيمياء',
            'Sciences de la Vie et de la Terre' => 'علوم الحياة والأرض',
        ];

        foreach ($subjects as $fr => $ar) {
            Subject::factory()->create(['name_fr' => $fr, 'name_ar' => $ar]);
        }
    }

    /**
     * Helper function to seed a level and its grades.
     */
    private function seedLevelAndGrades(string $levelFr, string $levelAr, array $grades): void
    {
        $level = Level::factory()->create(['name_fr' => $levelFr, 'name_ar' => $levelAr]);

        foreach ($grades as $gradeFr => $gradeAr) {
            Grade::factory()->create([
                'level_id' => $level->id,
                'name_fr' => $gradeFr,
                'name_ar' => $gradeAr,
            ]);
        }
    }
}