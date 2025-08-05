<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GradeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nameFr' => $this->name_fr,
            'nameAr' => $this->name_ar,
            'level' => new LevelResource($this->whenLoaded('level')),
        ];
    }
}
