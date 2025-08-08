<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index(Request $request)
    {
        // Logic from your old UserController was good. We keep it.
        $query = User::query();
        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }
        return UserResource::collection($query->latest()->paginate(25));
    }

    public function store(StoreUserRequest $request)
    {
        // ** THE REFACTOR IS HERE **
        // Add authorization to ensure only admins can create users.
        $this->authorize('create', User::class);
        $user = User::create($request->validated());
        return new UserResource($user);
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
        $this->authorize('delete', $user); // Manually authorize deletion
        $user->delete();
        return response()->noContent();
    }

    // Add these methods to UserController

    public function getChildren(Request $request)
    {
        $this->authorize('parent');

        $children = $request->user()->children()->with(['enrollments.classroom.grade'])->get();

        return UserResource::collection($children);
    }
}
