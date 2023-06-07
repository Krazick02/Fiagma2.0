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

    
    
});
Route::post('/save',[CanvaController::class,'store'])->name('canva.store');
Route::put('/save',[CanvaController::class,'update'])->name('canva.update');
Route::get('/edit/{id}',[CanvaController::class,'edit'])->name('canva.edit');
Route::get('/get/{id}',[CanvaController::class,'get_lienzo'])->name('canva.get_lienzo');
Route::get('/register',[UserController::class,'create'])->name('users.create');
Route::post('/register',[UserController::class,'store'])->name('users.store');
Route::delete('/drop/{id}',[CanvaController::class,'destroy'])->name('canva.drop');


Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function (){
    return view('users.login');
})->name('login');

