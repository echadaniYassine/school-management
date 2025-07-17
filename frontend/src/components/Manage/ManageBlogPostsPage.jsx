// src/components/shared/ManageBlogPostsPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Search, AlertCircle } from 'lucide-react';

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card"; // No need for Content/Footer here
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Custom Components
import BlogPostApi from '../../Services/Api/Blog';
import BlogPostsList from '../Admin/Blogs/BlogPostsList';
import UpsertBlogPostForm from '../Admin/Forms/UpsertBlogPostForm';
import BlogPostDetailView from '../Admin/Blogs/BlogPostDetailView'; // Import the detail view

// Co-located Skeleton Component
const BlogPostsLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
            <Card key={i} className="flex flex-col">
                <Skeleton className="w-full h-48 rounded-t-lg" />
                <CardHeader className="pt-4">
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
            </Card>
        ))}
    </div>
);


/**
 * A reusable component to manage blog posts for different user roles.
 * This is a PURE JAVASCRIPT component. There are no TypeScript annotations.
 * @param {{ userRole: 'admin' | 'teacher' }} props
 */
export default function ManageBlogPostsPage({ userRole }) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1, total: 0, perPage: 9 });
    const [searchTerm, setSearchTerm] = useState('');
    
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false); // For Create/Edit form
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);   // For viewing details
    const [currentPost, setCurrentPost] = useState(null);            // For both modals

    const fetchBlogPosts = useCallback(async (page = 1, query = '') => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await BlogPostApi.getAll({
                role: userRole,
                params: { page, search: query, per_page: pagination.perPage }
            });
            setPosts(response.data.data || []);
            if (response.data.meta) setPagination(prev => ({ ...prev, ...response.data.meta }));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load blog posts.");
        } finally {
            setIsLoading(false);
        }
    }, [userRole, pagination.perPage]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchBlogPosts(1, searchTerm);
        }, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm, fetchBlogPosts]);

    const handleSavePost = async (formData) => {
        setIsSending(true);
        try {
            const action = currentPost?.id
                ? BlogPostApi.update({ role: userRole, id: currentPost.id, formData })
                : BlogPostApi.create({ role: userRole, formData });
            
            await action;
            toast.success(`Blog post ${currentPost?.id ? 'updated' : 'created'} successfully!`);
            
            setIsUpsertModalOpen(false);
            fetchBlogPosts(currentPost ? pagination.currentPage : 1, searchTerm);
        } catch (error) {
            const errorMessages = error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join('\n') : "Failed to save post.";
            toast.error(errorMessages, { duration: 5000 });
        } finally {
            setIsSending(false);
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await BlogPostApi.delete({ role: userRole, id: postId });
            toast.success("Post deleted successfully.");
            const newPage = posts.length === 1 && pagination.currentPage > 1 ? pagination.currentPage - 1 : pagination.currentPage;
            fetchBlogPosts(newPage, searchTerm);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete post.");
        }
    };

    const handleOpenCreateModal = () => {
        setCurrentPost(null);
        setIsUpsertModalOpen(true);
    };

    const handleOpenEditModal = (post) => {
        setCurrentPost(post);
        setIsUpsertModalOpen(true);
    };
    
    const handleViewPost = (post) => {
        setCurrentPost(post);
        setIsViewModalOpen(true);
    };
    
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.lastPage) {
            fetchBlogPosts(newPage, searchTerm);
        }
    };

    const pageTitle = userRole === 'admin' ? 'Manage All Blog Posts' : 'My Blog Posts';

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">{pageTitle}</h1>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8"/>
                    </div>
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4" />
                        New Post
                    </Button>
                </div>
            </div>

            {isLoading ? <BlogPostsLoadingSkeleton />
             : error ? <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
             : posts.length === 0 ? <div className="text-center py-12 border-2 border-dashed rounded-lg"><p className="text-xl text-muted-foreground">{searchTerm ? 'No posts match your search.' : 'No blog posts yet.'}</p></div>
             : (
                <>
                    <BlogPostsList
                        posts={posts}
                        onEditPost={handleOpenEditModal}
                        onDeletePost={handleDeletePost}
                        onViewPost={handleViewPost}
                    />
                    {pagination.lastPage > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <Button onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={pagination.currentPage === 1} variant="outline">Previous</Button>
                            <span>Page {pagination.currentPage} of {pagination.lastPage}</span>
                            <Button onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage} variant="outline">Next</Button>
                        </div>
                    )}
                </>
             )}

            {isUpsertModalOpen && (
                <UpsertBlogPostForm
                    isOpen={isUpsertModalOpen}
                    onOpenChange={setIsUpsertModalOpen}
                    onSubmit={handleSavePost}
                    initialData={currentPost}
                    isSending={isSending}
                />
            )}
            
            {isViewModalOpen && (
                 <BlogPostDetailView
                    post={currentPost}
                    isOpen={isViewModalOpen}
                    onOpenChange={setIsViewModalOpen}
                />
            )}
        </div>
    );
}