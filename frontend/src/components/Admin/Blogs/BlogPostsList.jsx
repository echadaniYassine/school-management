// src/components/admin/blogs/BlogPostsList.jsx
import BlogPostItem from './BlogPostItem';

export default function BlogPostsList({ posts, onEditPost, onDeletePost, onViewPost }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No blog posts yet.</p>
                <p className="text-sm text-muted-foreground">Start by creating your first post!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <BlogPostItem
                    key={post.id}
                    post={post}
                    onEdit={onEditPost}
                    onDelete={onDeletePost}
                    onView={onViewPost}
                />
            ))}
        </div>
    );
}