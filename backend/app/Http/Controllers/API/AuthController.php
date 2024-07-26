<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Requests\API\RegisterRequest;
use App\Models\User;
use App\Trait\TRequestResponse;

// use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
    use TRequestResponse;

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return $this->sendError('Unauthorized', 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(RegisterRequest $request)
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

    public function me()
    {
        return $this->sendResponse(auth()->user(), 'Successfully logged in');
    }

    public function logout()
    {
        auth()->logout(TRUE);
        return $this->sendResponse(null, 'Successfully logged out');
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
}
