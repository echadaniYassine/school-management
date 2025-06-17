<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;
use App\Http\Resources\TeamResource;
use App\Models\Team;
use Illuminate\Http\Response;

class TeamController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Team::class, 'team');
    }

    public function index()
    {
        // BEST PRACTICE: Paginate results for consistency and performance.
        return TeamResource::collection(Team::with('classType')->latest()->paginate(15)); // Default pagination
    }

    public function store(StoreTeamRequest $request)
    {
        $team = Team::create($request->validated());
        return (new TeamResource($team->load('classType')))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Team $team)
    {
        return new TeamResource($team->load('classType'));
    }

    public function update(UpdateTeamRequest $request, Team $team)
    {
        $team->update($request->validated());
        return new TeamResource($team->fresh()->load('classType'));
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return response()->noContent();
    }
}