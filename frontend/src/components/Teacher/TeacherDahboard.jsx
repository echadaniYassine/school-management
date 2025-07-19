// src/components/Teacher/TeacherDahboard.jsx

import { useUserContext } from "../../context/UserContext";

export default function TeacherDahboard() {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {user && (
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">User Information</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">ID</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{user.id}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{user.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{user.created_at}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}