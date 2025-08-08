<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class DashboardController extends Controller
{
    public function getStats()
    {
        // Remove or comment out this line temporarily to test if it's the issue
        $this->authorize('viewAny', User::class);

        return Cache::remember('dashboard_stats_v2', now()->addMinutes(10), function () {
            return response()->json([
                'totalAdmins' => User::where('role', 'admin')->count(),
                'totalTeachers' => User::where('role', 'teacher')->count(),
                'totalStudents' => User::where('role', 'student')->count(),
                'totalParents' => User::where('role', 'parent')->count(),
                'totalCourses' => Course::count(),
            ]);
        });
    }
}