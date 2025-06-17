<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest; // <-- Use the new, simple LoginRequest
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): Response
    {
        // The LoginRequest already validated the fields are present and valid.
        $request->authenticate();

        $user = $request->user();
        
        // Update last login timestamp
        $user->last_login_at = now();
        $user->save();

        // Create a Sanctum API token for the user.
        $token = $user->createToken('api-token')->plainTextToken;

        // Return the token in the response.
        return response([
            'token' => $token,
            'message' => 'Login successful.'
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        // Revoke the token that was used to authenticate the current request...
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}