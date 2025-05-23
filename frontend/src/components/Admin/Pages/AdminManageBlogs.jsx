// src/components/admin/blogs/AdminManageBlogs.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';

import BlogPostsList from '../Blogs/BlogPostsList';
import UpsertBlogPostForm from '../Forms/UpsertBlogPostForm';

const initialBlogPostsData = [
    {
        id: 1,
        title: "The Future of Web Development",
        slug: "future-of-web-development",
        content: "<p>The web is constantly evolving. In this post, we explore upcoming trends like AI-powered tools, serverless architectures, and the rise of WebAssembly...</p>",
        author: "Jane Doe",
        category: "Technology",
        tags: ["Web Dev", "Future Tech", "AI"],
        status: "published",
        createdAt: "2024-06-28T14:00:00Z",
        updatedAt: "2024-06-29T10:30:00Z",
        featuredImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        title: "Getting Started with React Hooks",
        slug: "getting-started-with-react-hooks",
        content: "<h3>Understanding useState and useEffect</h3><p>React Hooks revolutionized how we write components. Let's dive into <code>useState</code> for managing state and <code>useEffect</code> for handling side effects...</p>",
        author: "John Smith",
        category: "Programming",
        tags: ["React", "JavaScript", "Tutorial"],
        status: "draft",
        createdAt: "2024-07-01T09:15:00Z",
        updatedAt: "2024-07-01T11:00:00Z",
        featuredImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    }
];

export default function AdminManageBlogs() {
    const [allPosts, setAllPosts] = useState(initialBlogPostsData);
    const [filteredPosts, setFilteredPosts] = useState(initialBlogPostsData);
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [currentPostForUpsert, setCurrentPostForUpsert] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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
        setIsUpsertModalOpen(true);
    };

    const handleOpenEditModal = (post) => {
        setCurrentPostForUpsert(post);
        setIsUpsertModalOpen(true);
    };

    const handleCloseUpsertModal = () => {
        setIsUpsertModalOpen(false);
        setCurrentPostForUpsert(null);
    };

    const handleSavePost = (postData) => {
        const now = new Date().toISOString();
        if (currentPostForUpsert && currentPostForUpsert.id) {
            // Editing existing post
            setAllPosts(prevPosts =>
                prevPosts.map(p =>
                    p.id === currentPostForUpsert.id ? { ...p, ...postData, updatedAt: now } : p
                )
            );
        } else {
            // Creating new post
            const newId = allPosts.length > 0 ? Math.max(...allPosts.map(a => a.id)) + 1 : 1;
            const newPost = {
                id: newId,
                ...postData,
                createdAt: now,
                updatedAt: now,
            };
            setAllPosts(prevPosts => [newPost, ...prevPosts]); // Add new post to the beginning
        }
        handleCloseUpsertModal();
    };

    const handleDeletePost = (postId) => {
        setAllPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    const handleViewPost = (post) => {
        // For now, just log. In a real app, you might navigate to the public blog post page.
        console.log("View post:", post.slug);
        alert(`Viewing post (slug): ${post.slug}\nIn a real app, you'd navigate to the post page.`);
    };

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
                <div className="flex gap-2 w-full md:w-auto">
                     <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow md:w-64"
                    />
                    <Button className="flex items-center gap-2" onClick={handleOpenCreateModal}>
                        <Plus className="h-4 w-4" />
                        New Post
                    </Button>
                </div>
            </div>
            
            {/*
                Instead of wrapping everything in a Card, 
                the page itself acts as the container.
                The list will be made of Cards.
            */}
            <BlogPostsList
                posts={filteredPosts}
                onEditPost={handleOpenEditModal}
                onDeletePost={handleDeletePost}
                onViewPost={handleViewPost}
            />

            {isUpsertModalOpen && (
                <UpsertBlogPostForm
                    isOpen={isUpsertModalOpen}
                    onOpenChange={setIsUpsertModalOpen}
                    onSubmit={handleSavePost}
                    initialData={currentPostForUpsert}
                    dialogTitle={currentPostForUpsert ? "Edit Blog Post" : "Create New Blog Post"}
                    dialogDescription={
                        currentPostForUpsert
                            ? "Make changes to your blog post."
                            : "Craft a new blog post for your audience."
                    }
                    submitButtonText={currentPostForUpsert ? "Update Post" : "Create Post"}
                />
            )}
        </div>
    );
}