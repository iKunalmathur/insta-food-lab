<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Requests\API\LikeIndexRequest;
use App\Http\Requests\API\LikeStoreRequest;
use App\Http\Resources\API\LikeResource;
use App\Models\Like;
use App\Models\Post;
use App\Trait\TRequestResponse;

class LikeController extends BaseController
{
    use TRequestResponse;
    /**
     * Display a listing of the resource.
     */
    public function index(LikeIndexRequest $request, $uuid)
    {
        $model = $request->model::where('uuid', $uuid)
            ->firstOrFail();

        return parent::baseIndex(
            $model->likes(),
            LikeResource::class,
            FALSE
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LikeStoreRequest $request, $uuid)
    {
        $model = $request->model::where('uuid', $uuid)
            ->firstOrFail();

        if ($model->isAlreadyLiked(auth()->user()->id)) {
            return $this->sendError(
                'You already liked this ' . str_replace('App\Models\\', '', $model->getMorphClass()),
                401
            );
        }

        return parent::baseStore(
            $request,
            $model->likes(),
            LikeResource::class
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Like $like)
    {
        if (auth()->user()->id !== $like->user_id) {
            return $this->sendError('You are not allowed to delete this like', 401);
        }

        return parent::baseDelete($like);
    }
}
