php artisan make:resource SubjectResource
```File Content (`app/Http/Resources/SubjectResource.php`):
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'nameFr' => $this->name_fr, 'nameAr' => $this->name_ar];
    }
}
