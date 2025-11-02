<?php

use App\Http\Controllers\Ui\HomeController;
use App\Http\Controllers\Ui\PriceController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/price', [PriceController::class, 'index'])->name('price.list');
Route::get('/price-details/{id}', [PriceController::class, 'details_view'])->name('price.details');
