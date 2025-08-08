<?php

// database/seeders/SchoolStructureSeeder.php
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
        // 1. Create School Years
        $this->createSchoolYears();

        // 2. Create Education Levels and Grades (Morocco System)
        $this->createEducationStructure();

        // 3. Create Subjects (Morocco Curriculum)
        $this->createSubjects();
    }

    /**
     * Create school years
     */
    private function createSchoolYears(): void
    {
        SchoolYear::create([
            'name' => '2024-2025',
            'start_date' => '2024-09-01',
            'end_date' => '2025-06-30',
            'is_active' => true,
        ]);

        SchoolYear::create([
            'name' => '2023-2024',
            'start_date' => '2023-09-01',
            'end_date' => '2024-06-30',
            'is_active' => false,
        ]);

        SchoolYear::create([
            'name' => '2025-2026',
            'start_date' => '2025-09-01',
            'end_date' => '2026-06-30',
            'is_active' => false,
        ]);
    }

    /**
     * Create education structure following Morocco system
     */
    private function createEducationStructure(): void
    {
        // PRIMARY EDUCATION (6 years)
        $primary = Level::create([
            'code' => 'PRIMARY',
            'name' => [
                'fr' => 'Enseignement Primaire',
                'ar' => 'التعليم الابتدائي'
            ],
            'sort_order' => 1,
        ]);

        $primaryGrades = [
            ['code' => 'CP', 'fr' => 'Cours Préparatoire', 'ar' => 'السنة التحضيرية'],
            ['code' => 'CE1', 'fr' => 'Cours Élémentaire 1', 'ar' => 'السنة الأولى ابتدائي'],
            ['code' => 'CE2', 'fr' => 'Cours Élémentaire 2', 'ar' => 'السنة الثانية ابتدائي'],
            ['code' => 'CM1', 'fr' => 'Cours Moyen 1', 'ar' => 'السنة الثالثة ابتدائي'],
            ['code' => 'CM2', 'fr' => 'Cours Moyen 2', 'ar' => 'السنة الرابعة ابتدائي'],
            ['code' => 'CM3', 'fr' => 'Cours Moyen 3', 'ar' => 'السنة الخامسة ابتدائي'],
        ];

        foreach ($primaryGrades as $index => $grade) {
            Grade::create([
                'level_id' => $primary->id,
                'code' => $grade['code'],
                'name' => [
                    'fr' => $grade['fr'],
                    'ar' => $grade['ar']
                ],
                'sort_order' => $index + 1,
            ]);
        }

        // MIDDLE SCHOOL (3 years)
        $middle = Level::create([
            'code' => 'MIDDLE',
            'name' => [
                'fr' => 'Enseignement Collégial',
                'ar' => 'التعليم الإعدادي'
            ],
            'sort_order' => 2,
        ]);

        $middleGrades = [
            ['code' => '7EME', 'fr' => '7ème Année', 'ar' => 'السنة السابعة'],
            ['code' => '8EME', 'fr' => '8ème Année', 'ar' => 'السنة الثامنة'],
            ['code' => '9EME', 'fr' => '9ème Année', 'ar' => 'السنة التاسعة'],
        ];

        foreach ($middleGrades as $index => $grade) {
            Grade::create([
                'level_id' => $middle->id,
                'code' => $grade['code'],
                'name' => [
                    'fr' => $grade['fr'],
                    'ar' => $grade['ar']
                ],
                'sort_order' => $index + 7,
            ]);
        }

        // HIGH SCHOOL (3 years)
        $high = Level::create([
            'code' => 'HIGH',
            'name' => [
                'fr' => 'Enseignement Secondaire Qualifiant',
                'ar' => 'التعليم الثانوي التأهيلي'
            ],
            'sort_order' => 3,
        ]);

        $highGrades = [
            ['code' => '1BAC', 'fr' => '1ère Baccalauréat', 'ar' => 'الأولى بكالوريا'],
            ['code' => '2BAC', 'fr' => '2ème Baccalauréat', 'ar' => 'الثانية بكالوريا'],
            ['code' => 'TERM', 'fr' => 'Terminale', 'ar' => 'النهائية'],
        ];

        foreach ($highGrades as $index => $grade) {
            Grade::create([
                'level_id' => $high->id,
                'code' => $grade['code'],
                'name' => [
                    'fr' => $grade['fr'],
                    'ar' => $grade['ar']
                ],
                'sort_order' => $index + 10,
            ]);
        }
    }

    /**
     * Create subjects following Morocco curriculum
     */
    private function createSubjects(): void
    {
        $subjects = [
            // Core Subjects
            [
                'code' => 'MATH',
                'fr' => 'Mathématiques',
                'ar' => 'الرياضيات',
                'color' => '#3B82F6' // Blue
            ],
            [
                'code' => 'ARABIC',
                'fr' => 'Langue Arabe',
                'ar' => 'اللغة العربية',
                'color' => '#10B981' // Green
            ],
            [
                'code' => 'FRENCH',
                'fr' => 'Langue Française',
                'ar' => 'اللغة الفرنسية',
                'color' => '#8B5CF6' // Purple
            ],
            [
                'code' => 'ENGLISH',
                'fr' => 'Langue Anglaise',
                'ar' => 'اللغة الإنجليزية',
                'color' => '#EF4444' // Red
            ],

            // Sciences
            [
                'code' => 'PHYSICS',
                'fr' => 'Physique-Chimie',
                'ar' => 'الفيزياء والكيمياء',
                'color' => '#F59E0B' // Orange
            ],
            [
                'code' => 'SVT',
                'fr' => 'Sciences de la Vie et de la Terre',
                'ar' => 'علوم الحياة والأرض',
                'color' => '#059669' // Emerald
            ],
            [
                'code' => 'SCIENCE',
                'fr' => 'Sciences Générales',
                'ar' => 'العلوم العامة',
                'color' => '#0891B2' // Cyan
            ],

            // Social Studies
            [
                'code' => 'HISTORY',
                'fr' => 'Histoire-Géographie',
                'ar' => 'التاريخ والجغرافيا',
                'color' => '#92400E' // Yellow-800
            ],
            [
                'code' => 'ISLAMIC',
                'fr' => 'Éducation Islamique',
                'ar' => 'التربية الإسلامية',
                'color' => '#16A34A' // Green-600
            ],
            [
                'code' => 'CIVIC',
                'fr' => 'Éducation Civique',
                'ar' => 'التربية على المواطنة',
                'color' => '#DC2626' // Red-600
            ],

            // Arts & Skills
            [
                'code' => 'ART',
                'fr' => 'Éducation Artistique',
                'ar' => 'التربية الفنية',
                'color' => '#EC4899' // Pink
            ],
            [
                'code' => 'MUSIC',
                'fr' => 'Éducation Musicale',
                'ar' => 'التربية الموسيقية',
                'color' => '#8B5CF6' // Violet
            ],
            [
                'code' => 'PE',
                'fr' => 'Éducation Physique',
                'ar' => 'التربية البدنية',
                'color' => '#059669' // Emerald-600
            ],

            // Technical
            [
                'code' => 'TECH',
                'fr' => 'Éducation Technologique',
                'ar' => 'التربية التكنولوجية',
                'color' => '#7C2D12' // Orange-800
            ],
            [
                'code' => 'IT',
                'fr' => 'Informatique',
                'ar' => 'المعلوماتية',
                'color' => '#1E40AF' // Blue-800
            ],

            // Philosophy (High School)
            [
                'code' => 'PHILO',
                'fr' => 'Philosophie',
                'ar' => 'الفلسفة',
                'color' => '#7C3AED' // Violet-600
            ],

            // Amazigh (Berber) Language - Optional
            [
                'code' => 'AMAZIGH',
                'fr' => 'Langue Amazighe',
                'ar' => 'اللغة الأمازيغية',
                'color' => '#CA8A04' // Yellow-600
            ],
        ];

        foreach ($subjects as $subject) {
            Subject::create([
                'code' => $subject['code'],
                'name' => [
                    'fr' => $subject['fr'],
                    'ar' => $subject['ar']
                ],
                'color' => $subject['color'],
                'is_active' => true,
            ]);
        }
    }
}