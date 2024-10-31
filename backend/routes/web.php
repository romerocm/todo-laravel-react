<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Laravel is working!']);
});

Route::get('/phpinfo', function() {
    return phpinfo();
});