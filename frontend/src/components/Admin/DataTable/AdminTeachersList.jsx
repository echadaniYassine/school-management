// src/components/admin/DataTable/AdminTeachersList.jsx
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TeacherApi from "../../../Services/Api/Admin/TeacherApi.js"; // Corrected import
import TeacherUpsertForm from "../../Admin/Forms/TeachersUpsertForm.jsx"; // Renamed form
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "../../ui/alert-dialog.js";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader,
  SheetTitle, SheetTrigger
} from "../../ui/sheet.js";
import { DataTable } from "./DataTable.jsx";
import { DataTableColumnHeader } from "./DataTableColumnHeader.jsx";

export default function AdminTeachersList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 10 }); // For pagination

  const fetchTeachers = (page = 1) => {
     setIsLoading(true);
     TeacherApi.all({ page })
       .then((response) => {
         setData(response.data.data);
         setPagination({
             current_page: response.data.meta.current_page,
             last_page: response.data.meta.last_page,
             total: response.data.meta.total,
             per_page: response.data.meta.per_page,
         });
       })
       .catch(error => {
         console.error("Failed to fetch teachers:", error);
         toast.error("Failed to load teachers.");
       })
       .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchTeachers();
  }, []);

  const [openUpdateId, setOpenUpdateId] = useState(null);

  const handleUpdateSubmit = async (id, values) => {
    // No need for a separate promise variable here if just awaiting
    const updatingLoader = toast.loading("Updating teacher...");
    try {
      const response = await TeacherApi.update(id, values);
      if (response.status === 200) {
        const updatedTeacher = response.data.data; // Assuming resource is in 'data'
        const updatedList = data.map((item) => (item.id === id ? updatedTeacher : item));
        setData(updatedList);
        setOpenUpdateId(null); // Close the sheet
        toast.success(response.data.message || "Teacher updated successfully!");
      }
    } catch (error) {
      console.error("Update error:", error);
      const errors = error.response?.data?.errors;
      if (errors) {
         Object.values(errors).forEach(errMsgs => errMsgs.forEach(msg => toast.error(msg)));
      } else {
         toast.error(error.response?.data?.message || "Failed to update teacher.");
      }
    } finally {
      toast.dismiss(updatingLoader);
    }
  };

  const handleDelete = async (id) => {
    const deletingLoader = toast.loading("Deleting teacher...");
    try {
      const response = await TeacherApi.delete(id);
      if (response.status === 200) { // Or 204 if no content
        setData(data.filter((teacher) => teacher.id !== id));
        toast.success(response.data.message || "Teacher deleted successfully!", {
          description: `Successfully deleted teacher ID: ${id}`, // Use ID or name if available in response.data.data.name
          icon: <Trash2Icon className="text-red-500"/>,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete teacher.");
    } finally {
      toast.dismiss(deletingLoader);
    }
  };

  // Define columns for Teachers
  const AdminTeacherColumns = [
    { accessorKey: "id", header: ({ column }) => <DataTableColumnHeader column={column} title="#ID" /> },
    { accessorKey: "name", header: ({ column }) => <DataTableColumnHeader column={column} title="Name" /> },
    { accessorKey: "email", header: ({ column }) => <DataTableColumnHeader column={column} title="Email" /> },
    { accessorKey: "phone", header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" /> },
    {
      accessorKey: "date_of_birth",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date of Birth" />,
      cell: ({ row }) => {
         const rawDate = row.getValue("date_of_birth");
         return rawDate ? new Date(rawDate).toLocaleDateString() : 'N/A';
      }
    },
    {
      accessorKey: "gender",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
      cell: ({ row }) => (row.getValue("gender")?.charAt(0).toUpperCase() + row.getValue("gender")?.slice(1) || 'N/A'),
    },
    { accessorKey: "address", header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />, cell: ({row}) => row.getValue("address") || "N/A"},
    {
      accessorKey: "updated_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Last Updated" />,
      cell: ({ row }) => (new Date(row.getValue("updated_at")).toLocaleString()),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const teacher = row.original;
        const isOpen = openUpdateId === teacher.id;

        return (
          <div className="flex gap-x-1">
            <Sheet open={isOpen} onOpenChange={(open) => setOpenUpdateId(open ? teacher.id : null)}>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline">Update</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Update Teacher: {teacher.name}</SheetTitle>
                  <SheetDescription>
                    Modify teacher details below and click save.
                  </SheetDescription>
                </SheetHeader>
                {/* Pass teacher data to the form */}
                <TeacherUpsertForm
                  values={teacher} // Pass the full teacher object
                  handleSubmit={(values) => handleUpdateSubmit(teacher.id, values)}
                  // onSuccess will be handled by handleUpdateSubmit to close sheet
                />
              </SheetContent>
            </Sheet>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete <span className="font-bold">{teacher.name}</span>?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently delete this teacher.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(teacher.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];
 
  // Handle pagination button clicks
 const handlePageChange = (newPage) => {
     if (newPage >= 1 && newPage <= pagination.last_page) {
         fetchTeachers(newPage);
     }
 };

  return (
     <>
         <DataTable columns={AdminTeacherColumns} data={data} loading={isLoading} />
         {!isLoading && data.length > 0 && pagination.last_page > 1 && (
             <div className="flex justify-center items-center space-x-2 mt-4">
                 <Button
                     onClick={() => handlePageChange(pagination.current_page - 1)}
                     disabled={pagination.current_page === 1}
                     variant="outline"
                     size="sm"
                 >
                     Previous
                 </Button>
                 <span>
                     Page {pagination.current_page} of {pagination.last_page}
                 </span>
                 <Button
                     onClick={() => handlePageChange(pagination.current_page + 1)}
                     disabled={pagination.current_page === pagination.last_page}
                     variant="outline"
                     size="sm"
                 >
                     Next
                 </Button>
             </div>
         )}
     </>
 );
}