// src/components/Admin/Blogs/BlogPostsList.jsx

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from 'lucide-react';

export default function BlogPostsList({ posts, onEditPost, onDeletePost, onViewPost }) {
    if (!posts || posts.length === 0) {
        return null; 
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
                <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                    {post.featured_image && (
                        <img 
                            src={post.featured_image} 
                            alt={post.title} 
                            className="w-full h-48 object-cover rounded-t-lg" 
                        />
                    )}
                    <CardHeader className="pt-4">
                        <CardTitle className="text-xl font-bold line-clamp-2">{post.title || "Untitled Post"}</CardTitle>
                        <div className="text-xs text-muted-foreground pt-1">
                            {/* --- THIS IS THE FIX --- */}
                            {/* We access post.author.name, not the whole object. */}
                            {/* The '?' (optional chaining) prevents errors if author is null. */}
                            <span>By {post.author?.name || 'Unknown Author'}</span>
                            <span className="mx-2">•</span>
                            <span>
                                {post.published_at 
                                    ? `Published on ${new Date(post.published_at).toLocaleDateString()}`
                                    : `Draft`
                                }
                            </span>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {post.content_summary || post.excerpt || "No summary available."}
                        </p>
                        {post.category && (
                            <Badge variant="secondary" className="mt-4">{post.category}</Badge>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-end gap-2 p-4 border-t">
                        {onViewPost && (
                             <Button variant="outline" size="sm" onClick={() => onViewPost(post)}>
                                <Eye className="h-4 w-4 mr-2" /> View
                            </Button>
                        )}
                        {onEditPost && (
                            <Button variant="secondary" size="sm" onClick={() => onEditPost(post)}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                            </Button>
                        )}
                        {onDeletePost && (
                             <Button variant="destructive" size="sm" onClick={() => onDeletePost(post.id)}>
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}