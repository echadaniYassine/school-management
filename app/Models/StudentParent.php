<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class StudentParent extends Authenticatable
{
        use HasApiTokens, HasFactory, Notifiable, SoftDeletes;


        protected $fillable = [
                'name',
                'date_of_birth',
                'last_login_date',
                'gender',
                'address',
                'phone',
                'email',
                'password',
        ];
        protected $hidden = [
                'password',
                'email_verified_at',
                'last_login_date',
                'deleted_at',
                'remember_token',
                'created_at'
        ];
        protected $casts = [
                'date_of_birth' => 'date:Y-m-d'
        ];

        protected $appends = ['role'];

        public function getRoleAttribute()
        {
                return 'parent';
        }
}
