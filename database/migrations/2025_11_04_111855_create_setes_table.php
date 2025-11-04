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
        Schema::create('setes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('details');
            $table->decimal('price', 10, 2)->nullable();
            $table->decimal('selling_price', 10, 2)->nullable();

            $table->string('files');
            $table->string('thumbnail')->nullable();

            $table->text('seo_taqs')->nullable();
            $table->longText('seo_description')->nullable();

            $table->bigInteger('total_view')->default(0);
            $table->bigInteger('total_sales')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setes');
    }
};
