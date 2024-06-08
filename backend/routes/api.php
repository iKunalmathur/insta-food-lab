<?php

use App\Http\Controllers\API\{
    UserController
};

use Illuminate\Support\Facades\Route;

// users
Route::prefix('/users')
    ->name('users.')
    ->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::post('/', [UserController::class, 'store'])->name('store');
        Route::get('/{user}/show', [UserController::class, 'show'])->name('show');
        Route::patch('/{user}/update', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}/delete', [UserController::class, 'delete'])->name('delete');
    });
