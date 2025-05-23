<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_notifications_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // e.g., 'broadcast', 'targeted_group', 'targeted_user', 'system_alert'
            $table->string('title');
            $table->text('message');
            $table->string('target_type')->nullable(); // e.g., 'all_users', 'group_name', 'user_id_list'
            $table->string('target_value')->nullable(); // e.g., null, 'Students Grade 10', 'user_123,user_456'
            $table->unsignedBigInteger('sent_by_id')->nullable(); // Can be foreign key to users table
            $table->string('sent_by_name')->nullable(); // Store display name for sender (e.g. "Admin Team", "System")
            $table->timestamp('sent_at');
            $table->string('status')->default('pending'); // e.g., 'Sent', 'Failed', 'Scheduled', 'Logged'
            $table->timestamps();

            // Optional: Index for querying by type or status
            $table->index('type');
            $table->index('status');
            // Optional: Foreign key constraint if you have a users table
             $table->foreign('sent_by_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
};