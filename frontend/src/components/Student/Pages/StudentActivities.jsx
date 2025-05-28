import { useEffect, useState } from "react";
import ActivityApi from "../../../Services/Api/Admin/Activity";

const StudentActivities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const res = await ActivityApi.getAll();
            setActivities(res.data?.data || []);
        };
        fetchActivities();
    }, []);

    return (
        <div>
            <h2>Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>{activity.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentActivities;
