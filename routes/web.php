<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\WaitakiController;
use App\Http\Controllers\WordTestController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('web')->group(function () {
    // // ここにウェブルートを定義
    Route::get('/user', [WaitakiController::class, 'getUserInfo']);
    Route::post('/logout', [WaitakiController::class, 'logout'])->name('logout');
});

Route::post('/validate-user', [WaitakiController::class, 'validateUser'])->name('validateUser');
Route::post('/create-user', [WaitakiController::class, 'createUser'])->name('createUser');
Route::post('/validate-login', [WaitakiController::class, 'Login'])->name('validateLogin');
Route::post('/validate-info', [WaitakiController::class, 'validateInfo'])->name('validateInfo');
Route::post('/complete-info', [WaitakiController::class, 'completeInfo'])->name('completeInfo');
Route::post('/create-word', [WaitakiController::class, 'createWord']);
Route::post('/api/check-login', [WaitakiController::class, 'checkLogin']);
Route::post('/add-word-to-mylist', [WordTestController::class, 'addWordToMylist']);
Route::delete('/remove-word-from-mylist/{wordId}', [WordTestController::class, 'removeWordFromMylist']);

// パスワードリセット関連
Route::post('/password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [ResetPasswordController::class, 'reset']);
Route::get('password/reset/{token}/{email}', [WaitakiController::class, 'showResetForm'])->name('password.reset');


Route::middleware('auth:sanctum')->group(function () {
    // ユーザーテスト進捗情報の取得
    Route::get('/user-test-progress', [WordTestController::class, 'getUserTestProgress']);
    // 単語テストの取得
    Route::get('/words-test', [WordTestController::class, 'getWordForTest']);
    // ユーザーテスト進捗情報の保存
    Route::post('/save-user-test-progress', [WordTestController::class, 'saveUserTestProgress']);
    // マイリスト一覧を取得する
    Route::get('/mylist-words', [WordTestController::class, 'getMylistWords']);
});


// クライアントサイドのルートを設定
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api|validate-user|create-user|validate-login).*$');
