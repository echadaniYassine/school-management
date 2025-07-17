// src/components/admin/blogs/BlogPostItem.jsx

import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Edit2, Eye, Tag, Trash2, User } from 'lucide-react';

const getStatusBadgeClass = (status) => {
    const statusStyles = {
        published: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
        draft: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
        archived: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    };
    return statusStyles[status] || statusStyles.draft;
};

// Add `onView` to the props being destructured
export default function BlogPostItem({ post, onEdit, onDelete, onView }) {
    const formattedDate = post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : 'N/A';

    return (
        <Card className="hover:shadow-lg transition-shadow flex flex-col bg-card">
            {post.featuredImage && (
                <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
            )}
            <CardHeader className={!post.featuredImage ? "pt-6" : "pt-4"}>
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-xl mb-1 leading-tight">{post.title}</CardTitle>
                    {post.status && (
                        <Badge className={getStatusBadgeClass(post.status)}>
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                    )}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> 
                        {/* --- THIS IS THE FIX --- */}
                        {/* We access post.author.name, not the whole object. */}
                        {/* The '?' (optional chaining) prevents errors if author is missing. */}
                        {post.author?.name || 'Unknown Author'}
                    </span>
                    <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> Last updated: {formattedDate}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {/* A safer way to strip HTML for a preview */}
                    {post.content ? `${post.content.replace(/<[^>]+>/g, '').substring(0, 150)}...` : 'No content preview.'}
                </p>
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />{tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-4 border-t">
                {/* Ensure onView is passed to the button's onClick */}
                {onView && (
                    <Button variant="ghost" size="sm" onClick={() => onView(post)}><Eye className="h-4 w-4" /></Button>
                )}
                <Button variant="outline" size="sm" onClick={() => onEdit(post)}><Edit2 className="h-4 w-4" /></Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive-outline" size="sm"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the blog post "{post.title}".
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