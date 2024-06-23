<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Requests\API\LikeIndexRequest;
use App\Http\Requests\API\LikeStoreRequest;
use App\Http\Resources\API\LikeResource;
use App\Models\Like;
use App\Models\Post;

class LikeController extends BaseController
{
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
        return parent::baseDelete($like);
    }
}
