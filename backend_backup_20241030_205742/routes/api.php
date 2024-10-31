<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['api'])->group(function () {
    // Task routes
    Route::apiResource('tasks', TaskController::class);

    // Category routes
    Route::apiResource('categories', CategoryController::class)->except(['update', 'show']);
});