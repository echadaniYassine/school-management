<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class StudentParent extends Authenticatable
{
        use HasFactory;


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
}
