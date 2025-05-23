// src/components/admin/notifications/NotificationsLog.jsx
import React from 'react';
import NotificationLogItem from './NotificationLogItem';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsLog({ notifications }) {
    if (!notifications || notifications.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Notification Log</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">No notifications found in the log.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notification Log</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto pr-2"> {/* Scrollable log */}
                {notifications.slice().reverse().map((notification) => ( // Show newest first
                    <NotificationLogItem key={notification.id} notification={notification} />
                ))}
            </CardContent>
        </Card>
    );
}