import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ModeToggle } from "../components/mode-toggle";
import { Notification } from "../components/Notification/Notification";
import { useUserContext } from "../context/StudentContext";
import { STUDENT_DASHBOARD, USER_LOGIN } from "../router";
import { UserApi } from "../Services/Api/UserApi";
import DropDownMenuStudent from "./DropDownMenu/DropDownMenuStudent";
import { StudentAdministrationSideBar } from "./Administration/StudentAdministrationSideBar";

export default function StudentDashboardLayout() {
    const { logout, setUser, authenticated, user } = useUserContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [notificationCount, setNotificationCount] = useState(5);

    useEffect(() => {
        // This flag prevents state updates if the component unmounts during an async operation.
        let isMounted = true;

        const loadUser = async () => {
            // If user data already exists in context, no need to fetch again.
            if (user) {
                setIsLoading(false);
                return;
            }

            try {
                const { data } = await UserApi.getUser();
                if (isMounted) {
                    setUser(data);
                }
            } catch (error) {
                // If the token is expired or invalid, the API call will fail. Log the user out.
                if (isMounted) {
                    logout();
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (authenticated) {
            loadUser();
        } else {
            // If not authenticated, redirect to the login page immediately.
            navigate(USER_LOGIN);
        }

        // Cleanup function to run when the component unmounts.
        return () => {
            isMounted = false;
        };
    }, [authenticated, user, navigate, setUser, logout]);

    // Display a loading indicator while fetching user data.
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white shadow-md dark:bg-gray-800 dark:border-b dark:border-gray-700">
                <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to={STUDENT_DASHBOARD} className="flex items-center">
                        <img
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                            alt="Logo"
                        />
                        <span className="ml-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
                            YourCompany
                        </span>
                    </Link>
                    <div className="flex space-x-4 md:space-x-6 items-center">
                        <Notification count={notificationCount} onClick={() => alert('Notifications clicked!')} />
                        <DropDownMenuStudent />
                        <ModeToggle />
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 overflow-hidden">
                <aside className="hidden md:block md:w-64 border-r bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
                    <div className="h-full p-4 overflow-y-auto">
                        <StudentAdministrationSideBar />
                    </div>
                </aside>
                <section className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}