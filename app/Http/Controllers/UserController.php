<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function __construct()
    {
        // This is now the single source of truth for authorization on this controller.
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $query = User::with(['studentProfile', 'teacherProfile']);

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        $users = $query->latest()->paginate(15);

        // API Resources automatically handle pagination formatting.
        // This is much cleaner and ensures a consistent response structure.
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): UserResource
    {
        $validated = $request->validated();

        $user = DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
                'phone' => $validated['phone'] ?? null,
            ]);

            // Using array_key_exists is safer than isset for nested arrays
            if ($user->isStudent() && array_key_exists('profile', $validated)) {
                $user->studentProfile()->create($validated['profile']);
            } elseif ($user->isTeacher() && array_key_exists('profile', $validated)) {
                $user->teacherProfile()->create($validated['profile']);
            }

            return $user;
        });

        // Load relationships and return a single resource.
        return new UserResource($user->load(['studentProfile', 'teacherProfile']));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): UserResource
    {
        if ($user->isStudent()) $user->load('studentProfile.parent');
        if ($user->isTeacher()) $user->load('teacherProfile');

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): UserResource
    {
        $validated = $request->validated();
        
        // Separate user data from profile data for cleaner updates.
        $user_data = collect($validated)->except('profile')->all();
        $profile_data = $validated['profile'] ?? null;

        // Don't update password if it wasn't sent
        if (empty($user_data['password'])) {
            unset($user_data['password']);
        }

        $user->update($user_data);

        if ($profile_data) {
            if ($user->isStudent()) {
                $user->studentProfile()->update($profile_data);
            } elseif ($user->isTeacher()) {
                $user->teacherProfile()->update($profile_data);
            }
        }

        // fresh() reloads the model and its relations from the database.
        return new UserResource($user->fresh(['studentProfile', 'teacherProfile']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(null, 204);
    }
}