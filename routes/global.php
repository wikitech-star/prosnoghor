<?php

use App\Http\Controllers\AuthController;
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


    // payment getway 
    Route::controller(PaymentGetWayController::class)->group(function () {
        Route::get('/payment', 'index')->name('g.payment.index');
        Route::post('/payment-create', 'createPaymentSession')->name('g.payment.create');
    });
});


// single routes
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');
