<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class BaseController extends Controller
{
    protected function baseIndex(
        EloquentBuilder|QueryBuilder $query,
        string $resourceClass,
        bool $isPaginated
    ): AnonymousResourceCollection {
        if ($isPaginated) {
            $result = $query->paginate();
        } else {
            $result = $query->get();
        }

        return $resourceClass::collection($result);
    }

    protected function baseStore(
        FormRequest $request,
        EloquentBuilder|QueryBuilder $model,
        string $resourceClass,
        callable $callback = null
    ): JsonResource {
        $model = $model->create($request->all());

        if ($callback) {
            $callback($model);
        }

        return $resourceClass::make($model);
    }

    protected function baseShow(
        Model $model,
        string $resourceClass
    ): JsonResource {
        return $resourceClass::make($model);
    }

    protected function baseUpdate(
        FormRequest $request,
        Model $model,
        string $resourceClass,
        callable $callback = null
    ): JsonResource {
        $model->update($request->all());

        if ($callback) {
            $callback($model);
        }

        return $resourceClass::make($model);
    }

    protected function baseDelete(
        Model $model
    ): Response {
        $model->delete();

        return response()->noContent();
    }
}
