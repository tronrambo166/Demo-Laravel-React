<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout',[AuthController::class,'logout']);
    Route::get('/user/{id}', function ($id) {
         $user = User::where('id',$id)->first();
         return response()->json($user);
    });

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/create', [UserController::class, 'store']);
    Route::put('/update/{id}', [UserController::class, 'update']);
    Route::get('/delete/{id}', [UserController::class, 'destroy']);
    Route::get('/checkAuth', [AuthController::class,'checkAuth']);
});
Route::post('login',[AuthController::class,'login'])->name('login');
Route::post('register', [AuthController::class,'register'])->name('register');
