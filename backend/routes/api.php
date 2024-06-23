<?php

use App\Http\Controllers\API\{
    CommentController,
    LikeController,
    PostController,
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

// posts
Route::prefix('/posts')
    ->name('posts.')
    ->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('index');
        Route::post('/', [PostController::class, 'store'])->name('store');
        Route::get('/{post}/show', [PostController::class, 'show'])->name('show');
        Route::patch('/{post}/update', [PostController::class, 'update'])->name('update');
        Route::delete('/{post}/delete', [PostController::class, 'delete'])->name('delete');
    });

// comments
Route::prefix('/comments')
    ->name('comments.')
    ->group(function () {
        Route::get('/{post}', [CommentController::class, 'index'])->name('index');
        Route::post('/{post}', [CommentController::class, 'store'])->name('store');
        Route::get('/{comment}/show', [CommentController::class, 'show'])->name('show');
        Route::patch('/{comment}/update', [CommentController::class, 'update'])->name('update');
        Route::delete('/{comment}/delete', [CommentController::class, 'delete'])->name('delete');
    });

// likes
Route::prefix('/likes')
    ->name('likes.')
    ->group(function () {
        Route::get('/{uuid}', [LikeController::class, 'index'])->name('index');
        Route::post('/{uuid}', [LikeController::class, 'store'])->name('store');
        Route::delete('/{like}/delete', [LikeController::class, 'delete'])->name('delete');
    });
