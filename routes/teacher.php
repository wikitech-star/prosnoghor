<?php

use App\Http\Controllers\Teacher\ContactController;
use App\Http\Controllers\Teacher\DashboardController;
use App\Http\Controllers\Teacher\InstituteController;
use App\Http\Controllers\Teacher\PackagesController;
use App\Http\Controllers\Teacher\SeedController;
use App\Http\Controllers\Teacher\TransactionsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hasNoRole', 'role:teacher'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('tech.dashboard');

    // 
    Route::controller(InstituteController::class)->group(function () {
        Route::get('/institute', 'index')->name('tech.institute.index');
        Route::post('/institute', 'store')->name('tech.institute.post');
        Route::post('/institute-name-request', 'name_request')->name('tech.institute.name.request');
    });

    // transactions
    Route::controller(TransactionsController::class)->group(function () {
        Route::get('/transactions', 'index')->name('tech.transactions.list');
    });

    // concat
    Route::get('/concat', [ContactController::class, 'index'])->name('tech.contact.index');

    // seed
    Route::controller(SeedController::class)->group(function () {
        Route::get('/seed-list', 'index')->name('tech.seed.list');
        Route::get('/seed-del/{id}', 'delete')->name('tech.seed.del');
    });

    // packages
    Route::controller(PackagesController::class)->group(function () {
        Route::get('/packages-list', 'index')->name('tech.packages.list');
    });
});
