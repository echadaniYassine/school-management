// src/components/NotificationBell.jsx

import React, { useState } from 'react';
import {
  Bell,
  MessageSquare,
  ClipboardCheck,
  Megaphone,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';


const initialNotifications = [
  {
    id: 1,
    type: 'assignment',
    title: 'New assignment posted in "History 101".',
    timestamp: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'message',
    title: 'You have a new message from Mr. Smith.',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'announcement',
    title: 'Parent-teacher meetings scheduled for next Friday.',
    timestamp: '3 hours ago',
    read: true,
  },
];

// Helper to get the right icon for each notification type
const notificationIcons = {
  message: <MessageSquare className="h-5 w-5 text-blue-500" />,
  assignment: <ClipboardCheck className="h-5 w-5 text-green-500" />,
  announcement: <Megaphone className="h-5 w-5 text-indigo-500" />,
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Open notifications</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <Separator />

        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="mt-1">{notificationIcons[notification.type]}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="mt-1 flex-shrink-0"
                    title="Mark as read"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="p-8 text-center text-sm text-muted-foreground">
              You have no new notifications.
            </p>
          )}
        </div>
        <Separator />
        <div className="p-2 text-center">
            <Button variant="link" size="sm" className="w-full">
                View All Notifications
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}