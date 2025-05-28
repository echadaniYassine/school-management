import { useEffect, useState } from "react";
import AssignmentApi from "../../../Services/Api/Admin/Assignment";

const StudentAssignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            const res = await AssignmentApi.getAll();
            setAssignments(res.data?.data || []);
        };
        fetchAssignments();
    }, []);

    return (
        <div>
            <h2>Assignments</h2>
            <ul>
                {assignments.map((assignment) => (
                    <li key={assignment.id}>{assignment.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentAssignments;
