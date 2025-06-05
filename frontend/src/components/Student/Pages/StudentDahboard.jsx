import React from 'react';
import { useUserContext } from "../../../context/StudentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCircle } from 'lucide-react';

const DashboardLoadingSkeleton = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center">
                 <Skeleton className="h-6 w-6 mr-2 rounded-full" />
                 <Skeleton className="h-6 w-48" />
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <div className="min-w-full">
                    <div className="bg-gray-100 dark:bg-gray-700 grid grid-cols-4 py-2 px-4">
                        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-5 w-3/4" />)}
                    </div>
                    <div className="grid grid-cols-4 py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                         {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-5 w-full" />)}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);


export default function StudentDashboard() {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return (
        <div className="space-y-6 p-4 md:p-6">
            <DashboardLoadingSkeleton />
             {/* You can add more skeleton sections for other dashboard parts */}
        </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 text-gray-800 dark:text-gray-100">
      {user ? (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                    <UserCircle className="mr-2 h-6 w-6" />
                    User Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 ">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                        <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                        <td className="py-3 px-4 whitespace-nowrap">{user.id}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{user.name}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{user.email}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
      ) : (
        <Card>
            <CardHeader>
                <CardTitle>No User Data</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">User information could not be loaded.</p>
            </CardContent>
        </Card>
      )}
      {/* Add more dashboard sections/cards here */}
    </div>
  );
}