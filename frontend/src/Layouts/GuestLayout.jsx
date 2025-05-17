import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { STUDENT_DASHBOARD } from "../router";
import { useUserContext } from "../context/StudentContext";

export default function GuestLayout() {
    const navigate = useNavigate();
    const { authenticated } = useUserContext();

    useEffect(() => {
        if (authenticated) {
            navigate(STUDENT_DASHBOARD);
        }
    }, []);

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
