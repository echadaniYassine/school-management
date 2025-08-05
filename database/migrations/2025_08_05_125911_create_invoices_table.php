<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up(): void
{
Schema::create('invoices', function (Blueprint $table) {
$table->id();
$table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
$table->string('title');
$table->text('description')->nullable();
$table->decimal('amount', 10, 2);
$table->date('due_date');
$table->string('status')->default('unpaid')->comment('unpaid, paid, overdue');
$table->timestamps();
});
}

public function down(): void
{
Schema::dropIfExists('invoices');
}
};