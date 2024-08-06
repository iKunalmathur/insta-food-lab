<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Requests\API\PostStoreRequest;
use App\Http\Requests\API\PostUpdateRequest;
use App\Http\Resources\API\PostResource;
use App\Models\Post;
use App\Models\User;
use App\Trait\TRequestResponse;
use Illuminate\Http\JsonResponse;

class PostController extends BaseController
{
    use TRequestResponse;
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        $posts = auth()->user()->posts();

        return parent::baseIndex(
            $posts,
            PostResource::class,
            TRUE,
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostStoreRequest $request):JsonResponse
    {
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
    public function show(Post $post):JsonResponse
    {
        return parent::baseShow(
            $post,
            PostResource::class
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostUpdateRequest $request, Post $post):JsonResponse
    {
        return parent::baseUpdate(
            $request,
            $post,
            PostResource::class,
            function (Post $post) use ($request) {
            }
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Post $post):JsonResponse
    {
        parent::baseDelete($post);

        return  $this->sendResponse(
            "Post deleted successfully",
            '204'
        );
    }
}
