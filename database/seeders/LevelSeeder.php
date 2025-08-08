<?php
namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            [
                'code' => 'PRIMARY',
                'name' => [
                    'fr' => 'Enseignement Primaire',
                    'ar' => 'التعليم الابتدائي'
                ],
                'sort_order' => 1
            ],
            [
                'code' => 'MIDDLE',
                'name' => [
                    'fr' => 'Enseignement Collégial',
                    'ar' => 'التعليم الإعدادي'
                ],
                'sort_order' => 2
            ],
            [
                'code' => 'HIGH',
                'name' => [
                    'fr' => 'Enseignement Secondaire',
                    'ar' => 'التعليم الثانوي'
                ],
                'sort_order' => 3
            ]
        ];

        foreach ($levels as $level) {
            Level::create($level);
        }
    }
}