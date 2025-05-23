// src/components/admin/Pages/AdminManageTeachers.jsx
// Removed useUserContext as it wasn't used directly here
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "../../ui/tabs.jsx";
import { Separator } from "../../ui/separator.jsx";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area.jsx"; // Keep if needed for other content
import { useState } from "react";
import AdminTeachersList from "../DataTable/AdminTeachersList.jsx"; // Corrected import
import TeacherUpsertForm from "../Forms/TeachersUpsertForm.jsx";     // Corrected import
import TeacherApi from "../../../Services/Api/Admin/TeacherApi.js"; // Corrected import

export default function AdminManageTeachers() {
  const [activeTab, setActiveTab] = useState("items_list");

  const handleTeacherCreated = (newTeacher) => {
     // Optionally, you could update the list here, but AdminTeachersList refetches.
     // This callback is mainly to switch the tab.
     setActiveTab("items_list");
  };

  return (
    <div className="relative"> {/* Removed overflow-x-auto, DataTable handles its own scrolling */}
      {/* Removed outer hidden md:block and extra divs for simplicity, can be added back if specific layout needs it */}
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full space-y-6">
          <div className="flex items-center justify-between"> {/* Ensure TabsList is part of a flex container if needed for alignment */}
            <TabsList>
              <TabsTrigger value="items_list">Teachers List</TabsTrigger>
              <TabsTrigger value="add_item">Add New Teacher</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="items_list" className="border-none p-0 outline-none mt-0!"> {/* Remove default margin-top of TabsContent */}
            <div className="space-y-1 w-full">
              <div className="flex items-center justify-between mb-4"> {/* Added margin-bottom */}
                 <h2 className="text-2xl font-semibold tracking-tight">All Teachers</h2>
                 {/* You could add a total count here if pagination provides it */}
              </div>
              <AdminTeachersList />
            </div>
            {/* Separator and ScrollArea below might not be needed if DataTable handles scrolling */}
            {/* <Separator className="my-4" /> */}
            {/* <div className="relative">...</div> */}
          </TabsContent>

          <TabsContent value="add_item" className="mt-0!">
             <div className="max-w-2xl mx-auto"> {/* Center the form */}
                 <h2 className="text-2xl font-semibold tracking-tight mb-4">Create New Teacher</h2>
                 <TeacherUpsertForm
                     handleSubmit={(values) => TeacherApi.create(values)}
                     onSuccess={handleTeacherCreated} // Switch tab on success
                 />
             </div>
            {/* <Separator className="my-4" /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}