// src/components/admin/settings/AdminSystemSettings.jsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import { Switch } from '@/components/ui/switch';
import { AlertCircle, CheckCircle } from "lucide-react";
import { useCallback, useEffect, useState } from 'react';
import SettingsApi from '../../../Services/Api/Admin/SettingsApi'; // Adjust path
import SettingsSection from '../Settings/SettingsSection'; // Adjusted path

const defaultSettingsState = { // Used if API fails or for initial structure
    general: { siteName: "", siteLogoUrl: "", adminEmail: "", timezone: "Etc/UTC", maintenanceMode: false },
    appearance: { primaryColor: "#000000", customCss: "" },
    email: { smtpHost: "", smtpPort: "", smtpUser: "", smtpSecure: false, senderName: "", senderEmail: "" },
};

const TIMEZONES = ["Etc/UTC", "America/New_York", "Europe/London", "Asia/Tokyo", "Australia/Sydney"]; // Example

// Skeleton for a settings section
const SettingsSectionSkeleton = () => (
    <div className="space-y-4 p-6 border rounded-lg">
        <Skeleton className="h-6 w-1/3 mb-2" /> {/* Title */}
        <Skeleton className="h-4 w-2/3 mb-6" /> {/* Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" /> <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" /> <Skeleton className="h-10 w-full" />
            </div>
        </div>
        <Skeleton className="h-10 w-24 mt-6" /> {/* Save button */}
    </div>
);

export default function AdminSystemSettings() {
    const [settings, setSettings] = useState(defaultSettingsState);
    const [originalSettings, setOriginalSettings] = useState(defaultSettingsState);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState({}); // { sectionKey: boolean }
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // For save success

    const fetchSettings = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await SettingsApi.getAll();
            const fetchedSettings = { // Ensure all sections exist, even if API doesn't return them
                general: { ...defaultSettingsState.general, ...response.data.general },
                appearance: { ...defaultSettingsState.appearance, ...response.data.appearance },
                email: { ...defaultSettingsState.email, ...response.data.email },
            };
            setSettings(fetchedSettings);
            setOriginalSettings(JSON.parse(JSON.stringify(fetchedSettings))); // Deep copy
        } catch (err) {
            console.error("Failed to fetch settings:", err);
            setError(err.response?.data?.message || "Could not load system settings. Using defaults.");
            // Keep default settings if fetch fails
            setSettings(defaultSettingsState);
            setOriginalSettings(JSON.parse(JSON.stringify(defaultSettingsState)));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handleInputChange = (section, field, value) => {
        setSuccessMessage(''); // Clear success message on change
        setSettings(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const handleSwitchChange = (section, field, checked) => {
        setSuccessMessage('');
        setSettings(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: checked }
        }));
    };
    
    const hasChangesInSection = (sectionKey) => {
        if (!settings[sectionKey] || !originalSettings[sectionKey]) return false;
        return JSON.stringify(settings[sectionKey]) !== JSON.stringify(originalSettings[sectionKey]);
    };

    const handleSaveSection = async (sectionKey) => {
        setIsSaving(prev => ({ ...prev, [sectionKey]: true }));
        setError(null);
        setSuccessMessage('');
        try {
            const response = await SettingsApi.updateSection(sectionKey, settings[sectionKey]);
            // Update originalSettings with the successfully saved (and potentially transformed by backend) data
            setOriginalSettings(prev => ({
                ...prev,
                [sectionKey]: JSON.parse(JSON.stringify(response.data)) // Use response.data
            }));
            // Also update current settings state if backend transformed data
            setSettings(prev => ({
                ...prev,
                [sectionKey]: JSON.parse(JSON.stringify(response.data))
            }));
            setSuccessMessage(`${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} settings saved successfully!`);
        } catch (err) {
            console.error(`Failed to save ${sectionKey} settings:`, err);
            setError(err.response?.data?.message || `Could not save ${sectionKey} settings.`);
        } finally {
            setIsSaving(prev => ({ ...prev, [sectionKey]: false }));
        }
    };

    const handleClearCache = async () => {
        setError(null);
        setSuccessMessage('');
        // Add a loading state for this action if it's long
        try {
            const response = await SettingsApi.clearCache();
            setSuccessMessage(response.data.message || "Cache cleared successfully!");
        } catch (err) {
            console.error("Failed to clear cache:", err);
            setError(err.response?.data?.message || "Could not clear cache.");
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-8 p-4 md:p-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">System Settings</h1>
                    <Skeleton className="h-5 w-3/4" /> {/* Description skeleton */}
                </div>
                <SettingsSectionSkeleton />
                <SettingsSectionSkeleton />
                <SettingsSectionSkeleton />
            </div>
        );
    }

    return (
        <div className="space-y-8 p-4 md:p-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">System Settings</h1>
                <p className="text-muted-foreground">
                    Configure general settings, appearance, and other system parameters.
                </p>
            </div>

            {error && (
                <Alert variant="destructive" className="my-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {successMessage && (
                 <Alert variant="default" className="my-4 bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )}

            {/* General Settings Section */}
            <SettingsSection
                title="General Settings"
                description="Configure basic site information and operational modes."
                onSave={() => handleSaveSection('general')}
                isSaving={isSaving['general']}
                hasChanges={hasChangesInSection('general')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input id="siteName" value={settings.general.siteName} onChange={(e) => handleInputChange('general', 'siteName', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="adminEmail">Administrator Email</Label>
                        <Input id="adminEmail" type="email" value={settings.general.adminEmail} onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="siteLogoUrl">Site Logo URL</Label>
                        <Input id="siteLogoUrl" value={settings.general.siteLogoUrl} onChange={(e) => handleInputChange('general', 'siteLogoUrl', e.target.value)} placeholder="e.g., /images/logo.png" />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select id="timezone" className="input-field-styles" value={settings.general.timezone} onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}>
                            {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                    <Switch id="maintenanceMode" checked={settings.general.maintenanceMode} onCheckedChange={(checked) => handleSwitchChange('general', 'maintenanceMode', checked)} />
                    <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
                </div>
                {settings.general.maintenanceMode && (
                    <Alert variant="destructive" className="mt-3">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Maintenance Mode Active</AlertTitle>
                        <AlertDescription>When maintenance mode is enabled, regular users cannot access the site.</AlertDescription>
                    </Alert>
                )}
            </SettingsSection>

            {/* Appearance Settings Section */}
            {/* <SettingsSection
                title="Appearance & Branding"
                description="Customize the look and feel of your platform."
                onSave={() => handleSaveSection('appearance')}
                isSaving={isSaving['appearance']}
                hasChanges={hasChangesInSection('appearance')}
            >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-1">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex items-center gap-2">
                             <Input id="primaryColor" type="color" value={settings.appearance.primaryColor} onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)} className="w-12 h-10 p-1" />
                            <Input type="text" value={settings.appearance.primaryColor} onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)} placeholder="#RRGGBB" className="flex-1" />
                        </div>
                    </div>
                </div>
                <div className="space-y-1 pt-4">
                    <Label htmlFor="customCss">Custom CSS</Label>
                    <Textarea id="customCss" value={settings.appearance.customCss} onChange={(e) => handleInputChange('appearance', 'customCss', e.target.value)} rows={8} placeholder="body { background-color: #f0f0f0; }" />
                    <p className="text-xs text-muted-foreground">Add custom CSS rules. Be cautious.</p>
                </div>
            </SettingsSection> */}

            {/* Email Settings Section */}
            <SettingsSection
                title="Email Configuration"
                description="Setup SMTP server for sending transactional emails."
                onSave={() => handleSaveSection('email')}
                isSaving={isSaving['email']}
                hasChanges={hasChangesInSection('email')}
            >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1"><Label htmlFor="smtpHost">SMTP Host</Label><Input id="smtpHost" value={settings.email.smtpHost} onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)} /></div>
                    <div className="space-y-1"><Label htmlFor="smtpPort">SMTP Port</Label><Input id="smtpPort" type="number" value={settings.email.smtpPort} onChange={(e) => handleInputChange('email', 'smtpPort', e.target.value)} /></div>
                    <div className="space-y-1"><Label htmlFor="smtpUser">SMTP Username</Label><Input id="smtpUser" value={settings.email.smtpUser} onChange={(e) => handleInputChange('email', 'smtpUser', e.target.value)} /></div>
                    <div className="space-y-1">
                        <Label htmlFor="smtpPassword">SMTP Password</Label>
                        <Input id="smtpPassword" type="password" placeholder="Leave blank to keep current or enter new" onChange={(e) => handleInputChange('email', 'smtpPassword', e.target.value)} />
                        <p className="text-xs text-muted-foreground">Password is write-only.</p>
                    </div>
                    <div className="flex items-center space-x-2 col-span-1 md:col-span-2">
                        <Switch id="smtpSecure" checked={settings.email.smtpSecure} onCheckedChange={(checked) => handleSwitchChange('email', 'smtpSecure', checked)} />
                        <Label htmlFor="smtpSecure">Use SSL/TLS</Label>
                    </div>
                    <div className="space-y-1"><Label htmlFor="senderName">Default Sender Name</Label><Input id="senderName" value={settings.email.senderName} onChange={(e) => handleInputChange('email', 'senderName', e.target.value)} /></div>
                    <div className="space-y-1"><Label htmlFor="senderEmail">Default Sender Email</Label><Input id="senderEmail" type="email" value={settings.email.senderEmail} onChange={(e) => handleInputChange('email', 'senderEmail', e.target.value)} /></div>
                </div>
            </SettingsSection>

            <SettingsSection title="System Actions" description="Perform system-level operations.">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={handleClearCache} /* Add loading state if needed */ >
                        Clear System Cache
                    </Button>
                </div>
            </SettingsSection>
             {/* Placeholder for input-field-styles CSS if not using shadcn Select */}
            <style jsx>{`
                .input-field-styles {
                    /* Replicate shadcn/ui Input styles or define your own */
                    display: flex;
                    height: 2.5rem; /* h-10 */
                    width: 100%;
                    align-items: center;
                    justify-content: space-between;
                    border-radius: 0.375rem; /* rounded-md */
                    border: 1px solid hsl(var(--input)); /* border-input */
                    background-color: hsl(var(--background));
                    padding-left: 0.75rem; /* px-3 */
                    padding-right: 0.75rem; /* px-3 */
                    padding-top: 0.5rem; /* py-2 */
                    padding-bottom: 0.5rem; /* py-2 */
                    font-size: 0.875rem; /* text-sm */
                    /* ... other styles from shadcn/ui Input/SelectTrigger */
                }
                .input-field-styles:focus {
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    box-shadow: 0 0 0 2px hsl(var(--ring)); /* focus:ring-2 focus:ring-ring */
                }
            `}</style>
        </div>
    );
}