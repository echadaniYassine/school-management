// src/components/Admin/Blogs/BlogPostsList.jsx

import BlogPostItem from './BlogPostItem'; // Make sure this path points to your detailed item component

export default function BlogPostsList({ posts, onEditPost, onDeletePost, onViewPost }) {
    if (!posts || posts.length === 0) {
        return null; 
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
                <BlogPostItem
                    key={post.id}
                    post={post}
                    onEdit={onEditPost}    // Pass onEditPost prop to onEdit
                    onDelete={onDeletePost}  // Pass onDeletePost prop to onDelete
                    onView={onViewPost}      // Pass onViewPost prop to onView
                />
            ))}
        </div>
    );
}