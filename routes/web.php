<?php

use App\Http\Controllers\CanvaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
// routes/web.php


Route::middleware(['auth'])->group(function () {
    Route::get('/home', function (){
        return view('fiagma.home');
    })->name('home');
    
    Route::get('/main', function (){
        return view('fiagma.main');
    })->name('fiagma.main');
    Route::post('/save',[CanvaController::class,'store'])->name('canva.store');


});
Route::get('/register',[UserController::class,'create'])->name('users.create');
Route::post('/register',[UserController::class,'store'])->name('users.store');


Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function (){
    return view('users.login');
})->name('login');

