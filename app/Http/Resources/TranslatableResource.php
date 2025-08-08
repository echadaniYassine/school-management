<?php
// app/Http/Resources/TranslatableResource.php
namespace App\Http\Resources;

use App\Services\TranslationService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TranslatableResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        
        // Add translated fields based on user's locale
        if (method_exists($this->resource, 'getTranslatable')) {
            $translatable = $this->resource->getTranslatable();
            
            foreach ($translatable as $field) {
                if (isset($data[$field]) && is_array($data[$field])) {
                    // Add both the full translations and the current locale version
                    $data[$field . '_translations'] = $data[$field];
                    $data[$field] = TranslationService::format($data[$field]);
                }
            }
        }
        
        return $data;
    }
}