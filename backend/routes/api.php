<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/test', function () {
    return response()->json([
        'message' => 'API route is working!',
        'time' => now(),
        'php_version' => PHP_VERSION,
        'laravel_version' => app()->version()
    ]);
});

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the API',
        'available_endpoints' => [
            'GET /api/test',
            'GET /api/health',
            'GET /api/tasks',
            'GET /api/categories'
        ]
    ]);
});

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'environment' => app()->environment(),
        'database' => config('database.default'),
        'timestamp' => now()
    ]);
});