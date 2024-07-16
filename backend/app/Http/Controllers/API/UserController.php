<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Requests\API\UserStoreRequest;
use App\Http\Requests\API\UserUpdateRequest;
use App\Http\Resources\API\UserResource;
use App\Models\User;

class UserController extends BaseController
{
    public function index()
    {
        return parent::baseIndex(
            User::query(),
            UserResource::class,
            TRUE
        );
    }

    public function store(UserStoreRequest $request)
    {

        return parent::baseStore(
            $request,
            User::query(),
            UserResource::class,
            function (User $user) use ($request) {
                if ($request->hasFile('avatar')) {
                    $user->addMediaFromRequest('avatar')->toMediaCollection('avatars');
                }
            }
        );
    }

    public function show(User $user)
    {
        return parent::baseShow(
            $user,
            UserResource::class
        );
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        return parent::baseUpdate(
            $request,
            $user,
            UserResource::class,
            function (User $user) use ($request) {
                if ($request->hasFile('avatar')) {
                    $user->clearMediaCollection('avatars');
                    $user->addMediaFromRequest('avatar')->toMediaCollection('avatars');
                }
            }
        );
    }

    public function delete(User $user)
    {
        parent::baseDelete($user);
    }
}
