// src/components/admin/courses/UpsertCourseForm.jsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DEFAULT_FORM_DATA = {
    title: '',
    code: '',
    description: '',
    instructor: '',
    category: '',
    level: 'Beginner',
    duration: '',
    status: 'draft',
    thumbnailUrl: '',
    price: '0' // Store as string for input, parse on submit
};

export default function UpsertCourseForm({
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
                price: initialData.price?.toString() || '0',
            });
        } else {
            setFormData(DEFAULT_FORM_DATA);
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, price: parseFloat(formData.price) || 0 });
    };

    const handleClose = () => {
        onOpenChange(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-3">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Course title"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="code" className="text-right">
                                Code
                            </Label>
                            <Input
                                id="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="e.g., CS101"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="text-right pt-2">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Brief course description"
                                rows={4}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="instructor" className="text-right">
                                Instructor
                            </Label>
                            <Input
                                id="instructor"
                                value={formData.instructor}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Instructor's name"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <Input
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="e.g., Technology, Business"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="level" className="text-right">
                                Level
                            </Label>
                            <Select value={formData.level} onValueChange={(value) => handleSelectChange('level', value)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                    <SelectItem value="All Levels">All Levels</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duration" className="text-right">
                                Duration
                            </Label>
                            <Input
                                id="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="e.g., 8 Weeks, 1 Semester"
                            />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="0 for free"
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="thumbnailUrl" className="text-right">
                                Thumbnail URL
                            </Label>
                            <Input
                                id="thumbnailUrl"
                                value={formData.thumbnailUrl}
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
                        <Button type="submit" disabled={!formData.title}>
                            {submitButtonText}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}