<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('title');
            $table->text('description');
            $table->date('date');
            $table->string('location');
            $table->integer('capacity')->unsigned();
            $table->string('status')->default('draft');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('activities');
    }
};