import { Bell } from 'lucide-react';
import React from 'react';

// Define the props for our component
interface NotificationProps {
  /** The number of notifications to display. The badge will be hidden if 0. */
  count?: number;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * A notification bell icon component with a badge for the count.
 */
export const Notification: React.FC<NotificationProps> = ({ count = 0, onClick }) => {
  return (
    // Use a button for accessibility and click handling
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
      aria-label={`Notifications. ${count} unread.`}
    >
      <Bell className="h-6 w-6" />
      {/* Conditionally render the badge if there's a count */}
      {count > 0 && (
        <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {/* Display '9+' if count is over 9, otherwise the count */}
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
};