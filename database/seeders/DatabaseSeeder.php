<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Teacher;
use App\Models\StudentParent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //User::factory(10)->create();

        User::factory()->create([
            'name' => 'Echadani Yassine',
            'email' => 'yassine@gmail.com',
            'password' => Hash::make('12345678'),
            'date_of_birth' => '2004-10-10',
            'gender' => 'male',
            'last_login_date' => now(), 
        ]);

        Teacher::factory()->create([
            'name' => 'Echadani Yassine',
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('12345678'),
            'date_of_birth' => '1990-01-01',
            'gender' => 'male',
            'address' => 'Temara, Morocco',
            'phone' => '0612345678',
        ]);

        Admin::factory()->create([
            'name' => 'Admin Echadani',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
            'date_of_birth' => '1985-05-10',
            'gender' => 'male',
            'address' => 'Rabat, Morocco',
            'phone' => '0611122233',
        ]);

        // StudentParent::factory()->create([
        //     'name' => 'Parent Echadani',
        //     'email' => 'parent@gmail.com',
        //     'password' => Hash::make('12345678'),
        //     'date_of_birth' => '1975-04-20',
        //     'gender' => 'male',
        //     'address' => 'Salé, Morocco',
        //     'phone' => '0622233344',
        //     'last_login_date' => now(),
        // ]);
    }
}
