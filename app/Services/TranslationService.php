<?php

// app/Services/TranslationService.php
namespace App\Services;

use Illuminate\Support\Facades\App;

class TranslationService
{
    /**
     * Get translated text with fallbacks
     */
    public static function get(string $key, string $locale = null, array $replace = []): string
    {
        $locale = $locale ?? self::getCurrentLocale();
        
        // Try Laravel's translation files first (for system messages)
        $translation = trans($key, $replace, $locale);
        
        // If not found in Laravel trans files, return the key
        if ($translation === $key) {
            return $key;
        }
        
        return $translation;
    }

    /**
     * Get current user's preferred locale or app locale
     */
    public static function getCurrentLocale(): string
    {
        // Try to get user's preferred language
        if (auth()->check() && auth()->user()->preferred_language) {
            return auth()->user()->preferred_language;
        }
        
        return App::getLocale();
    }

    /**
     * Get fallback locale
     */
    public static function getFallbackLocale(): string
    {
        return config('app.fallback_locale', 'fr');
    }

    /**
     * Get supported locales
     */
    public static function getSupportedLocales(): array
    {
        return config('app.supported_locales', ['fr', 'ar']);
    }

    /**
     * Check if locale is supported
     */
    public static function isSupported(string $locale): bool
    {
        return in_array($locale, self::getSupportedLocales());
    }

    /**
     * Format translated content for display
     */
    public static function format(array $translations, string $locale = null): string
    {
        $locale = $locale ?? self::getCurrentLocale();
        $fallback = self::getFallbackLocale();
        
        return $translations[$locale] 
            ?? $translations[$fallback] 
            ?? array_values($translations)[0] 
            ?? '';
    }
}