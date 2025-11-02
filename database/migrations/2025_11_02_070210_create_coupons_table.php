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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('target')->nullable();
            $table->string('code');
            $table->integer('value');
            $table->enum('type', ['p', 't'])->default('p');
            $table->integer('usages')->nullable();
            $table->bigInteger('total_usages')->default(0);

            $table->timestamps();
            $table->foreign('target')
                ->references('id')
                ->on('pckages')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
