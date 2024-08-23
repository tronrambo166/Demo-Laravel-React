<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\PagesController;

Route::middleware('auth:sanctum')->group(function() {
    //Route::get('/users', [UserController::class, 'index']);
    Route::get('logout',[AuthController::class,'logout']);

});

Route::get('latBusiness', [PagesController::class,'latBusiness'])->name('latBusiness');
Route::get('searchResults/{ids}', [PagesController::class,'searchResults'])->name('searchResults');
Route::get('getMilestones/{id}', [BusinessController::class,'getMilestones'])->name('getMilestones');

//Auth Routes
Route::post('login',[AuthController::class,'login'])->name('login');
Route::post('register', [AuthController::class,'register'])->name('register');
Route::get('test',[BusinessController::class,'test']);


//Default CRUD
// Route::post('/create', [UserController::class, 'store']);
// Route::put('/update/{id}', [UserController::class, 'update']);
// Route::get('/delete/{id}', [UserController::class, 'destroy']);
// Route::get('/checkAuth', [AuthController::class,'checkAuth']);