<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\User; // If using sent_by_id
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationFactory extends Factory
{
    protected $model = Notification::class;

    public function definition()
    {
        $types = ['broadcast', 'targeted_group', 'targeted_user', 'system_alert'];
        $selectedType = $this->faker->randomElement($types);
        $targetValue = null;
        $sentByName = 'Admin Team';

        switch ($selectedType) {
            case 'broadcast':
                $targetValue = 'All Users';
                break;
            case 'targeted_group':
                $targetValue = 'Students Grade ' . $this->faker->numberBetween(9, 12);
                $sentByName = $this->faker->name . ' (Teacher Admin)';
                break;
            case 'targeted_user':
                $targetValue = 'user_' . $this->faker->randomNumber(5);
                $sentByName = 'Support Team';
                break;
            case 'system_alert':
                $targetValue = 'System Administrators';
                $sentByName = 'System Monitoring';
                break;
        }

        return [
            'type' => $selectedType,
            'title' => $this->faker->sentence(5),
            'message' => $this->faker->paragraph(3),
            'target_type' => $selectedType, // Can be more specific, e.g., 'group_name', 'user_identifier'
            'target_value' => $targetValue,
            'sent_by_id' => User::inRandomOrder()->first()?->id, // Example if using user IDs
            'sent_by_name' => $sentByName,
            'sent_at' => $this->faker->dateTimeThisYear(),
            'status' => $this->faker->randomElement(['Sent', 'Failed', 'Scheduled', 'Logged']),
        ];
    }
}