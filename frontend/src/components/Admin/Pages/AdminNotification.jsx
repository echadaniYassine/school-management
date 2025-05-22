import { useState } from "react";
import { X } from "lucide-react"; // For the close icon

export default function AdminNotification() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 space-y-4 relative">
        
        <button
          onClick={() => setVisible(false)}
          aria-label="Close notification"
          className="absolute top-3 right-3 rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
            {/* Notification icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 19a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Notification Title
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              This is an important notification message to the user.
            </p>
          </div>
        </div>
        
        <div className="pt-2">
          <button
            onClick={() => setVisible(false)}
            className="inline-flex justify-center rounded-md border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
