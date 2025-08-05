<?php

namespace App\Policies;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AnnouncementPolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->value === 'admin') return true;
        return null;
    }

    // Anyone can view announcements.
    public function viewAny(?User $user): bool
    {
        return true;
    }
    public function view(?User $user, Announcement $announcement): bool
    {
        return true;
    }

    // Only teachers can create announcements (Admins are handled by `before`).
    public function create(User $user): bool
    {
        return $user->role->value === 'teacher';
    }

    // Teachers can only update their own announcements.
    public function update(User $user, Announcement $announcement): bool
    {
        return $user->id === $announcement->author_id;
    }
    public function delete(User $user, Announcement $announcement): bool
    {
        return $this->update($user, $announcement);
    }
}
