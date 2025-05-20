// import { useUserContext } from "../../context/StudentContext.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs.js";
import { Separator } from "../../ui/separator.js";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area.js";
import ParentCreateForm from "../Forms/ParentCreateForm.jsx";
import AdminParentList from "../DataTable/AdminParentList.jsx";

// Uncomment when using the components
// import ParentUpsertForm from "../Forms/ParentUpsertForm.jsx";
// import AdminParentList from "../data-table/AdminParentList.jsx";
// import ParentApi from "../../../services/Api/Admin/ParentApi.js";

export default function AdminManageParents() {
//   const { user } = useUserContext();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Manage Parents</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View and add parent accounts in the system.
          </p>
        </div>

        <Tabs defaultValue="parents_list" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="parents_list" className="relative">
                Parents
              </TabsTrigger>
              <TabsTrigger value="add_parent">Add new parent</TabsTrigger>
            </TabsList>
          </div>

          {/* List Tab */}
          <TabsContent value="parents_list" className="p-0 outline-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">All Parents</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">A list of all registered parents.</p>
              </div>
              <Separator className="my-4" />
              <AdminParentList />
              <div className="relative">
                <ScrollArea className="whitespace-nowrap">
                  <div className="flex space-x-4 pb-4">
                    {/* Parent cards/list items here */}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          {/* Add Tab */}
          <TabsContent value="add_parent" className="p-0 outline-none">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Parent</h2>
              <ParentCreateForm />
              <Separator className="my-4" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
