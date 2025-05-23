// src/components/admin/notifications/SendNotificationForm.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Send } from 'lucide-react';

const DEFAULT_FORM_DATA = {
    title: '',
    message: '',
    targetType: 'all_users', // 'all_users', 'specific_group', 'specific_user'
    targetValue: '', // e.g., Group Name or User ID/Email
};

// Example target groups - in a real app, these would come from your data
const TARGET_GROUPS = ["All Users", "Teachers", "Students Grade 10", "Students Grade 11", "Parents"];

export default function SendNotificationForm({ onSendNotification, isSending }) {
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value, targetValue: '' })); // Reset targetValue when type changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.message) {
            alert("Title and Message are required.");
            return;
        }
        if ((formData.targetType === 'specific_group' || formData.targetType === 'specific_user') && !formData.targetValue) {
            alert("Please specify the target group or user.");
            return;
        }
        onSendNotification(formData);
        // Optionally reset form after sending, if onSendNotification doesn't handle it
        // setFormData(DEFAULT_FORM_DATA);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Compose New Notification</CardTitle>
                <CardDescription>Send a message to users or user groups.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Notification Title (e.g., Important Update)"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter your notification message here..."
                            rows={5}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="targetType">Target Audience</Label>
                            <Select
                                value={formData.targetType}
                                onValueChange={(value) => handleSelectChange('targetType', value)}
                            >
                                <SelectTrigger id="targetType">
                                    <SelectValue placeholder="Select target" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all_users">All Users</SelectItem>
                                    <SelectItem value="specific_group">Specific Group</SelectItem>
                                    <SelectItem value="specific_user">Specific User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {formData.targetType === 'specific_group' && (
                            <div className="space-y-1">
                                <Label htmlFor="targetValueGroup">Select Group</Label>
                                <Select
                                    value={formData.targetValue}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, targetValue: value }))}
                                >
                                    <SelectTrigger id="targetValueGroup">
                                        <SelectValue placeholder="Select a group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TARGET_GROUPS.map(group => (
                                            <SelectItem key={group} value={group}>{group}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        {formData.targetType === 'specific_user' && (
                            <div className="space-y-1">
                                <Label htmlFor="targetValueUser">User ID or Email</Label>
                                <Input
                                    id="targetValueUser"
                                    value={formData.targetValue}
                                    onChange={(e) => setFormData(prev => ({ ...prev, targetValue: e.target.value }))}
                                    placeholder="Enter User ID or Email"
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSending} className="ml-auto">
                        <Send className="h-4 w-4 mr-2" />
                        {isSending ? 'Sending...' : 'Send Notification'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}