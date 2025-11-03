<?php

use App\Http\Controllers\Backend\Coupon\CouponController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\InstituteRequestController;
use App\Http\Controllers\Backend\Package\PackageController;
use App\Http\Controllers\Backend\Question\QuestionController;
use App\Http\Controllers\Backend\School\GroupClassController;
use App\Http\Controllers\Backend\School\LassionController;
use App\Http\Controllers\Backend\School\QuestionTypeController;
use App\Http\Controllers\Backend\School\SubjectsController;
use App\Http\Controllers\Backend\Setting\GoogleAuthController;
use App\Http\Controllers\Backend\Setting\MailSettingController;
use App\Http\Controllers\Backend\Setting\SiteSettingController;
use Illuminate\Support\Facades\Route;

// auth routes
Route::middleware(['auth', 'hasNoRole', 'role:admin'])->prefix('app')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('ux.dashboard');

    // class routes
    Route::controller(GroupClassController::class)->group(function () {
        Route::get('/group-class', 'index')->name('ux.group.class');
        Route::post('/group-class', 'store')->name('ux.group.class.store');
        Route::get('/group-class/{id}', 'show')->name('ux.group.class.show');
        Route::get('/group-class/del/{id}', 'destroy')->name('ux.group.class.del');
    });

    // subject routes
    Route::controller(SubjectsController::class)->group(function () {
        Route::get('/subjects', 'index')->name('ux.subjects');
        Route::post('/subjects', 'store')->name('ux.subjects.store');
        Route::get('/subjects/{id}', 'show')->name('ux.subjects.show');
        Route::get('/subjects/del/{id}', 'destroy')->name('ux.subjects.del');
    });

    // lassion routes
    Route::controller(LassionController::class)->group(function () {
        Route::get('/lassion', 'index')->name('ux.lassion');
        Route::post('/lassion', 'store')->name('ux.lassion.store');
        Route::get('/lassion/{id}', 'show')->name('ux.lassion.show');
        Route::get('/lassion/del/{id}', 'destroy')->name('ux.lassion.del');
    });

    // question type routes
    Route::controller(QuestionTypeController::class)->group(function () {
        Route::get('/question-type', 'index')->name('ux.question.type');
        Route::post('/question-type', 'store')->name('ux.question.type.store');
        Route::get('/question-type/{id}', 'show')->name('ux.question.type.show');
        Route::get('/question-type/del/{id}', 'destroy')->name('ux.question.type.del');
    });

    // questions
    Route::controller(QuestionController::class)->prefix('/question')->group(function () {
        Route::get('/all', 'index')->name('ux.question.all');
        Route::get('/all/del/{id}', 'distroy')->name('ux.question.del');

        Route::get('/add', 'add_view')->name('ux.question.add');
        Route::post('/add', 'store')->name('ux.question.post');
    });

    // institute
    Route::controller(InstituteRequestController::class)->group(function () {
        Route::get('/institute-name-request', 'index')->name('ux.institute.name.request');
        Route::get('/institute-name-request/{id}', 'accept')->name('ux.institute.name.request.accept');
        Route::get('/institute-name-request/del/{id}', 'delete')->name('ux.institute.name.request.del');
    });

    // packgaes
    Route::controller(PackageController::class)->group(function () {
        Route::get('/package-list', 'index')->name('ux.package.list');
        Route::get('/package-add', 'add_view')->name('ux.package.add');
        Route::post('/package-add', 'store')->name('ux.package.post');
        Route::get('/package/{id}', 'delete')->name('ux.package.del');
    });

    // cupon
    Route::controller(CouponController::class)->group(function () {
        Route::get('/cupon-list', 'index')->name('ux.cupon.list');
        Route::get('/cupon-add', 'add_view')->name('ux.cupon.add');
        Route::post('/cupon-add', 'store')->name('ux.cupon.post');
        Route::get('/cupon-del/{id}', 'delete')->name('ux.cupon.del');

        Route::post('/get-cupon', 'getCupon')->name('ux.cupon.get');
    });

    // setting routes
    // site setting
    Route::controller(SiteSettingController::class)->prefix('/setting')->group(function () {
        Route::get('/site-setting', 'index')->name('ux.site.setting');
        Route::get('/site-setting-maintenance', 'updateMaintenance')->name('ux.site.setting.maintenance');
        Route::post('/site-setting', 'update')->name('ux.site.setting.post');
    });
    // mail setting
    Route::controller(MailSettingController::class)->prefix('/setting')->group(function () {
        Route::get('/mail-setting', 'index')->name('ux.mail.setting');
        Route::post('/mail-setting', 'update')->name('ux.mail.setting.post');
    });
    // google auth setting
    Route::controller(GoogleAuthController::class)->prefix('/setting')->group(function () {
        Route::get('/goole-auth-setting', 'index')->name('ux.goolge.auth.setting');
        Route::get('/goole-auth-setting-status', 'updateStatus')->name('ux.goolge.auth.setting.status');
        Route::post('/goole-auth-setting', 'update')->name('ux.goolge.auth.setting.post');
    });
});
