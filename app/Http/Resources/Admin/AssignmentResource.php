<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage; // If you need to generate download URLs

class AssignmentResource extends JsonResource
{
    public function toArray($request)
    {
        // Get submissions count if you have a submissions relationship and it's loaded
        $submissionsReceived = $this->whenLoaded('submissions', fn() => $this->submissions->count(), null);
        // totalStudents would likely come from another source or be a fixed value for the assignment group
        // For now, it's not directly in the Assignment model

        $instructionFileUrl = null;
        if ($this->instructions_file_path) {
            // Example URL for downloading. Assumes a route like 'admin.assignments.downloadInstructions'
            // $instructionFileUrl = route('admin.assignments.downloadInstructions', $this->id);
            // Or if public and you want to expose the direct URL (less secure for private files)
            // if (Storage::disk('public')->exists($this->instructions_file_path)) {
            //    $instructionFileUrl = Storage::disk('public')->url($this->instructions_file_path);
            // }
        }


        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'course' => $this->course,
            // 'courseName' => $this->whenLoaded('courseModel', fn() => $this->courseModel?->name),
            'dueDate' => $this->due_date->format('Y-m-d'),
            'status' => $this->status,
            'assignedTo' => $this->assigned_to_description, // Renamed from assignedToDescription for frontend consistency
            // 'assignedToIds' => $this->assigned_to_ids,
            'hasInstructionsFile' => !empty($this->instructions_file_path),
            // 'instructionFileUrl' => $instructionFileUrl, // URL to download
            'createdBy' => $this->whenLoaded('creator', fn() => $this->creator?->name, 'System'),
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),

            // Data for display, mirroring your initial frontend data
            // These would ideally come from related models or calculated fields
            'submissionsReceived' => $this->submissions_received_count ?? null, // Example: if you add an accessor or count
            'totalStudents' => $this->total_students_assigned ?? null, // Example
        ];
    }
}