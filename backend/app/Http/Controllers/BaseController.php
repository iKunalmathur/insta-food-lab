<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class BaseController extends Controller
{
    function __construct()
    {
        $randomUser = User::inRandomOrder()->first();
        Auth::onceUsingId($randomUser->id);
    }

    protected function baseIndex(
        Model|HasMany|HasOne|MorphMany|EloquentBuilder|QueryBuilder|EloquentCollection|Collection $query,
        string $resourceClass,
        bool $shouldPaginate = true,
        bool $latest = true
    ): JsonResponse {
        $request = request();

        // Apply default or requested order
        $orderBy = $request->get('order_by', 'created_at');
        $orderMethod = $request->get('order_method', $latest ? 'desc' : 'asc');
        $query = $query->orderBy($orderBy, $orderMethod);

        // Handle ?limit=0 case for efficiency
        if ($request->has('limit') && $request->get('limit') == 0) {
            $result = $query->get();
            return response()->json([
                'status' => 'success',
                'data' => $resourceClass::collection($result),
            ]);
        }

        if ($query instanceof EloquentCollection || $query instanceof Collection) {
            // Manual pagination for collections
            if ($shouldPaginate) {
                $perPage = config('settings.pagination_per_page', 15);
                $page = LengthAwarePaginator::resolveCurrentPage();
                $result = new LengthAwarePaginator(
                    $query->forPage($page, $perPage),
                    $query->count(),
                    $perPage,
                    $page,
                    ['path' => LengthAwarePaginator::resolveCurrentPath()]
                );
            } else {
                $result = $query;
            }
        } else {
            if ($shouldPaginate) {
                $result = $query->paginate(config('settings.pagination_per_page', 15));

                return response()->json([
                    'status' => 'success',
                    'current_page' => $result->currentPage(),
                    'data' => $resourceClass::collection($result),
                    'meta' => $shouldPaginate ? [
                        'current_page' => $result->currentPage(),
                        'last_page' => $result->lastPage(),
                        'per_page' => $result->perPage(),
                        'total' => $result->total(),
                    ] : []
                ]);
            } else {
                $result = $query->get();

                return response()->json([
                    'status' => 'success',
                    'data' => $resourceClass::collection($result),
                ]);
            }
        }
    }


    protected function baseShow(
        Model $model,
        string $resourceClass
    ): JsonResponse {
        return response()->json(
            [
                'status' => 'success',
                'data' => $resourceClass::make($model)
            ]
        );
    }

    protected function baseStore(
        FormRequest $request,
        HasMany|MorphMany|EloquentBuilder|QueryBuilder $model,
        string $resourceClass,
        callable $callback = null
    ): JsonResponse {
        $model = $model->create($request->all());

        if ($callback) {
            $callback($model);
        }

        return response()->json(
            [
                'status' => 'success',
                'data' => $resourceClass::make($model)
            ]
        );
    }

    protected function baseUpdate(
        FormRequest $request,
        Model $model,
        string $resourceClass,
        callable $callback = null
    ): JsonResponse {
        $model->update($request->validated());

        if ($callback) {
            $callback($model);
        }

        return response()->json(
            [
                'status' => 'success',
                'data' => $resourceClass::make($model)
            ]
        );
    }

    protected function baseDelete(
        Model $model
    ): Response {
        $model->delete();

        return response()->noContent();
    }
}
