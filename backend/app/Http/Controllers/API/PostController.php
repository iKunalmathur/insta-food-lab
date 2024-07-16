<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Requests\API\PostStoreRequest;
use App\Http\Requests\API\PostUpdateRequest;
use App\Http\Resources\API\PostResource;
use App\Models\Post;
use App\Models\User;

class PostController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return parent::baseIndex(
            Post::query(),
            PostResource::class,
            TRUE,
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostStoreRequest $request)
    {
        $request->merge([
            'user_id' => User::inRandomOrder()->first()->id
        ]);

        return parent::baseStore(
            $request,
            Post::query(),
            PostResource::class,
            function (Post $post) use ($request) {
                if (count($request->images) > 0) {
                    foreach ($request->images as $image) {
                        $post->addMedia($image)
                            ->sanitizingFileName(function ($fileName) {
                                return strtolower(str_replace(
                                    ['#', '/', '\\', ' '],
                                    '-',
                                    $fileName
                                ));
                            })
                            ->toMediaCollection('post_images');
                    }
                }
            }
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return parent::baseShow(
            $post,
            PostResource::class
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostUpdateRequest $request, Post $post)
    {
        return parent::baseUpdate(
            $request,
            $post,
            PostResource::class
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Post $post)
    {
        parent::baseDelete($post);
    }
}
