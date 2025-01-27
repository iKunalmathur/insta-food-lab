<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Resources\API\FollowResource;
use App\Models\User;
use App\Trait\TRequestResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class FollowController extends BaseController
{
    use TRequestResponse;
    /**
     * Display a listing of the resource.
     */
    public function indexFollower(): Response|JsonResponse
    {
        return parent::baseIndex(
            auth()->user()->followers,
            FollowResource::class,
            FALSE
        );
    }

    /**
     * Display a listing of the resource.
     */
    public function indexFollowing()
    {
        return parent::baseIndex(
            auth()->user()->following,
            FollowResource::class,
            FALSE
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($uuid)
    {
        $following = User::where('uuid', $uuid)->firstOrFail();

        if (auth()->user()->isFollowing($following->id) || auth()->user()->id === $following->id) {
            return $this->sendError('You are already following ' . $following->name, 401);
        }

        auth()->user()->follow($following);

        return $this->sendResponse('You followed ' . $following->name, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($uuid)
    {
        $following = User::where('uuid', $uuid)->firstOrFail();

        if (!auth()->user()->isFollowing($following->id) || auth()->user()->id === $following->id) {
            return;
        }

        auth()->user()->unfollow($following);

        return response()->json('', 204);
    }
}
