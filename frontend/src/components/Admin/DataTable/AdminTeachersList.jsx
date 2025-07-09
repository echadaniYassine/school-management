// src/components/admin/DataTable/AdminTeachersList.jsx

import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog.js";
import { DataTable } from "./DataTable.jsx";
import { DataTableColumnHeader } from "./DataTableColumnHeader.jsx";

/**
 * A presentational component for displaying a list of teachers.
 * Receives all data and handler functions as props from its parent.
 *
 * @param {object} props
 * @param {Array} props.teachers - The array of teacher data.
 * @param {boolean} props.isLoading - The loading state for the table.
 * @param {Function} props.onDelete - The function to call when a delete button is clicked.
 * @param {Function} props.onEdit - The function to call when an edit button is clicked.
 */
export default function AdminTeachersList({ teachers, isLoading, onDelete, onEdit }) {

  // Define columns inside the component to access props like onEdit and onDelete.
  const AdminTeacherColumns = [
    { accessorKey: "id", header: ({ column }) => <DataTableColumnHeader column={column} title="#ID" /> },
    { accessorKey: "name", header: ({ column }) => <DataTableColumnHeader column={column} title="Name" /> },
    { accessorKey: "email", header: ({ column }) => <DataTableColumnHeader column={column} title="Email" /> },
    { accessorKey: "phone", header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" /> },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const teacher = row.original;
        return (
          <div className="flex gap-x-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(teacher)}>
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
                    This will permanently delete the teacher "{teacher.name}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(teacher.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={AdminTeacherColumns} data={teachers} loading={isLoading} />;
}