// src/components/admin/pages/AdminManageStudents.jsx

import { Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import StudentApi from "../../../Services/Api/StudentApi.js";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Custom Components
import AdminStudentsList from "../DataTable/AdminStudentsList.jsx";
import StudentUpsertForm from "../Forms/StudentUpsertForm.jsx";

export default function AdminManageStudents() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("items_list");

  // --- The SINGLE data fetching function for this feature ---
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await StudentApi.all();
      setStudents(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch students.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data only once when the component mounts
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // --- API handlers are defined here, in the parent ---
  const handleStudentSubmit = async (studentData) => {
    if (currentStudent?.id) {
      return await StudentApi.update(currentStudent.id, studentData);
    } else {
      return await StudentApi.create(studentData);
    }
  };

  const handleDelete = async (studentId) => {
    const toastId = toast.loading("Deleting student...");
    try {
      await StudentApi.delete(studentId);
      toast.success("Student deleted successfully!", { id: toastId, icon: <Trash2Icon /> });
      // FIX: Refresh the list from the single source of truth
      fetchStudents();
    } catch (error) {
      toast.error("Error while deleting student.", { id: toastId });
    }
  };

  // --- Modal handlers are defined here ---
  const handleSuccess = () => {
    setIsModalOpen(false);
    setCurrentStudent(null);
    fetchStudents();
    setActiveTab("items_list");
  };

  const handleOpenEditModal = (student) => {
    setCurrentStudent(student);
    setActiveTab('add_item'); // Switch to the form tab for editing
  };
  
  const handleTabChange = (tab) => {
      setActiveTab(tab);
      if (tab === 'add_item') {
          setCurrentStudent(null); // Clear data for "create" mode
      }
  }

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full space-y-6">
        <TabsList>
          <TabsTrigger value="items_list">All Students</TabsTrigger>
          <TabsTrigger value="add_item">Add New Student</TabsTrigger>
        </TabsList>

        <TabsContent value="items_list" className="border-none p-0 outline-none">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Student Roster</h2>
          {/* Pass data and handlers down as props */}
          <AdminStudentsList
            students={students}
            isLoading={isLoading}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
          />
        </TabsContent>
        
        <TabsContent value="add_item" className="border-none p-0 outline-none">
           <h2 className="text-2xl font-semibold tracking-tight mb-4">
             {currentStudent ? `Edit Student: ${currentStudent.name}` : 'Create New Student'}
           </h2>
           {/* The form is now part of a tab, no modal needed unless preferred */}
           <StudentUpsertForm
              key={currentStudent ? currentStudent.id : 'create'}
              initialData={currentStudent}
              onSubmit={handleStudentSubmit}
              onSuccess={handleSuccess}
            />
        </TabsContent>
      </Tabs>
    </div>
  );
}