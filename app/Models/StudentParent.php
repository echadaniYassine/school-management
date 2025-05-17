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
        use HasApiTokens, Notifiable, SoftDeletes, HasFactory;
        protected $appends = ['role'];

        public function getRoleAttribute()
        {
                return 'parent';
        }
}
