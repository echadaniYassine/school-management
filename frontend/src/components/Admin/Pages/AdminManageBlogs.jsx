// src/components/admin/blogs/AdminManageBlogs.jsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import BlogPostApi from '../../../Services/Api/Admin/Blog'; // Create this API service
import BlogPostsList from '../Blogs/BlogPostsList'; // Corrected path based on assumption
import UpsertBlogPostForm from '../Forms/UpsertBlogPostForm'; // Ensure this form is set up for file uploads

// Skeleton for loading blog posts
const BlogPostsLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
            <Card key={i} className="flex flex-col">
                <Skeleton className="w-full h-48 rounded-t-lg" />
                <CardHeader className="pt-4">
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter className="flex justify-end gap-2 p-4 border-t">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                </CardFooter>
            </Card>
        ))}
    </div>
);


export default function AdminManageBlogs() {
    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentPostForUpsert, setCurrentPostForUpsert] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1, total: 0 });


    const fetchBlogPosts = useCallback(async (page = 1, searchTermQuery = searchTerm) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await BlogPostApi.getAll({ page, search: searchTermQuery });
            setAllPosts(response.data.data || []); // For client-side filtering if not using backend search
            setFilteredPosts(response.data.data || []); // Directly use backend filtered/paginated data
            setPagination({
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                total: response.data.meta.total,
            });
        } catch (err) {
            console.error("Failed to fetch blog posts:", err);
            setError(err.response?.data?.message || "Failed to load blog posts.");
            setAllPosts([]);
            setFilteredPosts([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm]); // Add searchTerm dependency if backend handles search

    useEffect(() => {
        fetchBlogPosts(1, searchTerm); // Fetch based on current search term
    }, [searchTerm, fetchBlogPosts]); // Rerun if searchTerm changes

    // Client-side filtering (remove or adapt if backend search is primary)
    useEffect(() => {
        let currentPosts = [...allPosts];
        if (searchTerm) {
            currentPosts = currentPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
            );
        }
        setFilteredPosts(currentPosts);
    }, [searchTerm, allPosts]);


    const handleOpenCreateModal = () => {
        setCurrentPostForUpsert(null);
        setError(null);
        setIsUpsertModalOpen(true);
    };

    const handleOpenEditModal = (post) => {
        setCurrentPostForUpsert(post);
        setError(null);
        setIsUpsertModalOpen(true);
    };

    const handleCloseUpsertModal = () => {
        setIsUpsertModalOpen(false);
        setCurrentPostForUpsert(null);
    };

    const handleSavePost = async (formData) => { // formData is now expected to be a FormData object
        setError(null);
        setIsSending(true);

        try {
            if (currentPostForUpsert && currentPostForUpsert.id) {
                // For updates, FormData doesn't support PUT directly in all HTTP clients/browsers for files
                // So, we often use POST and add a _method field.
                formData.append('_method', 'PUT');
                await BlogPostApi.update(currentPostForUpsert.id, formData);
                // TODO: Show success toast
            } else {
                await BlogPostApi.create(formData);
                // TODO: Show success toast
            }
            handleCloseUpsertModal();
            fetchBlogPosts(pagination.currentPage, searchTerm); // Refetch current page to see changes
        } catch (err) {
            console.error("Failed to save post:", err);
            let errorMessage = "Failed to save post.";
            if (err.response?.data?.errors) {
                errorMessage = Object.values(err.response.data.errors).flat().join(' ');
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage);
        } finally {
            setIsSending(false);
        }
    };

    const handleDeletePost = async (postId) => {
        setError(null);
        try {
            await BlogPostApi.delete(postId);
            // TODO: Show success toast
            fetchBlogPosts(pagination.currentPage, searchTerm); // Refetch to update list
            // Optimistic update:
            // setAllPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (err) {
            console.error("Failed to delete post:", err);
            setError(err.response?.data?.message || "Failed to delete post.");
        }
    };

    const handleViewPost = (post) => {
        console.log("View post:", post.slug);
        // In a real app, you'd navigate to the public post page, e.g., using react-router-dom history or Link
        // window.open(`/blog/${post.slug}`, '_blank');
        alert(`Viewing post (slug): ${post.slug}\nIn a real app, you'd navigate to the post page.`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // Debounce fetchBlogPosts if desired
    };
    
    const handlePageChange = (newPage) => {
        fetchBlogPosts(newPage, searchTerm);
    };


    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
                <div className="flex gap-2 w-full md:w-auto">
                     <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="pl-8" // Padding for the icon
                        />
                    </div>
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4" />
                        New Post
                    </Button>
                </div>
            </div>

            {error && !isUpsertModalOpen && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {isLoading ? (
                <BlogPostsLoadingSkeleton />
            ) : filteredPosts.length === 0 && !error ? (
                <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                        {searchTerm ? "No posts match your search." : "No blog posts yet."}
                    </p>
                    {!searchTerm && <p className="text-sm text-muted-foreground">Start by creating your first post!</p>}
                </div>
            ) : !error ? (
                <BlogPostsList
                    posts={filteredPosts}
                    onEditPost={handleOpenEditModal}
                    onDeletePost={handleDeletePost}
                    onViewPost={handleViewPost}
                />
            ) : null }

            {/* Pagination Controls */}
            {!isLoading && !error && filteredPosts.length > 0 && pagination.lastPage > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                    <Button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        variant="outline"
                    >
                        Previous
                    </Button>
                    <span>
                        Page {pagination.currentPage} of {pagination.lastPage}
                    </span>
                    <Button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.lastPage}
                        variant="outline"
                    >
                        Next
                    </Button>
                </div>
            )}


            {isUpsertModalOpen && (
                <UpsertBlogPostForm
                    isOpen={isUpsertModalOpen}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) handleCloseUpsertModal();
                        else setIsUpsertModalOpen(true);
                    }}
                    onSubmit={handleSavePost} // onSubmit now expects FormData
                    initialData={currentPostForUpsert}
                    dialogTitle={currentPostForUpsert ? "Edit Blog Post" : "Create New Blog Post"}
                    dialogDescription={
                        currentPostForUpsert
                            ? "Make changes to your blog post."
                            : "Craft a new blog post for your audience."
                    }
                    submitButtonText={currentPostForUpsert ? "Update Post" : "Create Post"}
                    isSending={isSending}
                    // Pass form-specific errors if you want to display them inside the modal
                    // formError={isUpsertModalOpen ? error : null}
                />
            )}
        </div>
    );
}