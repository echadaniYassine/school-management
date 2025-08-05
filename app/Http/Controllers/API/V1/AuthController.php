<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle an incoming API authentication request.
     */
    public function login(Request $request)
    {
        // 1. Manually validate the incoming request.
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Find the user by their email.
        $user = User::where('email', $request->email)->first();

        // 3. Check if the user exists and the password is correct.
        if (! $user || ! Hash::check($request->password, $user->password)) {
            // If not, throw a standard validation exception.
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // 4. Update the last login timestamp.
        $user->last_login_at = now();
        $user->save();

        // 5. Create and return the Sanctum API token. This is the core of the process.
        $token = $user->createToken('api-token')->plainTextToken;

        // 6. Return a clean JSON response with the user data and the token.
        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    /**
     * Destroy an authenticated session (log out).
     */
    public function logout(Request $request)
    {
        // Revoke the specific token that was used to make this request.
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }
}