<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Shared\Account\AccountController;
use App\Http\Controllers\Shared\Getway\PaymentGetWayController;
use App\Http\Controllers\Shared\Questions\QuestionsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hasNoRole', 'role:teacher,admin'])->prefix('app')->group(function () {
    // questions
    Route::controller(QuestionsController::class)->group(function () {
        Route::get('/create-new-paper', 'index')->name('g.create.new.questions');
        Route::post('/create-paper', 'store_paper')->name('g.create.new.questions.paper');

        Route::get('/load-questions/{id}', 'load_questions')->name('g.load.questions');
        Route::post('/load-questions', 'add_paper_items')->name('g.load.questions.post');

        Route::get('/all-questions-papper', 'all_papers')->name('g.all.questions.papper');
        Route::get('/all-questions-papper/{id}', 'delete_question_paper')->name('g.all.questions.papper.delete');
        Route::post('/question-paper-update', 'updateQuestionPaper')->name('g.question.paper.update');
        Route::get('/questions-papper-details/{id}', 'show_paper_details')->name('g.questions.papper.details');
    });
});

Route::middleware(['auth', 'hasNoRole', 'role:teacher,admin,editor'])->controller(AccountController::class)->group(function () {
    Route::get('/account', 'account')->name('g.account.index');
    Route::get('/security', 'security')->name('g.security.index');
    Route::post('/account', 'account_post')->name('g.account.post');
    Route::post('/security', 'updateSecurity')->name('g.security.post');
});

// payment getway 
Route::controller(PaymentGetWayController::class)->middleware(['auth', 'hasNoRole', 'role:teacher'])->group(function () {
    Route::get('/payment/{id}', 'index')->name('g.payment.index');
    Route::get('/payment/cancel/{id}', 'cancel_payment')->name('g.payment.cancel');
    Route::get('/payment/predone/{id}', 'predone_view')->name('g.payment.predone');
    Route::get('/payment/done/{id}', 'payemntDoneVIew')->name('g.payment.done');
    Route::post('/payment/done/post', 'paymentDone')->name('g.payment.done.post');
});

// single routes
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');
