// src/components/admin/blogs/TeacherBlog.jsx
// OR, if making it generic: src/components/shared/blogs/ManageBlogPosts.jsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner'; // Ensure sonner is set up

// Adjust import paths as per your project structure
import BlogPostApi from '../../Services/Api/Admin/Blog';
import BlogPostsList from '../Admin/Blogs/BlogPostsList';
import UpsertBlogPostForm from '../Admin/Forms/UpsertBlogPostForm';

// Skeleton for loading blog posts (Keep your existing skeleton code)
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

// If this component is *only* for teachers, you can hardcode userRole = 'teacher'.
// If it can be used by admin too, pass userRole as a prop.
// For this example, let's assume it's specifically "TeacherBlog"
// and hardcode the role, similar to your TeacherActivities.
export default function TeacherBlog() {
    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentPostForUpsert, setCurrentPostForUpsert] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1, total: 0, perPage: 15 }); // Added perPage

    // **** THIS IS THE CRITICAL PART for a role-specific component ****
    const userRole = 'teacher'; // Hardcode role if this component is ONLY for teachers

    const fetchBlogPosts = useCallback(async (page = 1, query = searchTerm) => {
        setIsLoading(true);
        setError(null);
        try {
            // **** Pass the userRole to the API call ****
            const response = await BlogPostApi.getAll({ page, search: query, per_page: pagination.perPage }, userRole);
            
            const postsData = response.data.data || [];
            setAllPosts(postsData);
            setFilteredPosts(postsData);

            if (response.data.meta) {
                setPagination(prev => ({
                    ...prev,
                    currentPage: response.data.meta.current_page,
                    lastPage: response.data.meta.last_page,
                    total: response.data.meta.total,
                    perPage: response.data.meta.per_page || prev.perPage,
                }));
            } else {
                setPagination(prev => ({ ...prev, currentPage: 1, lastPage: 1, total: postsData.length }));
            }
        } catch (err) {
            console.error(`Failed to fetch blog posts for role ${userRole}:`, err);
            const fetchError = err.response?.data?.message || "Failed to load blog posts.";
            setError(fetchError);
            toast.error(fetchError);
            setAllPosts([]);
            setFilteredPosts([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, userRole, pagination.perPage]); // Add userRole to dependencies

    useEffect(() => {
        fetchBlogPosts(1, searchTerm);
        // fetchBlogPosts is memoized with userRole, so this is fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, userRole]); // Re-fetch if searchTerm or userRole (if it were a prop) changes.

    // Client-side filtering (adapt if backend search is primary)
     useEffect(() => {
        if (!searchTerm) {
            setFilteredPosts(allPosts);
            return;
        }
        const lowerSearchTerm = searchTerm.toLowerCase();
        const clientFiltered = allPosts.filter(post =>
            (post.title && post.title.toLowerCase().includes(lowerSearchTerm)) ||
            (post.author?.name && post.author.name.toLowerCase().includes(lowerSearchTerm)) ||
            (post.author && typeof post.author === 'string' && post.author.toLowerCase().includes(lowerSearchTerm)) || // Fallback if author is just a string
            (post.category?.name && post.category.name.toLowerCase().includes(lowerSearchTerm)) ||
            (post.category && typeof post.category === 'string' && post.category.toLowerCase().includes(lowerSearchTerm)) || // Fallback if category is just a string
            (post.tags && Array.isArray(post.tags) && post.tags.some(tag => 
                (typeof tag === 'string' && tag.toLowerCase().includes(lowerSearchTerm)) ||
                (typeof tag === 'object' && tag.name && tag.name.toLowerCase().includes(lowerSearchTerm))
            ))
        );
        setFilteredPosts(clientFiltered);
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

    const handleSavePost = async (formData) => {
        setError(null);
        setIsSending(true);
        let successMessage = "";

        try {
            if (currentPostForUpsert && currentPostForUpsert.id) {
                // **** Pass userRole to API call ****
                // BlogPostApi.update should handle _method:PUT if needed.
                const response = await BlogPostApi.update(currentPostForUpsert.id, formData, userRole);
                successMessage = response.data?.message || `Post "${formData.get('title') || currentPostForUpsert.title}" updated.`;
            } else {
                // **** Pass userRole to API call ****
                const response = await BlogPostApi.create(formData, userRole);
                successMessage = response.data?.message || `Post "${formData.get('title')}" created.`;
            }
            toast.success(successMessage);
            handleCloseUpsertModal();
            fetchBlogPosts(pagination.currentPage, searchTerm);
        } catch (err) {
            console.error(`Failed to save post for role ${userRole}:`, err);
            let errorMessage = "Failed to save post.";
            if (err.response?.data?.errors) {
                errorMessage = Object.values(err.response.data.errors).flat().join(' \n');
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage);
            toast.error(errorMessage, { duration: 5000 });
        } finally {
            setIsSending(false);
        }
    };

    const handleDeletePost = async (postId) => {
        setError(null);
        try {
            // **** Pass userRole to API call ****
            const response = await BlogPostApi.delete(postId, userRole);
            toast.success(response.data?.message || "Post deleted successfully.");
            let newPage = pagination.currentPage;
            if (filteredPosts.length === 1 && pagination.currentPage > 1) {
                newPage = pagination.currentPage - 1;
            }
            fetchBlogPosts(newPage, searchTerm);
        } catch (err) {
            console.error(`Failed to delete post for role ${userRole}:`, err);
            const deleteError = err.response?.data?.message || "Failed to delete post.";
            setError(deleteError);
            toast.error(deleteError);
        }
    };

    const handleViewPost = (post) => {
        console.log("View post:", post.slug);
        toast.info(`Implement view for post: ${post.slug}`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.lastPage && newPage !== pagination.currentPage) {
            fetchBlogPosts(newPage, searchTerm);
        }
    };

    // Since userRole is hardcoded and always 'teacher', we don't need to check for its existence before rendering.
    // The API calls will use 'teacher'.

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">Manage Blog Posts (Teacher View)</h1> {/* Updated title */}
                <div className="flex gap-2 w-full md:w-auto">
                     <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="pl-8"
                        />
                    </div>
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal} disabled={isSending || isLoading}>
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
            ) : !error && filteredPosts.length === 0 ? ( // Check !error before no posts message
                <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                        {searchTerm ? "No posts match your search." : "No blog posts found."}
                    </p>
                    {!searchTerm && <p className="text-sm text-muted-foreground">Be the first to create a post!</p>}
                </div>
            ) : !error && filteredPosts.length > 0 ? (
                <BlogPostsList
                    posts={filteredPosts}
                    onEditPost={handleOpenEditModal}
                    onDeletePost={handleDeletePost}
                    onViewPost={handleViewPost}
                />
            ) : null } {/* If error is present, the Alert above handles it */}


            {!isLoading && !error && filteredPosts.length > 0 && pagination.lastPage > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                    <Button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1 || isSending}
                        variant="outline"
                    >
                        Previous
                    </Button>
                    <span>
                        Page {pagination.currentPage} of {pagination.lastPage} (Total: {pagination.total})
                    </span>
                    <Button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.lastPage || isSending}
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
                    }}
                    onSubmit={handleSavePost}
                    initialData={currentPostForUpsert}
                    dialogTitle={currentPostForUpsert ? "Edit Blog Post" : "Create New Blog Post"}
                    dialogDescription={
                        currentPostForUpsert
                            ? "Make changes to your blog post."
                            : "Craft a new blog post for your audience."
                    }
                    submitButtonText={isSending ? (currentPostForUpsert ? "Updating..." : "Creating...") : (currentPostForUpsert ? "Update Post" : "Create Post")}
                    isSending={isSending}
                />
            )}
        </div>
    );
}