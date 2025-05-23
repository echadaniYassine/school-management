<?php
// app/Models/Setting.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model {
    protected $fillable = ['group', 'key', 'value'];
    // Optionally, cast 'value' if you store booleans/numbers as strings
    // protected $casts = [ 'value' => 'string' ];
}
