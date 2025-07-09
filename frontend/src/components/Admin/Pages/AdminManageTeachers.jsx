// src/components/admin/Pages/AdminManageTeachers.jsx

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react"; // For toast icon
import TeacherApi from "../../../Services/Api/TeacherApi.js";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";

// Custom Components
import AdminTeachersList from "../DataTable/AdminTeachersList.jsx";
import TeacherUpsertForm from "../Forms/TeachersUpsertForm.jsx"; // Note the renamed form

export default function AdminManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTeacher, setCurrentTeacher] = useState(null); // For editing
  const [activeTab, setActiveTab] = useState("items_list");

  // --- The SINGLE data fetching function ---
  const fetchTeachers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await TeacherApi.all();
      setTeachers(response.data.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to fetch teachers."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data once on component mount
  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  // --- API handlers defined in the parent ---
  const handleTeacherSubmit = async (teacherData) => {
    // This is passed as the `onSubmit` prop to the form.
    // It must return the promise from the API call.
    if (currentTeacher?.id) {
      return await TeacherApi.update(currentTeacher.id, teacherData);
    } else {
      return await TeacherApi.create(teacherData);
    }
  };

  const handleDelete = async (teacherId) => {
    const toastId = toast.loading("Deleting teacher...");
    try {
      await TeacherApi.delete(teacherId);
      toast.success("Teacher deleted successfully!", { id: toastId, icon: <Trash2Icon /> });
      // FIX: Refresh the list from the single source of truth after deletion
      fetchTeachers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while deleting teacher.", { id: toastId });
    }
  };

  // --- UI handlers defined in the parent ---
  const handleSuccess = () => {
    // This is passed as the `onSuccess` prop to the form.
    setCurrentTeacher(null); // Clear editing state
    setActiveTab("items_list"); // Switch back to the list view
    fetchTeachers();           // Refresh the list to show changes
  };

  const handleOpenEditTab = (teacher) => {
    setCurrentTeacher(teacher);
    // src/components/admin/Forms/TeachersUpsertForm.jsx
    setActiveTab('add_item');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // When switching to the 'Add' tab manually, clear any existing data
    if (tab === 'add_item') {
      setCurrentTeacher(null);
    }
  };

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full space-y-6">
        <TabsList>
          <TabsTrigger value="items_list">All Teachers</TabsTrigger>
          <TabsTrigger value="add_item">Add New Teacher</TabsTrigger>
        </TabsList>

        <TabsContent value="items_list" className="border-none p-0 outline-none">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Teacher Roster</h2>
          {/* Pass data and handlers down as props to the "dumb" list component */}
          <AdminTeachersList
            teachers={teachers}
            isLoading={isLoading}
            onEdit={handleOpenEditTab}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="add_item" className="border-none p-0 outline-none">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            {currentTeacher ? `Edit Teacher: ${currentTeacher.name}` : 'Create New Teacher'}
          </h2>
          {/* The form is part of a tab, rendering based on activeTab */}
          {/* Add a key to ensure the form fully resets when switching between create/edit */}
          <TeacherUpsertForm
            key={currentTeacher ? currentTeacher.id : 'create'}
            initialData={currentTeacher}
            onSubmit={handleTeacherSubmit}
            onSuccess={handleSuccess}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}