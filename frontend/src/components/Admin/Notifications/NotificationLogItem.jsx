// src/components/admin/notifications/NotificationLogItem.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Users, Globe, AlertTriangle, Clock } from 'lucide-react';

const getTargetIcon = (type) => {
    switch (type) {
        case 'broadcast': return <Globe className="h-4 w-4 text-blue-500" />;
        case 'targeted_group': return <Users className="h-4 w-4 text-green-500" />;
        case 'targeted_user': return <User className="h-4 w-4 text-purple-500" />;
        case 'system_alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
        default: return <Globe className="h-4 w-4 text-gray-500" />;
    }
};

const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
        case 'sent': return 'success'; // Assuming you have a 'success' variant for Badge
        case 'failed': return 'destructive';
        case 'scheduled': return 'outline';
        default: return 'secondary';
    }
}


export default function NotificationLogItem({ notification }) {
    return (
        <Card className="mb-4">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-md">{notification.title}</CardTitle>
                    <Badge variant={getStatusBadgeVariant(notification.status)} className="ml-2 whitespace-nowrap">
                        {notification.status || 'Unknown'}
                    </Badge>
                </div>
                <div className="text-xs text-muted-foreground flex items-center space-x-3 pt-1">
                    <span className="flex items-center gap-1">
                        {getTargetIcon(notification.type)}
                        {notification.target || notification.type.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(notification.sentAt).toLocaleString()}
                    </span>
                    {notification.sentBy && (
                        <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            By: {notification.sentBy}
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
            </CardContent>
        </Card>
    );
}