<?php

namespace App\Trait;

trait TRequestResponse
{
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    protected function sendResponse($data = null, string $message, int $status = 200)
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

    protected function sendError($error, $code = 404)
    {
        $response = [
            'status' => 'error',
            'message' => $error,
        ];

        return response()->json($response, $code);
    }
}
