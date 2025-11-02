<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('question_papers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->string('program_name');
            $table->unsignedBigInteger('class_id');
            $table->json('subjects');
            $table->json('lession');
            $table->string('type');
            $table->json('questions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_papers');
    }
};
