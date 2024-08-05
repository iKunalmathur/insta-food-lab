<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Requests\API\CommentIndexRequest;
use App\Http\Requests\API\CommentStoreRequest;
use App\Http\Requests\API\CommentUpdateRequest;
use App\Http\Resources\API\CommentResource;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;

class CommentController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(CommentIndexRequest $request, $uuid):JsonResponse
    {
        $model = $request->model::where('uuid', $uuid)
            ->firstOrFail();

        return parent::baseIndex(
            $model->comments(),
            CommentResource::class,
            FALSE
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentStoreRequest $request, $uuid):JsonResponse
    {
        $model = $request->model::where('uuid', $uuid)
            ->firstOrFail();

        return parent::baseStore(
            $request,
            $model->comments(),
            CommentResource::class
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CommentUpdateRequest $request, Comment $comment):JsonResponse
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
    public function delete(Comment $comment):JsonResponse
    {
        return parent::baseDelete($comment);
    }
}
