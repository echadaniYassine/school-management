<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNotificationRequest; // We'll create this next
use App\Http\Resources\Admin\NotificationResource;   // And this one
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // If you need authenticated user

class NotificationController extends Controller
{
    public function index()
    {
        // Return newest notifications first
        $notifications = Notification::latest('sent_at')->paginate(20); // Paginate for large logs
        return NotificationResource::collection($notifications);
    }

    public function store(StoreNotificationRequest $request)
    {
        $validatedData = $request->validated();

        // Determine the 'type' based on 'target_type' from form
        $type = $validatedData['target_type'] === 'all_users' ? 'broadcast' : $validatedData['target_type'];
        
        // In a real application, here you would dispatch a job to send the actual notification
        // (e.g., via Firebase, email, SMS, etc.) and then update status based on success/failure.

        $notification = Notification::create([
            'type' => $type,
            'title' => $validatedData['title'],
            'message' => $validatedData['message'],
            'target_type' => $validatedData['target_type'],
            'target_value' => $validatedData['target_value'],
            'sent_by_id' => Auth::id(), // If admin is logged in
            'sent_by_name' => Auth::check() ? Auth::user()->name : 'Admin Action', // Example: Get admin name
            'sent_at' => now(),
            'status' => 'Sent', // Assume success for now, could be 'Scheduled' or 'Processing' initially
        ]);

        return new NotificationResource($notification);
    }
}