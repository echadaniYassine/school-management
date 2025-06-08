<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $user = Auth::user();

        $user->tokens()->delete();

        $token = $user->createToken('api-token-for-user-' . $user->id)->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'token' => $token,
            'user' => new UserResource($user)
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out.'
        ]);
    }
}