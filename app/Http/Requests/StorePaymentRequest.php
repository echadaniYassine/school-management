<?php

namespace App\Http\Requests;

use App\Models\Invoice;
use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool {
    $user = $this->user();
    if ($user->can('admin')) return true; // Admin override.

    $invoice = Invoice::find($this->input('invoice_id'));
    
    // A PARENT can authorize this request IF they are a guardian of the student on the invoice.
    return $user->role->value === 'parent' &&
           $invoice &&
           $invoice->student->guardians()->where('guardian_id', $user->id)->exists();
}
    public function rules(): array
    {
        return [
            'invoice_id' => 'required|exists:invoices,id',
            'amount_paid' => 'required|numeric|min:0.01',
            'payment_date' => 'required|date',
            'payment_method' => 'required|string|in:Credit Card,Cash,Bank Transfer',
            'transaction_reference' => 'nullable|string|max:255',
        ];
    }
}
