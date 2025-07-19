// src/components/Teacher/TeacherProfil.jsx

import { useUserContext } from "../../context/UserContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { KeyRound, UserCog } from "lucide-react";

function SkeletonRow() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="w-1/3 h-5 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
      <div className="w-2/3 h-5 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <Card>
        <CardHeader className="items-center text-center">
          <div className="h-24 w-24 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 mb-2" />
          <CardTitle>
            <div className="h-7 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-48 mx-auto" />
          </CardTitle>
          <CardDescription>
            <div className="h-5 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-32 mx-auto mt-1" />
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4 space-y-4">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </CardContent>
      </Card>
    </div>
  );
}

export default function TeacherProfil() {
  const { user, isLoading } = useUserContext();

  if (isLoading || !user) {
    return <ProfileSkeleton />;
  }

  const getInitials = (name) => {
    if (!name) return "S";
    const names = name.split(" ");
    return names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  const handleEditProfile = () => {
    alert("Edit Student Profile functionality coming soon!");
  };

  const handleChangePassword = () => {
    alert("Change Password functionality coming soon!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Card>
        <CardHeader className="items-center text-center border-b pb-6">
          <Avatar className="w-24 h-24 mb-4 text-3xl">
            <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name || "Student"}</CardTitle>
          <CardDescription>{user.role || "Student"}</CardDescription>
        </CardHeader>

        <CardContent className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Student Information</h3>
          <div className="space-y-4">
            {[
              { label: "Student ID", value: user.id },
              { label: "Full Name", value: user.name },
              { label: "Email Address", value: user.email },
              { label: "Enrolled Since", value: user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A" },
              { label: "Last Login", value: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A" },
              { label: "Department", value: user.department },
              { label: "Level", value: user.level },
            ].map((item) =>
              item.value ? (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center">
                  <span className="sm:w-1/3 text-sm font-medium text-gray-600 dark:text-gray-400">{item.label}:</span>
                  <span className="sm:w-2/3 text-gray-800 dark:text-gray-200">{item.value}</span>
                </div>
              ) : null
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
