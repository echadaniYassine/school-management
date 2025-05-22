import { useUserContext } from "../../../context/StudentContext.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs.jsx";
import { Separator } from "../../ui/separator.jsx";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area.jsx";

import ParentUpsertForm from "../Forms/ParentUpsertForm.jsx";
import AdminParentList from "../DataTable/AdminParentList.jsx";
import ParentApi from "../../../Services/Api/Admin/ParentApi.js";

export default function ManageParents() {
  const { user } = useUserContext();
  return (
    <>
    <div className="relative overflow-x-auto">
      <div className="hidden md:block">
        <div className="bg-background">
          <div className="grid">
            <div className="col-span-3 lg:col-span-4">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="parents_list" className="h-full space-y-6">
                  {/* Tabs Header */}
                  <div className="flex items-center justify-between">
                    <TabsList>
                      <TabsTrigger value="parents_list">Parents</TabsTrigger>
                      <TabsTrigger value="add_parent">Add new parent</TabsTrigger>
                    </TabsList>
                  </div>

                  {/* List Tab */}
                  <TabsContent value="parents_list" className="p-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold tracking-tight">All parents</h2>
                      </div>
                      <AdminParentList />
                      <Separator />
                    </div>

                    {/* Optional scroll area if you plan to add filter/tags */}
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">{/* Future elements */}</div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </TabsContent>

                  {/* Add Parent Tab */}
                  <TabsContent value="add_parent" className="p-0">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold tracking-tight">Add a new parent</h2>
                      <ParentUpsertForm handleSubmit={(values) => ParentApi.create(values)} />
                      <Separator />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
