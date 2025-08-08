<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;

class FinancialController extends Controller
{

    public function index()
    {
        // Use the policy check
        $this->authorize('viewAny', Invoice::class);

        $invoices = Invoice::with('student')->latest()->paginate(50);
        return InvoiceResource::collection($invoices);
    }

    public function store(StoreInvoiceRequest $request)
    {
        // The Form Request already handles authorization, but an explicit
        // check here can be a good safeguard if the Form Request changes.
        // $this->authorize('create', Invoice::class); // This is optional but good practice

        $invoice = Invoice::create($request->validated());
        return new InvoiceResource($invoice->load('student'));
    }
}
