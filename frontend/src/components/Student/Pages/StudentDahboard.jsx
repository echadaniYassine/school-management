// src/components/student/Pages/StudentDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext'; // Adjust path if needed

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Icons
import {
  BookOpen,
  CalendarClock,
  ClipboardList,
  MessageSquare,
  GraduationCap,
  Bolt,
} from 'lucide-react';

// --- MOCK DATA ---
// In a real application, you would fetch this data from your API.
const mockDashboardData = {
  upcomingAssignments: [
    { id: 1, title: 'History Essay: The Roman Empire', course: 'History 101', dueDate: 'Tomorrow' },
    { id: 2, title: 'Algebra Problem Set 5', course: 'Mathematics', dueDate: 'In 3 days' },
    { id: 3, title: 'Biology Lab Report', course: 'Science', dueDate: 'In 5 days' },
  ],
  todaysClasses: [
    { id: 1, time: '09:00 AM', subject: 'Mathematics', teacher: 'Mr. Davison' },
    { id: 2, time: '10:30 AM', subject: 'History 101', teacher: 'Mrs. Gable' },
    { id: 3, time: '01:00 PM', subject: 'Physical Education', teacher: 'Coach Mills' },
  ],
  recentGrades: [
    { id: 1, assignment: 'Quiz 2', course: 'Science', grade: 'A-' },
    { id: 2, assignment: 'Mid-term Paper', course: 'Literature', grade: 'B+' },
  ],
  quickActions: [
    { id: 1, label: 'View All Courses', icon: BookOpen, link: '/student/courses' },
    { id: 2, label: 'Go to Chat', icon: MessageSquare, link: '/student/chat' },
    { id: 3, label: 'View All Assignments', icon: ClipboardList, link: '/student/assignments' },
  ],
};

export default function StudentDashboard() {
  const { user } = useUserContext();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here’s a summary of your academic life today.</p>
      </div>

      <Separator />

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (Assignments & Grades) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Assignments Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5" />Upcoming Assignments</CardTitle>
              <Link to="/student/assignments" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDashboardData.upcomingAssignments.length > 0 ? (
                  mockDashboardData.upcomingAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                      <div>
                        <p className="font-semibold">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      </div>
                      <p className="text-sm font-medium">{assignment.dueDate}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No upcoming assignments. Great job!</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Grades Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5" />Recent Grades</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                {mockDashboardData.recentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-2 rounded-md">
                     <div>
                        <p className="font-semibold">{grade.assignment}</p>
                        <p className="text-sm text-muted-foreground">{grade.course}</p>
                      </div>
                      <p className="text-lg font-bold text-primary">{grade.grade}</p>
                  </div>
                ))}
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Schedule & Quick Actions) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Today's Schedule Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarClock className="h-5 w-5" />Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDashboardData.todaysClasses.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <p className="font-mono text-sm text-muted-foreground">{item.time}</p>
                    <div>
                      <p className="font-semibold">{item.subject}</p>
                      <p className="text-xs text-muted-foreground">{item.teacher}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2"><Bolt className="h-5 w-5" />Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
                {mockDashboardData.quickActions.map((action) => (
                    <Button asChild key={action.id} variant="outline" className="justify-start">
                        <Link to={action.link}>
                            <action.icon className="mr-2 h-4 w-4"/>
                            {action.label}
                        </Link>
                    </Button>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}