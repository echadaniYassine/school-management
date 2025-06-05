// src/components/admin/blogs/UpsertBlogPostForm.jsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from 'react'; // Added useRef
import { toast } from 'sonner'; // For form-level validation feedback if needed

// Helper to create a simple slug (remains the same)
const slugify = (text) => {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

const DEFAULT_FORM_STATE = {
    title: '',
    slug: '',
    content: '',
    author: 'Admin', // Or get from logged-in user context
    category: '',
    tags: '', // Will be comma-separated string in form, converted to array on submit
    status: 'draft',
    // featuredImage field will be handled by a file input
    // featuredImageURL: '', // If you still want to allow URL input as an alternative/fallback
};

export default function UpsertBlogPostForm({
    isOpen,
    onOpenChange,
    onSubmit: onSubmitProp, // Renamed to avoid confusion with internal handleSubmit
    initialData,
    dialogTitle,
    dialogDescription,
    submitButtonText,
    isSending, // Receive isSending prop from parent
}) {
    const [formState, setFormState] = useState(DEFAULT_FORM_STATE);
    const [featuredImageFile, setFeaturedImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState(''); // To display existing image URL
    const [removeCurrentImage, setRemoveCurrentImage] = useState(false); // Checkbox state

    const fileInputRef = useRef(null); // To reset file input

    useEffect(() => {
        if (isOpen) { // Reset form only when dialog opens
            if (initialData) {
                setFormState({
                    title: initialData.title || '',
                    slug: initialData.slug || '',
                    content: initialData.content || '',
                    author: initialData.author || 'Admin',
                    category: initialData.category || '',
                    tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || ''),
                    status: initialData.status || 'draft',
                });
                setCurrentImageUrl(initialData.featured_image_url || initialData.featuredImage || ''); // Handle both URL or direct image path
                setFeaturedImageFile(null); // Clear any previously selected file
                setRemoveCurrentImage(false); // Reset remove image flag
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Reset the file input visually
                }
            } else {
                setFormState(DEFAULT_FORM_STATE);
                setCurrentImageUrl('');
                setFeaturedImageFile(null);
                setRemoveCurrentImage(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormState(prev => {
            const newState = { ...prev, [id]: value };
            if (id === 'title') {
                newState.slug = slugify(value);
            }
            return newState;
        });
    };

    const handleSelectChange = (name, value) => {
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFeaturedImageFile(e.target.files[0]);
            setCurrentImageUrl(''); // Clear existing URL if a new file is chosen
            setRemoveCurrentImage(false); // Uncheck remove if new file is selected
        } else {
            setFeaturedImageFile(null);
        }
    };

    const internalHandleSubmit = (e) => {
        e.preventDefault();

        // Basic client-side validation (optional, good to have)
        if (!formState.title || !formState.content) {
            toast.error("Title and Content are required.");
            return;
        }

        const formDataToSubmit = new FormData();

        formDataToSubmit.append('title', formState.title);
        formDataToSubmit.append('slug', formState.slug || slugify(formState.title)); // Ensure slug is present
        formDataToSubmit.append('content', formState.content);
        formDataToSubmit.append('author', formState.author);
        formDataToSubmit.append('category', formState.category);
        
        const tagsArray = formState.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        if (tagsArray.length > 0) {
            tagsArray.forEach(tag => formDataToSubmit.append('tags[]', tag));
        } else {
            // If you need to send an empty array for tags if none are provided
            // formDataToSubmit.append('tags', ''); // Or however your backend expects empty tags
        }
        
        formDataToSubmit.append('status', formState.status);

        if (featuredImageFile) {
            formDataToSubmit.append('featuredImage', featuredImageFile);
        } else if (removeCurrentImage && initialData) { // If "remove" is checked and it's an edit
             formDataToSubmit.append('remove_featured_image', '1'); // Signal backend to remove
        }
        // If no new file, not removing, and it's an edit, backend should keep the existing image.
        // No need to append 'featuredImage' in that case unless backend requires the old URL.

        onSubmitProp(formDataToSubmit); // Call parent's onSubmit with the FormData object
    };

    const handleClose = () => {
        onOpenChange(false); // This will trigger the useEffect to reset the form if needed
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}> {/* Use onOpenChange directly for close */}
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>
                <form onSubmit={internalHandleSubmit}>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
                        {/* Title */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" value={formState.title} onChange={handleChange} className="col-span-3" required />
                        </div>
                        {/* Slug */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">Slug</Label>
                            <Input id="slug" value={formState.slug} onChange={handleChange} className="col-span-3" />
                        </div>
                        {/* Content */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="content" className="text-right pt-2">Content</Label>
                            <Textarea id="content" value={formState.content} onChange={handleChange} className="col-span-3 min-h-[200px]" rows={10} required />
                        </div>
                        {/* Author */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="author" className="text-right">Author</Label>
                            <Select value={formState.author} onValueChange={(value) => handleSelectChange('author', value)}>
                                <SelectTrigger className="col-span-3" id="author"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Teacher">Teacher</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Category */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Input id="category" value={formState.category} onChange={handleChange} className="col-span-3" />
                        </div>
                        {/* Tags */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tags" className="text-right">Tags</Label>
                            <Input id="tags" value={formState.tags} onChange={handleChange} className="col-span-3" placeholder="Comma-separated" />
                        </div>
                        
                        {/* Featured Image - File Input */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="featuredImageFile" className="text-right pt-2">Featured Image</Label>
                            <div className="col-span-3">
                                <Input
                                    id="featuredImageFile"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    className="mb-2"
                                />
                                {currentImageUrl && !featuredImageFile && (
                                    <div className="mt-2">
                                        <p className="text-xs text-muted-foreground">Current image:</p>
                                        <img src={currentImageUrl} alt="Current featured" className="h-20 w-auto rounded border" />
                                        <div className="flex items-center space-x-2 mt-1">
                                            <input 
                                                type="checkbox" 
                                                id="removeCurrentImage" 
                                                checked={removeCurrentImage}
                                                onChange={(e) => setRemoveCurrentImage(e.target.checked)}
                                                disabled={!!featuredImageFile} // Disable if new file is selected
                                            />
                                            <Label htmlFor="removeCurrentImage" className="text-sm font-normal">
                                                Remove current image
                                            </Label>
                                        </div>
                                    </div>
                                )}
                                {featuredImageFile && (
                                     <p className="text-xs text-muted-foreground mt-1">New file selected: {featuredImageFile.name}</p>
                                )}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <Select value={formState.status} onValueChange={(value) => handleSelectChange('status', value)}>
                                <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={isSending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSending || !formState.title || !formState.content}>
                            {isSending ? "Saving..." : submitButtonText}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}