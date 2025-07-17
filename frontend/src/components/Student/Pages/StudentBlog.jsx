// src/components/Student/Pages/StudentBlog.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Newspaper } from 'lucide-react';
// --- FIX #1: Correct the import name from BlogPostApi to BlogApi ---
import BlogApi from "../../../Services/Api/Blog";
import BlogPostDetailView from '../views/BlogPostDetailView'; // <-- Import

const StudentBlogLoadingSkeleton = () => {
    // ... (This component is perfect, no changes needed)
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default function StudentBlog() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const userRole = 'student';

    const [selectedPost, setSelectedPost] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);




    const fetchBlogs = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // --- FIX #2: Use the new, clear API call signature ---
            const response = await BlogApi.getAll({ role: userRole });
            setBlogs(response.data?.data || response.data || []); // Handle both paginated and non-paginated responses
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
            setError(err.response?.data?.message || "Failed to load blog posts. Please try again.");
            setBlogs([]);
        } finally {
            setIsLoading(false);
        }
    }, [userRole]); // userRole is a dependency, though it's constant here

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const handleViewBlog = (post) => {
        setSelectedPost(post);
        setIsViewOpen(true);
    };

    // --- The rest of your return/JSX is perfectly fine, no changes needed ---
    return (
        <div className="space-y-6 p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center">
                        <Newspaper className="mr-2 h-6 w-6" />
                        Latest Blog Posts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Read the latest updates and articles from our blog.
                    </p>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {isLoading ? (
                        <StudentBlogLoadingSkeleton />
                    ) : !error && blogs.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No blog posts are currently available.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {blogs.map(blog => (
                                <Card key={blog.id} onClick={() => handleViewBlog(blog)} className="hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{blog.title || "Untitled Post"}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {blog.description || blog.excerpt || "No summary available."}
                                        </p>
                                        {blog.author?.name && (
                                            <p className="text-xs text-gray-500 mt-2">By: {blog.author.name}</p>
                                        )}
                                        {blog.published_at && (
                                            <p className="text-xs text-gray-500 mt-1">Published: {new Date(blog.published_at).toLocaleDateString()}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
            <BlogPostDetailView post={selectedPost} isOpen={isViewOpen} onOpenChange={setIsViewOpen} />
        </div>
    );
}