<?php

namespace App\Trait;

use Illuminate\Http\JsonResponse;

trait TRequestResponse
{
    protected function respondWithToken($token):JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    protected function sendResponse(string $message, int $status = 200,  $data = NULL):JsonResponse
    {
        $response = [
            'status' => 'success',
        ];

        if ($data) {
            $response['data'] = $data;
        }

        if ($message) {
            $response['message'] = $message;
        }

        return response()->json($response, $status);
    }

    protected function sendError(string $error, int $code = 404):JsonResponse
    {
        $response = [
            'status' => 'error',
            'message' => $error,
        ];

        return response()->json($response, $code);
    }
}
