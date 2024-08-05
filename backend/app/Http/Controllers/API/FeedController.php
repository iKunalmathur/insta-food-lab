<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Resources\API\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class FeedController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        return parent::baseIndex(
            Post::query(),
            PostResource::class,
        );
    }
}
