<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('group')->index(); // e.g., general, appearance, email
            $table->string('key')->index();   // e.g., siteName, primaryColor, smtpHost
            $table->longText('value')->nullable();
            $table->timestamps();

            $table->unique(['group', 'key']); // Ensure each setting key is unique within its group
        });
    }

    public function down()
    {
        Schema::dropIfExists('settings');
    }
};