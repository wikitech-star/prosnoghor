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
        Schema::create('mail_configs', function (Blueprint $table) {
            $table->id();
            $table->string('mail_mailer')->default('smtp');
            $table->string('mail_host');
            $table->string('mail_port');
            $table->string('mail_username');
            $table->string('mail_password');
            $table->string('mail_encryption')->nullable();
            $table->string('mail_from_address');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mail_configs');
    }
};
