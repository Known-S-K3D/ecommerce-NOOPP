<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;

Route::get('/', function () {
    return view('welcome');
});

Route::put('/cart/update/{id}', [CartController::class, 'updateCart']);
Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']);
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::get('/cart/count', [CartController::class, 'getCartCount']);
