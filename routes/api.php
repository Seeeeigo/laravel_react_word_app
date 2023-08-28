<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WaitakiController;
use App\Http\Controllers\WordTestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => 'api'], function(){
    Route::get('/infos', [WaitakiController::class, 'showInfos']);
    Route::get('/infos/{id}', [WaitakiController::class, 'showDetailInfo']);
    Route::post('/infos/{id}', [WaitakiController::class, 'updateInfo']);
    Route::get('/words', [WaitakiController::class, 'showWords']);
    Route::get('/words/{id}', [WaitakiController::class, 'showDetailWord']);
    Route::post('/words/{id}', [WaitakiController::class, 'updatelWord']);
    Route::get('/user/{id}', [WaitakiController::class, 'showUser']);
    Route::put('/user/{id}', [WaitakiController::class, 'updateUser']);
    Route::get('/get-user-all', [WaitakiController::class, 'getAllUser']);
    Route::get('/users/{id}', [WaitakiController::class, 'editUser']);
});

