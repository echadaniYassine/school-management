// src/components/admin/courses/CourseItem.jsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Clock, DollarSign, Edit2, Settings2, Trash2 } from 'lucide-react'; // Users icon removed if not used for instructor directly here

const getStatusBadgeClass = (status) => {
    const statusStyles = {
        published: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
        draft: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
        archived: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100"
    };
    return statusStyles[status] || statusStyles.draft; // Default to draft style if status is unknown
};

export default function CourseItem({ course, onEdit, onDelete, onManageContent }) {
    return (
        <Card className="hover:shadow-lg transition-shadow flex flex-col">
            {course.thumbnailUrl && (
                 <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img src={course.thumbnailUrl} alt={course.title || 'Course thumbnail'} className="w-full h-full object-cover" />
                </div>
            )}
            <CardHeader className={!course.thumbnailUrl ? "pt-6" : "pt-4"}>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg mb-1 leading-tight">{course.title} {course.code && `(${course.code})`}</CardTitle>
                    {course.status && (
                        <Badge className={getStatusBadgeClass(course.status)}>
                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </Badge>
                    )}
                </div>
                {course.instructor && <p className="text-xs text-muted-foreground">By {course.instructor}</p>}
            </CardHeader>
            <CardContent className="flex-grow text-sm">
                <p className="text-muted-foreground line-clamp-3 mb-3">{course.description || "No description available."}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {course.category?.name && <span className="font-medium">Category: {course.category.name}</span>}
                    {course.level && <span className="flex items-center gap-1"><BarChart className="h-3 w-3" /> {course.level}</span>}
                    {course.duration && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>}
                    {typeof course.price === 'number' && (
                        <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {course.price === 0 ? 'Free' : `$${course.price.toFixed(2)}`}
                        </span>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 p-4 border-t">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onManageContent(course)}
                    className="flex items-center gap-1 w-full sm:w-auto"
                >
                    <Settings2 className="h-4 w-4" />
                    Manage Content
                </Button>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(course)}
                        className="flex items-center gap-1"
                    >
                        <Edit2 className="h-4 w-4" />
                        Edit
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the course
                                    "{course.title}". All associated lessons and student data for this course might also be affected.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete(course.id)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardFooter>
        </Card>
    );
}