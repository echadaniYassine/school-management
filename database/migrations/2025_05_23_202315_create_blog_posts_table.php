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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();

            // --- FIX: Renamed 'user_id' to 'author_id' to match the Model and Policy. ---
            // 'onDelete('cascade')' means if the author (User) is deleted, their posts are also deleted.
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            
            $table->string('title');
            $table->string('slug')->unique(); // Excellent for SEO-friendly URLs.
            $table->longText('content');
            $table->string('status')->default('draft');
            $table->string('category')->nullable();
            // $table->json('tags')->nullable(); // Storing tags as JSON is flexible.
            $table->string('featured_image')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void 
    {
        Schema::dropIfExists('blog_posts');
    }
};