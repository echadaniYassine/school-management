<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
// REMOVED: use Illuminate\Foundation\Auth\Access\AuthorizesRequests; (already in base Controller)


class UserController extends Controller
{
    // REMOVED: use AuthorizesRequests;

    public function __construct()
    {
        // Apply middleware consistent with UserPolicy (admin only)
        // authorizeResource will handle the authorization based on UserPolicy.
        // Explicit role middleware can be an additional check or for roles not covered by policies.
        // For simplicity, if UserPolicy is strict admin-only, this specific method middleware is somewhat redundant with authorizeResource.
        // However, keeping it makes the intent clear.
        $this->middleware('role:admin')->only(['store', 'update', 'destroy']);
        $this->authorizeResource(User::class, 'user');
    }

    public function index(Request $request)
    {
        $query = User::query();

        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(fn($q) => $q->where('name', 'LIKE', "%{$searchTerm}%")->orWhere('email', 'LIKE', "%{$searchTerm}%"));
        }
        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }

        $users = $query->latest()->paginate($request->input('per_page', 10));
        return UserResource::collection($users);
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return new UserResource($user->fresh());
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->noContent();
    }
}