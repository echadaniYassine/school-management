import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For profile picture
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { KeyRound, UserCog } from "lucide-react"; // Example icons
import { useUserContext } from "../../../context/UserContext"; // Ensure this context provides ADMIN user data

function SkeletonRow() {
  return (
    <TableRow>
      {/* Adjusted skeleton to potentially match a more detailed profile display */}
      <TableCell className="w-2/5"><div className="h-5 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-full" /></TableCell>
      <TableCell className="w-3/5"><div className="h-5 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-full" /></TableCell>
    </TableRow>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <Card>
        <CardHeader className="items-center text-center"> {/* Centered header for profile */}
          <div className="h-24 w-24 bg-gray-300 rounded-full animate-pulse dark:bg-gray-700 mb-2" /> {/* Avatar Skeleton */}
          <CardTitle>
            <div className="h-7 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-48 mx-auto" />
          </CardTitle>
          <CardDescription>
            <div className="h-5 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-32 mx-auto mt-1" /> {/* Role Skeleton */}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4">
          <Table>
            {/* No TableHeader for key-value display */}
            <TableBody>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </TableBody>
          </Table>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"> {/* Centered buttons */}
            <div className="h-10 w-full sm:w-36 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
            <div className="h-10 w-full sm:w-40 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default function AdminProfile() { // Renamed for clarity if it's always admin
  const { user, isLoading } = useUserContext(); // Assuming context might provide an isLoading flag

  // Handle loading state more explicitly if context provides `isLoading`
  // If not, `!user` is a good proxy for initial loading.
  if (isLoading || !user) {
    return <ProfileSkeleton />;
  }

  const handleEditProfile = () => {
    // TODO: Implement Edit Profile Modal/Page Navigation
    // e.g., setIsEditModalOpen(true) or router.push('/admin/profile/edit')
    alert("Edit Profile functionality to be implemented!");
  };

  const handleChangePassword = () => {
    // TODO: Implement Change Password Modal/Page
    alert("Change Password functionality to be implemented!");
  };

  // Helper to get initials for AvatarFallback
  const getInitials = (name) => {
    if (!name) return 'A';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };


  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6"> {/* Adjusted max-width for a typical profile page */}
      <Card>
        <CardHeader className="items-center text-center border-b pb-6"> {/* Centered header for profile */}
          <Avatar className="w-24 h-24 mb-4 text-3xl">
            <AvatarImage src={user.avatarUrl || undefined} alt={user.name || "Admin"} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name || "Administrator"}</CardTitle>
          <CardDescription>{user.role || "Admin"}</CardDescription> {/* Assuming user object has a role */}
        </CardHeader>

        <CardContent className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Profile Information</h3>
          <div className="space-y-4">
            {[
              { label: "User ID", value: user.id },
              { label: "Full Name", value: user.name },
              { label: "Email Address", value: user.email },
              { label: "Member Since", value: user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A" },
              { label: "Last Login", value: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A" },
              // Add more admin-specific fields if available
            ].map((item) => (
              item.value ? ( // Only render if value exists
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center">
                  <span className="sm:w-1/3 text-sm font-medium text-gray-600 dark:text-gray-400">{item.label}:</span>
                  <span className="sm:w-2/3 text-gray-800 dark:text-gray-200">{item.value}</span>
                </div>
              ) : null
            ))}
          </div>

          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button variant="outline" onClick={handleEditProfile} className="w-full sm:w-auto">
              <UserCog className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
            <Button variant="outline" onClick={handleChangePassword} className="w-full sm:w-auto">
              <KeyRound className="mr-2 h-4 w-4" /> Change Password
            </Button>
            {/* Add other actions like "View Activity Log" or "Manage 2FA" */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}