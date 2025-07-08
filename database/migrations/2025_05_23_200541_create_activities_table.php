<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void 
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            // This is the key for ownership. If the user is deleted, the author becomes NULL.
            $table->foreignId('author_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('title');
            $table->text('description');
            $table->date('date');
            $table->string('location');
            $table->integer('capacity')->unsigned(); // Unsigned is correct, capacity can't be negative.
            $table->string('status')->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void 
    {
        Schema::dropIfExists('activities');
    }
};