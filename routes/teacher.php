<?php

use App\Http\Controllers\Teacher\ContactController;
use App\Http\Controllers\Teacher\DashboardController;
use App\Http\Controllers\Teacher\InstituteController;
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
});
