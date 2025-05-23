// src/components/admin/settings/AdminSystemSettings.jsx
import React, { useState, useEffect } from 'react';
import SettingsSection from '../Settings/SettingsSection'; // Assuming it's in the same folder
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch'; // For boolean toggles like maintenance mode
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button'; // For actions like 'Clear Cache'

// Initial/Default settings - In a real app, these would be fetched from a backend
const initialSettingsState = {
    general: {
        siteName: "My E-Learning Platform",
        siteLogoUrl: "/img/default-logo.png",
        adminEmail: "admin@example.com",
        timezone: "Etc/UTC",
        maintenanceMode: false,
    },
    appearance: {
        primaryColor: "#4F46E5", // Indigo
        // secondaryColor: "#0E7490", // Cyan
        customCss: "/* Your custom CSS here */\nbody {\n  font-family: 'Inter', sans-serif;\n}",
    },
    email: { // Example, actual SMTP password should be handled securely on backend
        smtpHost: "",
        smtpPort: "", // e.g. 587 or 465
        smtpUser: "",
        smtpSecure: true, // true for SSL/TLS
        senderName: "Platform Notifications",
        senderEmail: "noreply@example.com",
    },
    // Add more sections as needed: security, integrations, etc.
};

// Example timezones - you'd likely use a more comprehensive list or a library
const TIMEZONES = ["Etc/UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

export default function AdminSystemSettings() {
    const [settings, setSettings] = useState(initialSettingsState);
    const [originalSettings, setOriginalSettings] = useState(JSON.parse(JSON.stringify(initialSettingsState))); // For 'hasChanges'
    const [isSaving, setIsSaving] = useState({}); // Track saving state per section

    // In a real app, fetch settings from API on mount
    useEffect(() => {
        // const fetchSettings = async () => {
        //   // const response = await api.get('/system-settings');
        //   // setSettings(response.data);
        //   // setOriginalSettings(JSON.parse(JSON.stringify(response.data))); 
        // };
        // fetchSettings();
        // For now, we use initialSettingsState
    }, []);

    const handleInputChange = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            }
        }));
    };

    const handleSwitchChange = (section, field, checked) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: checked,
            }
        }));
    };
    
    const hasChangesInSection = (sectionKey) => {
        return JSON.stringify(settings[sectionKey]) !== JSON.stringify(originalSettings[sectionKey]);
    }

    const handleSaveSection = async (sectionKey) => {
        setIsSaving(prev => ({ ...prev, [sectionKey]: true }));
        console.log(`Saving ${sectionKey} settings:`, settings[sectionKey]);

        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        //  HERE: Implement your actual API call to save settings
        //  e.g., await api.put(`/system-settings/${sectionKey}`, settings[sectionKey]);
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // After successful save, update originalSettings to reflect the new saved state
        setOriginalSettings(prev => ({
            ...prev,
            [sectionKey]: JSON.parse(JSON.stringify(settings[sectionKey]))
        }));

        setIsSaving(prev => ({ ...prev, [sectionKey]: false }));
        alert(`${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} settings saved! (Simulated)`);
    };

    const handleClearCache = async () => {
        // Example of a system action
        alert("Cache clearing initiated... (Simulated)");
        // await api.post('/system/clear-cache');
        alert("Cache cleared! (Simulated)");
    }


    return (
        <div className="space-y-8 p-4 md:p-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">System Settings</h1>
                <p className="text-muted-foreground">
                    Configure general settings, appearance, and other system parameters.
                </p>
            </div>

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
                        <Input
                            id="siteName"
                            value={settings.general.siteName}
                            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="adminEmail">Administrator Email</Label>
                        <Input
                            id="adminEmail"
                            type="email"
                            value={settings.general.adminEmail}
                            onChange={(e) => handleInputChange('general', 'adminEmail', e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="siteLogoUrl">Site Logo URL</Label>
                        <Input
                            id="siteLogoUrl"
                            value={settings.general.siteLogoUrl}
                            onChange={(e) => handleInputChange('general', 'siteLogoUrl', e.target.value)}
                            placeholder="e.g., /images/logo.png"
                        />
                        {/* You might add a file uploader here for logos */}
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select // Using native select for simplicity, or use shadcn/ui Select
                            id="timezone"
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={settings.general.timezone}
                            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                        >
                            {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                    <Switch
                        id="maintenanceMode"
                        checked={settings.general.maintenanceMode}
                        onCheckedChange={(checked) => handleSwitchChange('general', 'maintenanceMode', checked)}
                    />
                    <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
                </div>
                {settings.general.maintenanceMode && (
                    <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-md">
                        Warning: When maintenance mode is enabled, regular users will not be able to access the site.
                    </p>
                )}
            </SettingsSection>

            {/* Appearance Settings Section */}
            <SettingsSection
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
                             <Input
                                id="primaryColor"
                                type="color" // Native color picker
                                value={settings.appearance.primaryColor}
                                onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                                className="w-12 h-10 p-1" // Basic styling for color input
                            />
                            <Input
                                type="text"
                                value={settings.appearance.primaryColor}
                                onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                                placeholder="#RRGGBB"
                                className="flex-1"
                            />
                        </div>
                    </div>
                    {/* Add Secondary Color similarly if needed */}
                </div>
                <div className="space-y-1 pt-4">
                    <Label htmlFor="customCss">Custom CSS</Label>
                    <Textarea
                        id="customCss"
                        value={settings.appearance.customCss}
                        onChange={(e) => handleInputChange('appearance', 'customCss', e.target.value)}
                        rows={8}
                        placeholder="body { background-color: #f0f0f0; }"
                    />
                    <p className="text-xs text-muted-foreground">
                        Add custom CSS rules. Be cautious as incorrect CSS can break site layout.
                    </p>
                </div>
            </SettingsSection>

            {/* Email Settings Section */}
            <SettingsSection
                title="Email Configuration"
                description="Setup SMTP server for sending transactional emails."
                onSave={() => handleSaveSection('email')}
                isSaving={isSaving['email']}
                hasChanges={hasChangesInSection('email')}
            >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <Label htmlFor="smtpHost">SMTP Host</Label>
                        <Input id="smtpHost" value={settings.email.smtpHost} onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="smtpPort">SMTP Port</Label>
                        <Input id="smtpPort" type="number" value={settings.email.smtpPort} onChange={(e) => handleInputChange('email', 'smtpPort', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="smtpUser">SMTP Username</Label>
                        <Input id="smtpUser" value={settings.email.smtpUser} onChange={(e) => handleInputChange('email', 'smtpUser', e.target.value)} />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="smtpPassword">SMTP Password</Label>
                        <Input id="smtpPassword" type="password" placeholder="Enter new password or leave blank" 
                               onChange={(e) => handleInputChange('email', 'smtpPassword', e.target.value)} />
                        <p className="text-xs text-muted-foreground">Password is write-only for security. It won't be displayed.</p>
                    </div>
                    <div className="flex items-center space-x-2 col-span-1 md:col-span-2">
                        <Switch
                            id="smtpSecure"
                            checked={settings.email.smtpSecure}
                            onCheckedChange={(checked) => handleSwitchChange('email', 'smtpSecure', checked)}
                        />
                        <Label htmlFor="smtpSecure">Use SSL/TLS</Label>
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="senderName">Default Sender Name</Label>
                        <Input id="senderName" value={settings.email.senderName} onChange={(e) => handleInputChange('email', 'senderName', e.target.value)} />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="senderEmail">Default Sender Email</Label>
                        <Input id="senderEmail" type="email" value={settings.email.senderEmail} onChange={(e) => handleInputChange('email', 'senderEmail', e.target.value)} />
                    </div>
                </div>
            </SettingsSection>

            {/* System Actions Section (No Save Button for the section itself) */}
             <SettingsSection
                title="System Actions"
                description="Perform system-level operations."
            >
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={handleClearCache}>
                        Clear System Cache
                    </Button>
                    {/* Add other actions like 'Rebuild Search Index', 'Run Cron Jobs Manually' etc. */}
                </div>
            </SettingsSection>

        </div>
    );
}