<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->date('date');
            $table->string('location');
            $table->integer('capacity')->unsigned();
            $table->string('status')->default('draft'); // e.g., active, draft, cancelled
            $table->string('category'); // e.g., academic, sports, cultural, social
            // $table->unsignedBigInteger('created_by_id')->nullable(); // Optional: if you want to track who created it
            // $table->foreign('created_by_id')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('activities');
    }
};