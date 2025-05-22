import { useUserContext } from "../../../context/StudentContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function SkeletonRow() {
  return (
    <TableRow>
      {[...Array(4)].map((_, i) => (
        <TableCell key={i}>
          <div className="h-5 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-full" />
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function AdminProfil() {
  const { user } = useUserContext();

  // If user data is loading (null or undefined), show skeleton
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="h-6 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-48" />
            </CardTitle>
            <CardDescription>
              <div className="h-4 bg-gray-300 rounded animate-pulse dark:bg-gray-700 w-64 mt-1" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SkeletonRow />
              </TableBody>
            </Table>

            <div className="mt-6 flex justify-end">
              <div className="h-8 w-24 bg-gray-300 rounded animate-pulse dark:bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
          <CardDescription>Manage your user information</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-end">
            <Button variant="outline">Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
