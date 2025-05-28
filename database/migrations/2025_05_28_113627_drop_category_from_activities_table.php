<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('activities', function (Blueprint $table) {
            if (Schema::hasColumn('activities', 'category')) {
                $table->dropColumn('category');
            }
        });
    }

    public function down()
    {
        Schema::table('activities', function (Blueprint $table) {
            // To rollback, add the category column back (adjust type if needed)
            $table->string('category')->nullable();
        });
    }
};
