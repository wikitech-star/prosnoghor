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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')->nullable()->constrained('group_classes')->nullOnDelete();
            $table->foreignId('subject_id')->nullable()->constrained('subjects')->nullOnDelete();
            $table->foreignId('lesson_id')->nullable()->constrained('lassions')->nullOnDelete();
            $table->foreignId('q_type_id')->nullable()->constrained('question_types')->nullOnDelete();

            $table->enum('type', ['mcq', 'cq', 'sq']);
            $table->enum('mcq_type', ['normal', 'hard']);

            $table->string('title')->nullable();
            $table->longText('body')->nullable();

            $table->string('image')->nullable();
            $table->string('image_align')->default('left');
            $table->string('youtube_url')->nullable();

            $table->json('meta')->nullable();

            $table->unsignedBigInteger('requested_by')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
