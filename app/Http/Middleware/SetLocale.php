<?php

// app/Http/Middleware/SetLocale.php
namespace App\Http\Middleware;

use App\Services\TranslationService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        // Priority order for locale detection:
        // 1. URL parameter ?locale=fr
        // 2. User's preferred language (if authenticated)
        // 3. Accept-Language header
        // 4. App default

        $locale = $request->get('locale')
            ?? (auth()->check() ? auth()->user()->preferred_language : null)
            ?? $this->parseAcceptLanguage($request)
            ?? config('app.locale');

        // Validate locale is supported
        if (TranslationService::isSupported($locale)) {
            App::setLocale($locale);
        }

        return $next($request);
    }

    private function parseAcceptLanguage(Request $request): ?string
    {
        $acceptLanguage = $request->header('Accept-Language');
        if (!$acceptLanguage) {
            return null;
        }

        // Parse Accept-Language header
        preg_match_all('/([a-z]{2})(?:-[A-Z]{2})?(?:;q=([0-9.]+))?/', $acceptLanguage, $matches);

        $languages = [];
        for ($i = 0; $i < count($matches[1]); $i++) {
            $lang = $matches[1][$i];
            $quality = $matches[2][$i] ?? 1.0;
            $languages[$lang] = (float) $quality;
        }

        // Sort by quality score
        arsort($languages);

        // Return first supported language
        foreach (array_keys($languages) as $lang) {
            if (TranslationService::isSupported($lang)) {
                return $lang;
            }
        }

        return null;
    }
}
