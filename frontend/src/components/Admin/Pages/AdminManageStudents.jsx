import { useState } from "react";
import { useUserContext } from "../../../context/StudentContext.jsx";
import studentApi from "../../../Services/Api/Admin/StudentApi.js";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area.jsx";
import { Separator } from "../../ui/separator.jsx";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "../../ui/tabs.jsx";
import AdminStudentsList from "../DataTable/AdminStudentsList.jsx";
import StudentUpsertForm from "../Forms/StudentUpsertForm.jsx";

export default function AdminManageStudents() {
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState("items_list"); // ⬅️ state for active tab

  return (
    <div className="relative overflow-x-auto">
      <div className="hidden md:block">
        <div className="bg-background">
          <div className="grid">
            <div className="col-span-3 lg:col-span-4">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="items_list">Students</TabsTrigger>
                      <TabsTrigger value="add_item">Add new student</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="items_list" className="border-none p-0 outline-none">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 w-full">
                        <h2 className="text-2xl font-semibold tracking-tight">All Students</h2>
                        <AdminStudentsList />
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                      <ScrollArea>
                        <div className="flex space-x-4 pb-4"></div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                  </TabsContent>

                  <TabsContent value="add_item">
                    <div className="space-y-1">
                      <StudentUpsertForm
                        handleSubmit={(values) => studentApi.create(values)}
                        onSuccess={() => setActiveTab("items_list")} // ⬅️ Pass callback
                      />
                    </div>
                    <Separator className="my-4" />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}