<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'amount' => (float) $this->amount,
            'dueDate' => $this->due_date->format('Y-m-d'),
            'status' => $this->status,
            'student' => new UserResource($this->whenLoaded('student')),
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
        ];
    }
}
