// src/components/admin/blogs/BlogPostItem.jsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Added CardFooter, CardHeader, CardTitle for more structure
import { CalendarDays, Edit2, Eye, Tag, Trash2, User } from 'lucide-react';

const getStatusBadgeClass = (status) => {
    const statusStyles = {
        published: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
        draft: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
        archived: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100"
    };
    return statusStyles[status] || statusStyles.draft;
};

export default function BlogPostItem({ post, onEdit, onDelete, onView }) {
    const formattedDate = post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A');

    return (
        <Card className="hover:shadow-lg transition-shadow flex flex-col">
            {post.featuredImage && (
                <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
            )}
            <CardHeader className={!post.featuredImage ? "pt-6" : "pt-4"}> {/* Adjust padding if no image */}
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl mb-1 leading-tight">{post.title}</CardTitle>
                    <Badge className={getStatusBadgeClass(post.status)}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </Badge>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-4">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author || 'Unknown'}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {formattedDate}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                {/* Display a snippet of content. You might want to process HTML/Markdown here for display */}
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.content ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'No content preview.'}
                </p>
                {post.category && (
                    <div className="mt-2">
                        <Badge variant="secondary" className="text-xs">Category: {post.category}</Badge>
                    </div>
                )}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map(tag => ( // Show max 3 tags
                            <Badge key={tag} variant="outline" className="text-xs flex items-center gap-1">
                                <Tag className="h-3 w-3" />{tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-4 border-t">
                {onView && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(post)}
                        className="flex items-center gap-1"
                    >
                        <Eye className="h-4 w-4" />
                        View
                    </Button>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(post)}
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
                                This action cannot be undone. This will permanently delete the blog post
                                "{post.title}".
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDelete(post.id)} className="bg-red-600 hover:bg-red-700">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}