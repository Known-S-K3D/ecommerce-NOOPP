<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

// Product Routes
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']); // List all products
    Route::get('/{id}', [ProductController::class, 'show']); // Show a specific product
    Route::post('/', [ProductController::class, 'store']); // Add a new product
    Route::put('/{id}', [ProductController::class, 'update']); // Update a product
    Route::delete('/{id}', [ProductController::class, 'destroy']); // Delete a product
});

// Cart Routes
Route::prefix('cart')->group(function () {
    Route::get('/items', [CartController::class, 'index']);  // Get all cart items
    Route::get('/count', [CartController::class, 'getCartCount']); // Get total count of items in the cart
    Route::post('/add', [CartController::class, 'addToCart']); // Add item to cart
    Route::put('/update/{id}', [CartController::class, 'updateCart']); // Update cart item
    Route::delete('/remove/{id}', [CartController::class, 'removeFromCart']); // Remove item from cart
});
