// src/components/Admin/Blogs/BlogPostDetailView.jsx

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function BlogPostDetailView({ post, isOpen, onOpenChange }) {
    if (!post) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold leading-tight">{post.title}</DialogTitle>
                    <DialogDescription className="pt-2">
                        By {post.author?.name || 'Unknown Author'} on {new Date(post.published_at || post.createdAt).toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 overflow-y-auto">
                    {post.featuredImage && (
                        <div className="w-full aspect-video overflow-hidden rounded-lg border">
                            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                    {/* Use 'prose' from Tailwind Typography for beautiful blog text styling */}
                    <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content || '' }}
                    />
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t">
                        <span className="text-sm font-semibold">Tags:</span>
                        {post.tags?.length > 0 ? (
                            post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)
                        ) : (
                            <span className="text-sm text-muted-foreground">No tags</span>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}