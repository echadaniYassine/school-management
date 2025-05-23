// src/components/admin/courses/CoursesList.jsx
import React from 'react';
import CourseItem from './CourseItem';

export default function CoursesList({ courses, onEditCourse, onDeleteCourse, onManageCourseContent }) {
    if (!courses || courses.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No courses found.</p>
                <p className="text-sm text-muted-foreground">Get started by adding your first course!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
                <CourseItem
                    key={course.id}
                    course={course}
                    onEdit={onEditCourse}
                    onDelete={onDeleteCourse}
                    onManageContent={onManageCourseContent}
                />
            ))}
        </div>
    );
}