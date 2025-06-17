<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreActivityRequest;
use App\Http\Requests\UpdateActivityRequest;
use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use Illuminate\Http\Response;

class ActivityController extends Controller
{
    public function __construct()
    {
        // BEST PRACTICE: Use authorizeResource to automatically apply policy methods.
        $this->authorizeResource(Activity::class, 'activity');
    }

    public function index()
    {
        // BEST PRACTICE: Eager load relationships to prevent N+1 issues.
        // Public view is allowed by the policy.
        $activities = Activity::with('author')->latest('date')->get();
        return ActivityResource::collection($activities);
    }

    public function store(StoreActivityRequest $request)
    {
        $validatedData = $request->validated();
        // BEST PRACTICE: Set the author from the authenticated user.
        $validatedData['author_id'] = auth()->id();

        $activity = Activity::create($validatedData);
        
        return (new ActivityResource($activity->load('author')))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Activity $activity)
    {
        // Public view is allowed by the policy.
        // BEST PRACTICE: Load relationship for single resource view.
        return new ActivityResource($activity->load('author'));
    }

    public function update(UpdateActivityRequest $request, Activity $activity)
    {
        $activity->update($request->validated());
        return new ActivityResource($activity->fresh()->load('author'));
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();
        // BEST PRACTICE: Return 204 No Content for successful deletion.
        return response()->noContent();
    }
}