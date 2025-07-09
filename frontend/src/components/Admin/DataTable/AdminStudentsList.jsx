// src/components/admin/DataTable/AdminStudentsList.jsx

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "./DataTable.jsx";
import { DataTableColumnHeader } from "./DataTableColumnHeader.jsx";
// NOTE: The Upsert form is no longer needed here, it's managed by the parent page.

/**
 * A "dumb" presentational component for displaying a list of students.
 * It receives all data and functions as props from its parent.
 *
 * @param {object} props
 * @param {Array} props.students - The array of student data to display.
 * @param {Function} props.onDelete - The function to call when a delete button is clicked.
 * @param {Function} props.onEdit - The function to call when an edit button is clicked.
 * @param {boolean} props.isLoading - To show the loading state in the table.
 */
export default function AdminStudentsList({ students, onDelete, onEdit, isLoading }) {

  // Define columns inside the component so they can access props like onDelete and onEdit
  const AdminStudentColumns = [
    { accessorKey: "id", header: ({ column }) => <DataTableColumnHeader column={column} title="#ID" /> },
    { accessorKey: "name", header: ({ column }) => <DataTableColumnHeader column={column} title="Name" /> },
    { accessorKey: "email", header: ({ column }) => <DataTableColumnHeader column={column} title="Email" /> },
    { accessorKey: "phone", header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" /> },
    {
      accessorKey: "gender",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
      cell: ({ row }) => (row.getValue("gender") === "male" ? "Male" : "Female"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const student = row.original;

        return (
          <div className="flex gap-x-2">
            {/* The onEdit function is passed from the parent */}
            <Button size="sm" variant="outline" onClick={() => onEdit(student)}>
              Edit
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the student "{student.name}". This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {/* The onDelete function is passed from the parent */}
                  <AlertDialogAction onClick={() => onDelete(student.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={AdminStudentColumns} data={students} loading={isLoading} />;
}