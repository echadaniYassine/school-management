// src/components/admin/settings/SettingsSection.jsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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