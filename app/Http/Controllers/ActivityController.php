<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\User; // We only need the User model
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use App\Http\Resources\ActivityResource;
use App\Http\Requests\StoreActivityRequest;
use App\Http\Requests\UpdateActivityRequest;
use Illuminate\Support\Facades\Auth; // Import Auth facade

class ActivityController extends Controller
{
    /**
     * Apply the ActivityPolicy to all resourceful methods.
     */
    public function __construct()
    {
        $this->authorizeResource(Activity::class, 'activity');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Eager load the creator relationship for better performance
        $activities = Activity::with('creator:id,name')->latest('date')->get();
        return ActivityResource::collection($activities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActivityRequest $request)
    {

        $validatedData = $request->validated();

        // --- ADDED ---
        // Add the logged-in user's ID as the creator of the activity.
        $validatedData['created_by_id'] = Auth::id();
        // --- END ADDED ---

        $activity = Activity::create($validatedData);

        return new ActivityResource($activity->load('creator:id,name'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        // Eager load the creator when showing a single activity
        return new ActivityResource($activity->load('creator:id,name'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActivityRequest $request, Activity $activity)
    {
        $validatedData = $request->validated();
        $activity->update($validatedData);

        // Return the updated resource with the creator loaded
        return new ActivityResource($activity->fresh()->load('creator:id,name'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        $activity->delete();
        return response()->noContent(); // Use ->noContent() for 204 responses
    }
}