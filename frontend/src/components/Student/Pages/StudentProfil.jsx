import React from 'react';
import { useUserContext } from "../../../context/StudentContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { KeyRound, UserCog } from "lucide-react";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Card>
        <CardHeader className="items-center text-center border-b pb-6">
          <Skeleton className="w-24 h-24 rounded-full mb-4" />
          <Skeleton className="h-7 w-48 mx-auto mb-1" />
          <Skeleton className="h-5 w-32 mx-auto" />
        </CardHeader>
        <CardContent className="mt-6">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center">
                <Skeleton className="h-5 w-1/3 sm:mb-0 mb-1" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Skeleton className="h-10 w-full sm:w-36" />
            <Skeleton className="h-10 w-full sm:w-44" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function StudentProfile() {
  const { user, isLoading } = useUserContext();

  if (isLoading || !user) {
    return <ProfileSkeleton />;
  }

  const getInitials = (name) => {
    if (!name) return "S";
    const names = name.split(" ");
    const firstInitial = names[0]?.[0] || '';
    const lastInitial = names.length > 1 ? names[names.length - 1]?.[0] || '' : '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || name.substring(0, 2).toUpperCase();
  };

  const handleEditProfile = () => {
    // Implement navigation or modal for editing profile
    console.log("Edit profile action triggered");
  };

  const handleChangePassword = () => {
    // Implement navigation or modal for changing password
    console.log("Change password action triggered");
  };

  const profileDetails = [
      { label: "Student ID", value: user.id },
      { label: "Full Name", value: user.name },
      { label: "Email Address", value: user.email },
      { label: "Enrolled Since", value: user.created_at ? new Date(user.created_at).toLocaleDateString() : null },
      // Add other relevant fields from your user object if they exist
      // { label: "Department", value: user.department }, 
      // { label: "Level", value: user.level },
      // { label: "Last Login", value: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : null },
  ].filter(item => item.value !== null && item.value !== undefined);


  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Card>
        <CardHeader className="items-center text-center border-b pb-6">
          <Avatar className="w-24 h-24 mb-4 text-3xl">
            <AvatarImage src={user.avatarUrl || undefined} alt={user.name || "Student Avatar"} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name || "Student Name"}</CardTitle>
          <CardDescription>{user.role || "Student"}</CardDescription>
        </CardHeader>

        <CardContent className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Student Information</h3>
          <div className="space-y-3">
            {profileDetails.map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center">
                  <span className="sm:w-1/3 text-sm font-medium text-gray-600 dark:text-gray-400">{item.label}:</span>
                  <span className="sm:w-2/3 text-gray-800 dark:text-gray-200">{item.value}</span>
                </div>
            ))}
            {profileDetails.length === 0 && (
                <p className="text-muted-foreground text-center sm:text-left">No additional profile details available.</p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button variant="outline" onClick={handleEditProfile} className="w-full sm:w-auto">
              <UserCog className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
            <Button variant="outline" onClick={handleChangePassword} className="w-full sm:w-auto">
              <KeyRound className="mr-2 h-4 w-4" /> Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}