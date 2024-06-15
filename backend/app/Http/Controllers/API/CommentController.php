<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\CommentStoreRequest;
use App\Http\Requests\API\CommentUpdateRequest;
use App\Http\Resources\API\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Post $post)
    {
        return parent::baseIndex(
            $post->comments(),
            CommentResource::class,
            TRUE
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentStoreRequest $request, Post $post)
    {
        return parent::baseStore(
            $request,
            $post->comments(),
            CommentResource::class
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        request()->merge([
            'withModel' => true,
        ]);

        return parent::baseShow(
            $comment,
            CommentResource::class
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CommentUpdateRequest $request, Comment $comment)
    {
        return parent::baseUpdate(
            $request,
            $comment,
            CommentResource::class
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Comment $comment)
    {
        return parent::baseDelete($comment);
    }
}
