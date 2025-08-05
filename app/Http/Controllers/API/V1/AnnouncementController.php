<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnouncementRequest;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\Response;

class AnnouncementController extends Controller
{
/**
* Display a listing of the resource.
* This is public, anyone can see announcements.
*/
public function index()
{
// Only show posts that have a 'published_at' date in the past.
$announcements = Announcement::with('author')
->whereNotNull('published_at')
->where('published_at', '<=', now())
->latest('published_at')
->paginate(15);

return AnnouncementResource::collection($announcements);
}

/**
* Store a newly created resource in storage.
*/
public function store(StoreAnnouncementRequest $request)
{
// The StoreAnnouncementRequest handles all validation and authorization.
$validatedData = array_merge($request->validated(), [
'author_id' => auth()->id()
]);

$announcement = Announcement::create($validatedData);

return (new AnnouncementResource($announcement->load('author')))
->response()
->setStatusCode(Response::HTTP_CREATED);
}

/**
* Display the specified resource.
* This is public.
*/
public function show(Announcement $announcement)
{
// We will manually check if the post is published before showing it
// to a non-authorized user (e.g., guest, student).
// Admins and the author can see their own drafts.
if (is_null($announcement->published_at) && (!auth()->check() || auth()->user()->cannot('update', $announcement))) {
abort(404);
}

return new AnnouncementResource($announcement->load('author'));
}

/**
* Update the specified resource in storage.
*/
public function update(UpdateAnnouncementRequest $request, Announcement $announcement)
{
// The UpdateAnnouncementRequest handles all validation and authorization.
$announcement->update($request->validated());
return new AnnouncementResource($announcement->fresh()->load('author'));
}

/**
* Remove the specified resource from storage.
*/
public function destroy(Announcement $announcement)
{
// Use the AnnouncementPolicy to authorize the delete action.
$this->authorize('delete', $announcement);

$announcement->delete();
return response()->noContent(); // Returns a 204 No Content success status.
}
}