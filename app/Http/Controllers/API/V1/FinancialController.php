<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;

class FinancialController extends Controller
{
    public function __construct()
    {
        // All methods in this controller are for admins only.
        $this->middleware('can:admin');
    }

    public function index()
    {
        $invoices = Invoice::with('student')->latest()->paginate(50);
        return InvoiceResource::collection($invoices);
    }

    public function store(StoreInvoiceRequest $request)
    {
        $invoice = Invoice::create($request->validated());
        return new InvoiceResource($invoice->load('student'));
    }
}
