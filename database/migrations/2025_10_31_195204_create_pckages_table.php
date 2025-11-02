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
        Schema::create('pckages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('price', 10, 2)->nullable();
            $table->decimal('selling_price', 10, 2);
            $table->longText('details')->nullable();
            $table->json('classes')->nullable();
            $table->json('subjects')->nullable();
            $table->unsignedInteger('days')->default(356);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pckages');
    }
};
