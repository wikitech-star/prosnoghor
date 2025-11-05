<?php

use App\Http\Controllers\Ui\ContactController;
use App\Http\Controllers\Ui\HomeController;
use App\Http\Controllers\Ui\PriceController;
use App\Http\Controllers\Ui\SeedController;
use Illuminate\Support\Facades\Route;


// home
Route::get('/', [HomeController::class, 'index'])->name('home');

// pay
Route::controller(PriceController::class)->group(function () {
    Route::get('/price', 'index')->name('price.list');
    Route::get('/price-details/{id}', 'details_view')->name('price.details');
    Route::post('/pay-package', 'createPyament')->name('price.package.payment');
});

// contact
Route::controller(ContactController::class)->group(function () {
    Route::get('/contact-us', 'index')->name('ui.contact.index');
    Route::post('/contact-us', 'store')->name('ui.contact.post');
});

// seed
Route::controller(SeedController::class)->group(function () {
    Route::get('/seet-list', 'index')->name('ui.seet.index');
    Route::get('/seet-view/{slug}', 'detailsView')->name('ui.seet.view');
    Route::post('/seet-payment', 'create_payment')->name('ui.seet.post');
});
