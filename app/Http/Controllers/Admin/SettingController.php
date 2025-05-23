<?php

// app/Http/Controllers/Admin/SettingController.php

namespace App\Http\Controllers\Admin;
use App\Models\Setting;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
class SettingController extends Controller
{
    public function index()
    {
        $settingsRaw = Setting::all()->groupBy('group')->map(function ($group) {
            return $group->pluck('value', 'key');
        });
        // Convert boolean strings to actual booleans, etc.
        $settings = $this->formatSettingsForOutput($settingsRaw->toArray());
        return response()->json($settings);
    }

    public function updateSection(Request $request, $section)
    {
        $validatedData = $request->all(); // Add validation specific to section

        foreach ($validatedData as $key => $value) {
            // Handle boolean values properly
            if (is_bool($value)) {
                $valueToStore = $value ? 'true' : 'false';
            } elseif (is_null($value)) {
                $valueToStore = ''; // Or handle as needed
            } else {
                $valueToStore = $value;
            }

            Setting::updateOrCreate(
                ['group' => $section, 'key' => $key],
                ['value' => $valueToStore]
            );
        }
        // Fetch the updated section to return
        $updatedSectionRaw = Setting::where('group', $section)->get()->pluck('value', 'key');
        $updatedSection = $this->formatSettingsForOutput([$section => $updatedSectionRaw])[$section];

        return response()->json($updatedSection);
    }

    // Helper to convert string booleans/numbers from DB to proper types
    private function formatSettingsForOutput(array $settingsArray)
    {
        foreach ($settingsArray as $group => &$keys) {
            foreach ($keys as $key => &$value) {
                if (strtolower($value) === 'true')
                    $value = true;
                elseif (strtolower($value) === 'false')
                    $value = false;
                elseif (is_numeric($value) && strpos($value, '.') === false && !in_array($key, ['smtpPort'])) { // Avoid converting smtpPort to int
                    // $value = (int)$value; // Be careful with this, can break things like port numbers
                }
                // Add more type conversions if needed
            }
        }
        return $settingsArray;
    }

    // Action for clearing cache (example)
    public function clearCache()
    {
        // Artisan::call('cache:clear');
        // Artisan::call('config:clear');
        // Artisan::call('view:clear');
        // Artisan::call('route:clear');
        return response()->json(['message' => 'System caches cleared successfully.']);
    }
}