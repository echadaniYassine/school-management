import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import StudentApi from "../../../Services/Api/Admin/StudentApi.js";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "../../ui/alert-dialog.js";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader,
  SheetTitle, SheetTrigger
} from "../../ui/sheet.js";
import StudentUpsertForm from "../Forms/StudentUpsertForm.jsx";
import { DataTable } from "./DataTable.jsx";
import { DataTableColumnHeader } from "./DataTableColumnHeader.jsx";

export default function AdminStudentsList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // <-- Added

  useEffect(() => {
    StudentApi.all()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(() => setIsLoading(false)); // <-- Turn off loading
  }, []);

  const [openUpdateId, setOpenUpdateId] = useState(null); // Track which sheet is open

  const handleUpdateSubmit = (id, values) => {
    const promise = StudentApi.update(id, values);
    promise.then((response) => {
      const { student } = response.data;
      const updated = data.map((item) => (item.id === id ? student : item));
      setData(updated);
      setOpenUpdateId(null);
    });
    return promise;
  };

  const handleDelete = async (id) => {
    const deletingLoader = toast.loading("Deleting in progress.");
    const { data: deletedStudent, status } = await StudentApi.delete(id);
    toast.dismiss(deletingLoader);
    if (status === 200) {
      setData(data.filter((student) => student.id !== id));
      toast.success("Student deleted", {
        description: `Successfully deleted ${deletedStudent.data.name}`,
        icon: <Trash2Icon />,
      });
    }
  };

  const AdminStudentColumns = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="#ID" />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "date_of_birth",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date of Birth" />
      ),
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
      cell: ({ row }) => {
        const value = row.getValue("gender");
        return value === "male" ? "Male" : "Female";
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "updated_at", // This should match the actual key in your data
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ row }) => {
        const rawDate = row.getValue("updated_at");
        const date = new Date(rawDate);
        const formattedDate = date.toLocaleString(); // Customize as needed
        return <div className="text-right font-medium">{formattedDate}</div>;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const { id, name } = row.original;
        const isOpen = openUpdateId === id;

        return (

          <div className="flex gap-x-1">
            <Sheet open={isOpen} onOpenChange={(open) => setOpenUpdateId(open ? id : null)}>
              <SheetTrigger asChild>
                <Button size="sm">Update</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Update Student: {name}</SheetTitle>
                  <SheetDescription>
                    Modify Student details below and click save.
                    <StudentUpsertForm
                      values={row.original}
                      handleSubmit={(values) => handleUpdateSubmit(id, values)}
                    />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete <span className="font-bold">{name}</span>?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently delete this student.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(id, name)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    StudentApi.all().then(({ data }) => setData(data.data));
  }, []);

  return <DataTable columns={AdminStudentColumns} data={data} loading={isLoading} />;
}
