import { useEffect, useState } from "react";
import BlogPostApi from "../../../Services/Api/Admin/Blog";

const StudentBlog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await BlogPostApi.getAll();
            setBlogs(res.data?.data || []);
        };
        fetchBlogs();
    }, []);

    return (
        <div>
            <h2>Blog Posts</h2>
            <ul>
                {blogs.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentBlog;
