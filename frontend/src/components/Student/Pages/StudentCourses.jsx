import { useEffect, useState } from "react";
import CoursesApi from "../../../Services/Api/Admin/Courses";

const StudentCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await CoursesApi.getAll();
            setCourses(res.data?.data || []);
        };
        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentCourses;
