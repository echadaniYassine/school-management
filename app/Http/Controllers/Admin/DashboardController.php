<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB; // --- FIX: Import the DB facade
use Carbon\Carbon;                   // --- FIX: Import the Carbon library

// Import all the models you need to count
use App\Models\User;
use App\Models\BlogPost;
use App\Models\Course;
use App\Models\Activity;
use App\Models\Assignment;
use App\Models\SchoolClass; // If you have this model, you can uncomment it

class DashboardController extends Controller
{
    /**
     * Get aggregated statistics for the admin dashboard.
     * This method is efficient and caches the results.
     */
    public function getStats(Request $request)
    {
        $cacheKey = 'dashboard_stats';

        $stats = Cache::remember($cacheKey, now()->addMinutes(10), function () {
            return [
                'totalAdmins' => User::where('role', 'admin')->count(),
                'totalTeachers' => User::where('role', 'teacher')->count(),
                'totalStudents' => User::where('role', 'student')->count(),
                'totalBlogs' => BlogPost::count(),
                'totalCourses' => Course::count(),
                'totalActivities' => Activity::count(),
                'totalAssignments' => Assignment::count(),
                // 'totalClasses' => SchoolClass::count(), // You can uncomment this if you create the SchoolClass model
            ];
        });

        return response()->json($stats);
    }

    /**
     * --- FIX: Renamed and repurposed the method ---
     * Get daily student registration counts over a specified time range.
     * This provides a valuable metric for the dashboard chart without needing an Attendance model.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserRegistrationsOverTime(Request $request)
    {
        // Validate the incoming range parameter
        $validated = $request->validate([
            'range' => 'sometimes|in:90d,30d,7d',
        ]);

        $range = $validated['range'] ?? '30d'; // Default to 30 days
        $days = (int) $range;

        // --- FIX: Updated cache key to be descriptive ---
        $cacheKey = "user_registrations_over_time_{$range}";
        $startDate = Carbon::today()->subDays($days);

        // Cache the result for 1 hour for performance
        $registrationData = Cache::remember($cacheKey, now()->addHour(), function () use ($startDate) {
            // --- FIX: Query the User model instead of the non-existent Attendance model ---
            return User::query()
                ->where('role', 'student') // We only want to count students
                ->where('created_at', '>=', $startDate)
                ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get();
        });

        return response()->json($registrationData);
    }
}