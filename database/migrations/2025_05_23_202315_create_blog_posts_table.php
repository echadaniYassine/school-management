<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->string('status')->default('draft');
            $table->string('category')->nullable();
            $table->json('tags')->nullable();
            $table->string('featured_image')->nullable(); // Stores path relative to disk
            $table->string('author')->nullable(); // Keep this if you also want a string author name

            // Define the author_id column
            $table->unsignedBigInteger('author_id')->nullable(); // <--- UNCOMMENTED THIS LINE

            // Add the foreign key constraint to the now existing author_id column
            $table->foreign('author_id')->references('id')->on('users')->onDelete('set null');

            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('blog_posts');
    }
};