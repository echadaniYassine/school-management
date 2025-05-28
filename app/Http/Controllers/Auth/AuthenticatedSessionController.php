<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $user = $this->resolveAuthenticatedUser();

        if (!$user) {
            return response()->json(['message' => 'Authentication failed.'], 401);
        }

        $token = $user->createToken('api', [$user->getRoleAttribute()])->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        $user = $request->user();

        if ($user) {
            $user->currentAccessToken()?->delete(); // Deletes the current token
        }

        $this->logoutAllGuards();

        return response()->noContent(); // 204 No Content
    }

    /**
     * Attempt to resolve the authenticated user from multiple guards.
     */
    private function resolveAuthenticatedUser(): ?\Illuminate\Contracts\Auth\Authenticatable
    {
        foreach (['web', 'teacher', 'parent', 'admin'] as $guard) {
            if (Auth::guard($guard)->check()) {
                return Auth::guard($guard)->user();
            }
        }
        return null;
    }

    /**
     * Logout all guards to clean up any potential session usage.
     */
    private function logoutAllGuards(): void
    {
        foreach (['web', 'teacher', 'parent', 'admin'] as $guard) {
            if (Auth::guard($guard)->check()) {
                Auth::guard($guard)->logout();
            }
        }
    }
}
