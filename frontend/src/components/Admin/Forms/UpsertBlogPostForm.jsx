// src/components/admin/blogs/UpsertBlogPostForm.jsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Helper to create a simple slug
const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
};


const DEFAULT_FORM_DATA = {
    title: '',
    slug: '',
    content: '',
    author: 'Admin', // Or get from logged-in user
    category: '',
    tags: '', // Store as comma-separated string for simplicity in form
    status: 'draft',
    featuredImage: ''
};

export default function UpsertBlogPostForm({
    isOpen,
    onOpenChange,
    onSubmit,
    initialData,
    dialogTitle,
    dialogDescription,
    submitButtonText
}) {
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || ''),
            });
        } else {
            setFormData(DEFAULT_FORM_DATA);
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => {
            const newState = { ...prev, [id]: value };
            if (id === 'title') {
                newState.slug = slugify(value);
            }
            return newState;
        });
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        onSubmit({ ...formData, tags: tagsArray });
    };

    const handleClose = () => {
        onOpenChange(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px]"> {/* Made wider for blog content */}
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2"> {/* Added scroll for long forms */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Blog post title"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">
                                Slug
                            </Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={handleChange} // Allow manual override if needed
                                className="col-span-3"
                                placeholder="my-blog-post-title"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4"> {/* items-start for textarea */}
                            <Label htmlFor="content" className="text-right pt-2">
                                Content
                            </Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="col-span-3 min-h-[200px]" // Taller textarea
                                placeholder="Write your blog post content here... (Supports Markdown or HTML based on your setup)"
                                rows={10}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="author" className="text-right">
                                Author
                            </Label>
                            <Input
                                id="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Author name"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            {/* In a real app, categories might come from a predefined list or API */}
                            <Input
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="e.g., Technology, Lifestyle"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tags" className="text-right">
                                Tags
                            </Label>
                            <Input
                                id="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Comma-separated, e.g., react, webdev"
                            />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="featuredImage" className="text-right">
                                Featured Image URL
                            </Label>
                            <Input
                                id="featuredImage"
                                value={formData.featuredImage}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!formData.title || !formData.content}>
                            {submitButtonText}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}