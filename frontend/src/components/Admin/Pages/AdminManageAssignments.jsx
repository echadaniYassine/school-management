// src/components/admin/assignments/AdminViewAssignments.jsx
import React, { useState, useEffect } from 'react'; // Added useEffect for potential data fetching
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // For potential filtering
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // For filtering

import AssignmentsList from '../Assignments/AssignmentsList'; // Assuming it's in the same folder

const initialAssignmentsData = [
    {
        id: 1,
        title: "Calculus Homework 1",
        course: "Mathematics 101",
        dueDate: "2024-07-15",
        status: "Published",
        assignedTo: "All Grade 10 Students",
        submissionsReceived: 25,
        totalStudents: 30
    },
    {
        id: 2,
        title: "History Essay: The Roman Empire",
        course: "World History",
        dueDate: "2024-07-20",
        status: "Published",
        assignedTo: "Section A - Grade 11",
        submissionsReceived: 18,
        totalStudents: 22
    },
    {
        id: 3,
        title: "Physics Lab Report Draft",
        course: "Physics 201",
        dueDate: "2024-07-22",
        status: "Draft",
        assignedTo: "All Physics Students",
        // Submissions data might not be relevant for drafts
    },
    {
        id: 4,
        title: "Literary Analysis: Shakespeare",
        course: "English Literature",
        dueDate: "2024-08-01",
        status: "Published",
        assignedTo: "Grade 12 AP English",
        submissionsReceived: 15,
        totalStudents: 15
    }
];

// You would typically fetch this data from an API
// For now, we'll use mock data and add filtering
const COURSES = ["All Courses", "Mathematics 101", "World History", "Physics 201", "English Literature"];
const STATUSES = ["All Statuses", "Published", "Draft", "Archived"];


export default function AdminManageAssignments() {
    const [allAssignments, setAllAssignments] = useState(initialAssignmentsData); // Store original data
    const [filteredAssignments, setFilteredAssignments] = useState(initialAssignmentsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [selectedStatus, setSelectedStatus] = useState(STATUSES[0]);

    // Simulate fetching data or update when filters change
    useEffect(() => {
        let currentAssignments = [...allAssignments];

        if (searchTerm) {
            currentAssignments = currentAssignments.filter(assignment =>
                assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (assignment.course && assignment.course.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedCourse !== COURSES[0]) {
            currentAssignments = currentAssignments.filter(assignment => assignment.course === selectedCourse);
        }

        if (selectedStatus !== STATUSES[0]) {
            currentAssignments = currentAssignments.filter(assignment => assignment.status === selectedStatus);
        }

        setFilteredAssignments(currentAssignments);
    }, [searchTerm, selectedCourse, selectedStatus, allAssignments]);


    const handleViewSubmissions = (assignmentId) => {
        // This is where you would implement logic to view submissions for an assignment
        // For example, navigate to a new page: router.push(`/admin/assignments/${assignmentId}/submissions`)
        // Or open a modal with submission details.
        console.log("View submissions for assignment ID:", assignmentId);
        alert(`Implement view submissions for assignment ID: ${assignmentId}`);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">View Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Overview of assignments in the system and their status.
                    </p>

                    {/* Filters Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Input
                            placeholder="Search by title or course..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="md:col-span-1"
                        />
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by course" />
                            </SelectTrigger>
                            <SelectContent>
                                {COURSES.map(course => (
                                    <SelectItem key={course} value={course}>{course}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUSES.map(status => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <AssignmentsList
                        assignments={filteredAssignments}
                        onViewSubmissions={handleViewSubmissions}
                    />
                </CardContent>
            </Card>
        </div>
    );
}