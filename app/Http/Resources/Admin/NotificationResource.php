<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray($request)
    {
        // This maps database fields to the structure expected by your frontend components
        return [
            'id' => $this->id,
            'type' => $this->type,
            'title' => $this->title,
            'message' => $this->message,
            'target' => $this->determineTargetDisplay(), // Combines target_type and target_value for display
            // Include original target_type and target_value if frontend needs them for specific logic
            // 'target_type_raw' => $this->target_type,
            // 'target_value_raw' => $this->target_value,
            'sentBy' => $this->sent_by_name ?: 'System', // Fallback if name not set
            'sentAt' => $this->sent_at->toIso8601String(),
            'status' => $this->status,
        ];
    }

    protected function determineTargetDisplay()
    {
        if (!empty($this->target_value)) {
            return $this->target_value;
        }
        switch ($this->target_type) {
            case 'all_users':
            case 'broadcast':
                return 'All Users';
            case 'targeted_group':
                return 'Targeted Group (Specific group not set)'; // Fallback if target_value is empty
            case 'targeted_user':
                return 'Targeted User (Specific user not set)'; // Fallback
            case 'system_alert':
                return 'System Alert Recipients';
            default:
                return ucfirst(str_replace('_', ' ', $this->target_type));
        }
    }
}