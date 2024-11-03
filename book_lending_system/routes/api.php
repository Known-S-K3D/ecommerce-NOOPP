<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Product Routes without middleware group
Route::get('/products', [ProductController::class, 'index']); // Retrieve all products
Route::get('/products/{id}', [ProductController::class, 'show']); // Retrieve a specific product by ID
Route::post('/products', [ProductController::class, 'store']); // Add a new product
Route::put('/products/{id}', [ProductController::class, 'update']); // Update a specific product by ID
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete a specific product by ID

// Alternatively, you can keep using apiResource for brevity:
Route::apiResource('products', ProductController::class);
