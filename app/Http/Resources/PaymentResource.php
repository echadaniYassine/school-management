<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amountPaid' => (float) $this->amount_paid,
            'paymentDate' => $this->payment_date->format('Y-m-d H:i'),
            'paymentMethod' => $this->payment_method,
            'transactionReference' => $this->transaction_reference,
        ];
    }
}
