<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreActivityRequest; // To be created
use App\Http\Requests\Admin\UpdateActivityRequest; // To be created
use App\Http\Resources\Admin\ActivityResource;   // To be created
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // For HTTP status codes

class ActivityController extends Controller
{
    public function index()
    {
        // You might want to order them, e.g., by date or creation time
        $activities = Activity::latest('date')->get();
        return ActivityResource::collection($activities);
    }

    public function store(StoreActivityRequest $request)
    {
        $user = $request->user();

        if (!($user instanceof \App\Models\Admin || $user instanceof \App\Models\Teacher)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $validatedData = $request->validated();
        // Optionally, add created_by_id if you have user authentication
        // $validatedData['created_by_id'] = auth()->id();

        $activity = Activity::create($validatedData);
        return new ActivityResource($activity);
    }

    public function show(Activity $activity)
    {
        return new ActivityResource($activity);
    }

    public function update(UpdateActivityRequest $request, Activity $activity)
    {
        $validatedData = $request->validated();
        $activity->update($validatedData);
        return new ActivityResource($activity);
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT); // 204 No Content
    }
}
