import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { STUDENT_DASHBOARD, STUDENT_LOGIN, TEACHER_DASHBOARD } from "../router";
import { useUserContext } from "../context/StudentContext";
import { UserApi } from "../Services/Api/UserApi";
import DropDownMenuStudent from "./DropDownMenu/DropDownMenuStudent";
import { GaugeIcon } from 'lucide-react';
import { StudentAdministrationSideBar } from "./Administration/StudentAdministrationSideBar";
import { ModeToggle } from "../components/mode-toggle";
import { AdminAdministrationSideBar } from "./Administration/AdminAdministrationSideBar";
import { TeacherAdministrationSideBar } from "./Administration/TeacherAdministrationSideBar";
import DropDownMenuTeacher from "./DropDownMenu/DropDownMenuTeacher";

export default function TeacherDashboardLayout() {
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
                    <Link to={TEACHER_DASHBOARD} className="flex items-center">
                        <img
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                            alt="Logo"
                        />
                        <span className="ml-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
                            YourCompany
                        </span>
                    </Link>
                    <div className="hidden md:flex space-x-6 items-center">
                        <DropDownMenuTeacher />
                        <ModeToggle />
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="hidden md:block md:w-64 border-r bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
                    <div className="h-full p-4 overflow-y-auto">
                        <TeacherAdministrationSideBar/>
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