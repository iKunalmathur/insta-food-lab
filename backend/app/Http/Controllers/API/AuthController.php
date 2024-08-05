<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Requests\API\RegisterRequest;
use App\Http\Resources\API\UserResource;
use App\Models\User;
use App\Trait\TRequestResponse;
use Illuminate\Http\JsonResponse;

class AuthController extends BaseController
{
    use TRequestResponse;

    public function login(): JsonResponse
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return $this->sendError('Unauthorized', 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $user = parent::baseStore($request, User::query());

        if ($user->exists()) {
            if (!$token = auth()->attempt($credentials)) {
                return $this->sendError('Unauthorized', 401);
            }

            return $this->respondWithToken($token);
        }

        return $this->sendError('Registration failed', 401);
    }

    public function me(): JsonResponse
    {
        return $this->sendResponse(UserResource::make(auth()->user()), 'Successfully logged in');
    }

    public function logout(): JsonResponse
    {
        auth()->logout(TRUE);
        return $this->sendResponse(null, 'Successfully logged out');
    }

    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(auth()->refresh());
    }
}
