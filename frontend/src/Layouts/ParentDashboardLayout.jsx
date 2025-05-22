import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ModeToggle } from "../components/mode-toggle";
import { useUserContext } from "../context/StudentContext";
import { PARENT_DASHBOARD, STUDENT_LOGIN } from "../router";
import { UserApi } from "../Services/Api/UserApi";
import { ParentAdministrationSideBar } from "./Administration/ParentAdministrationSideBar";
import DropDownMenuParent from "./DropDownMenu/DropDownMenuParent";

export default function ParentDashboardLayout() {
    const { logout, setUser, setAuthenticated, authenticated } = useUserContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        if (authenticated === true) {
            setIsLoading(false)
            UserApi.getUser().then(({ data }) => {
                setUser(data)
                setAuthenticated(true)
            }).catch(() => {
                logout()
            })
        } else {
            navigate(STUDENT_LOGIN)
        }

    }, [authenticated]);

    if (isLoading) {
        return <></>
    }


    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
                <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to={PARENT_DASHBOARD} className="flex items-center">
                        <img
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                            alt="Logo"
                        />
                        <span className="ml-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
                            School-management
                        </span>
                    </Link>
                    <div className="hidden md:flex space-x-6 items-center">
                        <DropDownMenuParent />
                        <ModeToggle />
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="hidden md:block md:w-64 border-r bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
                    <div className="h-full p-4 overflow-y-auto">
                        <ParentAdministrationSideBar />
                    </div>
                </aside>

                {/* Outlet */}
                <section className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}