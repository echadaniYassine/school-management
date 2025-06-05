import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUserContext } from "../context/StudentContext";
import { STUDENT_DASHBOARD } from "../router";

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
