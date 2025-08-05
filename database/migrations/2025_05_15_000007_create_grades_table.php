<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('level_id')->constrained()->cascadeOnDelete();
            $table->string('name_fr');
            $table->string('name_ar');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};