import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function BlogPostDetailView({ post, isOpen, onOpenChange }) {
    if (!post) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl">{post.title}</DialogTitle>
                    <DialogDescription>By {post.author?.name || 'Unknown'} on {new Date(post.published_at).toLocaleDateString()}</DialogDescription>
                </DialogHeader>
                {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="w-full h-auto object-cover rounded-md mt-4" />}
                <div
                    className="py-4 prose dark:prose-invert max-w-none max-h-[60vh] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />
            </DialogContent>
        </Dialog>
    );
}