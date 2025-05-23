// src/components/admin/notifications/AdminManageNotifications.jsx
import React, { useState, useEffect, useCallback } from 'react';
import SendNotificationForm from '../Forms/SendNotificationForm'; // Ensure this component exists and works
import NotificationsLog from '../Notifications/NotificationLog';
import NotificationApi from '../../../Services/Api/Admin/NotificationApi'; // Adjust path if your Api folder is elsewhere
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';

// A simple mock for SendNotificationForm if you don't have it yet, for testing purposes
const MockSendNotificationForm = ({ onSendNotification, isSending }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        onSendNotification({
            title: formData.get('title'),
            message: formData.get('message'),
            targetType: formData.get('targetType'),
            targetValue: formData.get('targetValue'),
        });
        // e.target.reset(); // Optionally reset form here
    };
    return (
        <Card>
            <CardHeader><CardTitle>Send New Notification</CardTitle></CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label htmlFor="title-input">Title:</label><input id="title-input" name="title" required className="w-full p-2 border rounded"/></div>
                    <div><label htmlFor="message-input">Message:</label><textarea id="message-input" name="message" required  className="w-full p-2 border rounded"/></div>
                    <div><label htmlFor="targetType-input">Target Type:</label>
                        <select id="targetType-input" name="targetType"  className="w-full p-2 border rounded">
                            <option value="all_users">All Users (Broadcast)</option>
                            <option value="targeted_group">Targeted Group</option>
                            <option value="targeted_user">Targeted User</option>
                            <option value="system_alert">System Alert</option>
                        </select>
                    </div>
                    <div><label htmlFor="targetValue-input">Target Value (e.g., Group Name, User ID):</label><input id="targetValue-input" name="targetValue"  className="w-full p-2 border rounded"/></div>
                    <button type="submit" disabled={isSending} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300">
                        {isSending ? 'Sending...' : 'Send Notification'}
                    </button>
                </form>
            </CardContent>
        </Card>
    );
};


export default function AdminManageNotifications({ visible }) {
    const [notificationsLog, setNotificationsLog] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [isLoadingLog, setIsLoadingLog] = useState(true);
    const [error, setError] = useState(null);
    // TODO: Add pagination state if your API supports it (e.g., currentPage, totalPages)

    // The visible prop might come from a higher-level component controlling tabs/sections
    if (typeof visible !== 'undefined' && !visible) return null;

    const fetchNotifications = useCallback(async () => {
        setIsLoadingLog(true);
        setError(null);
        try {
            const response = await NotificationApi.all();
            // Laravel API resources (collections) usually wrap data in a 'data' key.
            // If paginated, response.data will be { data: [], links: {}, meta: {} }
            setNotificationsLog(response.data.data || []);
            // TODO: Set pagination info if using: setPaginationInfo(response.data.meta);
        } catch (err) {
            console.error("Failed to fetch notifications:", err);
            const errorMsg = err.response?.data?.message || "Failed to load notification log. Please try again later.";
            setError(errorMsg);
            setNotificationsLog([]);
        } finally {
            setIsLoadingLog(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const handleSendNotification = async (notificationDataFromForm) => {
        setIsSending(true);
        setError(null);
        try {
            const response = await NotificationApi.send(notificationDataFromForm);
            // Laravel API resource (single) also wraps data in a 'data' key.
            const newNotificationEntry = response.data.data;
            
            // Add new notification to the top of the log
            setNotificationsLog(prevLog => [newNotificationEntry, ...prevLog]);
            
            // Or, if you want to ensure perfect sync with backend sorting/pagination:
            // await fetchNotifications(); 

            // TODO: Use a toast notification system instead of alert
            alert("Notification Sent Successfully!"); 
            // The SendNotificationForm should ideally handle resetting itself upon successful submission.
            // You might pass a prop like `onSuccess` to it.
        } catch (err) {
            console.error("Failed to send notification:", err);
            let errorMessage = "Failed to send notification. Please check details and try again.";
            if (err.response?.data?.errors) { // Handle Laravel validation errors
                const errors = err.response.data.errors;
                errorMessage = Object.values(errors).flat().join(' ');
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage);
            // alert(`Error: ${errorMessage}`); // Use toast
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="space-y-8 p-4 md:p-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Manage Notifications</h1>
                <p className="text-muted-foreground">
                    Send communications to users and view the log of past notifications.
                </p>
            </div>

            {error && (
                <Alert variant="destructive" className="my-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Operation Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Replace MockSendNotificationForm with your actual SendNotificationForm */}
            {/* <MockSendNotificationForm onSendNotification={handleSendNotification} isSending={isSending} /> */}
            <SendNotificationForm onSendNotification={handleSendNotification} isSending={isSending} />
            
            {isLoadingLog ? (
                <Card>
                    <CardHeader><CardTitle>Notification Log</CardTitle></CardHeader>
                    <CardContent className="space-y-6 p-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="p-4 border rounded-md space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ) : (
                <NotificationsLog notifications={notificationsLog} />
            )}
            {/* TODO: Add pagination controls here if implementing pagination */}
        </div>
    );
}