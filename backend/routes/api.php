<?php

use App\Http\Controllers\API\{
    AuthController,
    CommentController,
    FeedController,
    FollowController,
    LikeController,
    PostController,
};

use Illuminate\Support\Facades\Route;

// Authentication routes
Route::prefix('/auth')
    ->name('auth.')
    ->group(function () {
        Route::post('/login', [AuthController::class, 'login'])
            ->name('login');
        Route::post('/register', [AuthController::class, 'register'])
            ->name('register');

        Route::middleware('auth:api')
            ->group(function () {
                Route::get('/me', [AuthController::class, 'me'])
                    ->name('me');
                Route::post('/logout', [AuthController::class, 'logout'])
                    ->name('logout');
                Route::post('/refresh', [AuthController::class, 'refresh'])
                    ->name('refresh');
            });
    });

// Auth protected routes
Route::middleware('auth:api')
    ->group(
        function () {
            // users
            // Route::prefix('/users')
            //     ->name('users.')
            //     ->group(function () {
            //         Route::get('/', [UserController::class, 'index'])
            //             ->name('index');
            //         Route::post('/', [UserController::class, 'store'])
            //             ->name('store');
            //         Route::get('/{user}/show', [UserController::class, 'show'])
            //             ->name('show');
            //         Route::patch('/{user}/update', [UserController::class, 'update'])
            //             ->name('update');
            //         Route::delete('/{user}/delete', [UserController::class, 'delete'])
            //             ->name('delete');
            //     });

            // feed
            Route::prefix('/feed')
                ->name('feed.')
                ->group(function () {
                    Route::get('/', [FeedController::class, 'index'])
                        ->name('index');
                });

            // posts
            Route::prefix('/posts')
                ->name('posts.')
                ->group(function () {
                    Route::get('/', [PostController::class, 'index'])
                        ->name('index');
                    Route::post('/', [PostController::class, 'store'])
                        ->name('store');
                    Route::get('/{post}', [PostController::class, 'show'])
                        ->name('show');
                    Route::patch('/{post}/update', [PostController::class, 'update'])
                        ->name('update');
                    Route::delete('/{post}/delete', [PostController::class, 'delete'])
                        ->name('delete');
                });

            // comments
            Route::prefix('/comments')
                ->name('comments.')
                ->group(function () {
                    Route::get('/{uuid}', [CommentController::class, 'index'])
                        ->name('index');
                    Route::post('/{uuid}', [CommentController::class, 'store'])
                        ->name('store');
                    // Route::get('/{comment}', [CommentController::class, 'show'])
                    //->name('show');
                    Route::patch('/{comment}/update', [CommentController::class, 'update'])
                        ->name('update');
                    Route::delete('/{comment}/delete', [CommentController::class, 'delete'])
                        ->name('delete');
                });

            // likes and unlike
            Route::prefix('/likes')
                ->name('likes.')
                ->group(function () {
                    Route::get('/{uuid}', [LikeController::class, 'index'])
                        ->name('index');
                    Route::post('/{uuid}', [LikeController::class, 'store'])
                        ->name('store');
                    Route::post('/{uuid}/save', [LikeController::class, 'save'])
                        ->name('save');
                    Route::delete('/{like}/delete', [LikeController::class, 'delete'])
                        ->name('delete');
                });

            // follow and unfollow
            Route::prefix('/follow')
                ->name('follow.')
                ->group(function () {
                    Route::get('/followers', [FollowController::class, 'indexFollower'])
                        ->name('indexFollower');
                    Route::get('/followings', [FollowController::class, 'indexFollowing'])
                        ->name('indexFollowing');
                    Route::post('/{uuid}', [FollowController::class, 'store'])
                        ->name('store');
                    Route::delete('/{uuid}', [FollowController::class, 'delete'])
                        ->name('delete');
                });
        }
    );
