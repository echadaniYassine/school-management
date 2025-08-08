<?php

// app/Traits/HasTranslations.php
namespace App\Traits;

use Illuminate\Support\Facades\App;

trait HasTranslations
{
    /**
     * Get translated value for the given attribute
     */
    public function getTranslation(string $attribute, string $locale = null): ?string
    {
        $locale = $locale ?? $this->getDefaultLocale();
        $translations = $this->getAttributeValue($attribute);
        
        if (!is_array($translations)) {
            return $translations;
        }
        
        // Return requested locale or fallback chain
        return $translations[$locale] 
            ?? $translations[$this->getFallbackLocale()] 
            ?? array_values($translations)[0] 
            ?? null;
    }

    /**
     * Set translation for the given attribute
     */
    public function setTranslation(string $attribute, string $locale, ?string $value): self
    {
        $translations = $this->getAttributeValue($attribute) ?? [];
        
        if ($value === null) {
            unset($translations[$locale]);
        } else {
            $translations[$locale] = $value;
        }
        
        $this->setAttribute($attribute, $translations);
        
        return $this;
    }

    /**
     * Set multiple translations at once
     */
    public function setTranslations(string $attribute, array $translations): self
    {
        $this->setAttribute($attribute, $translations);
        return $this;
    }

    /**
     * Get all translations for an attribute
     */
    public function getTranslations(string $attribute): array
    {
        return $this->getAttributeValue($attribute) ?? [];
    }

    /**
     * Check if translation exists for given attribute and locale
     */
    public function hasTranslation(string $attribute, string $locale): bool
    {
        $translations = $this->getAttributeValue($attribute);
        return is_array($translations) && isset($translations[$locale]) && !empty($translations[$locale]);
    }

    /**
     * Dynamic getter for translated attributes
     */
    public function __get($key)
    {
        // Check if it's a translatable attribute
        if (in_array($key, $this->translatable ?? [])) {
            return $this->getTranslation($key);
        }
        
        return parent::__get($key);
    }

    /**
     * Get the default locale (user's preferred or app locale)
     */
    protected function getDefaultLocale(): string
    {
        // Try to get user's preferred language if available
        if (auth()->check() && auth()->user()->preferred_language) {
            return auth()->user()->preferred_language;
        }
        
        return App::getLocale();
    }

    /**
     * Get fallback locale
     */
    protected function getFallbackLocale(): string
    {
        return config('app.fallback_locale', 'fr');
    }

    /**
     * Scope to filter by translated attribute
     */
    public function scopeWhereTranslation($query, string $attribute, string $value, string $locale = null)
    {
        $locale = $locale ?? $this->getDefaultLocale();
        return $query->whereRaw("JSON_EXTRACT({$attribute}, '$.{$locale}') = ?", [$value]);
    }

    /**
     * Scope to search in translations
     */
    public function scopeWhereTranslationLike($query, string $attribute, string $value, string $locale = null)
    {
        $locale = $locale ?? $this->getDefaultLocale();
        return $query->whereRaw("JSON_EXTRACT({$attribute}, '$.{$locale}') LIKE ?", ["%{$value}%"]);
    }
}