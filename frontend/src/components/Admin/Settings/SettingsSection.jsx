// src/components/admin/settings/SettingsSection.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

export default function SettingsSection({ title, description, children, onSave, isSaving, hasChanges }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-6">
                {children}
            </CardContent>
            {onSave && ( // Only show footer with save button if onSave is provided
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={onSave} disabled={isSaving || !hasChanges}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}