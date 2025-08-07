
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogTitle } from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { X } from 'lucide-react';

// ✅ Schema
const formSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Price must be a positive number',
        }),
    images: z
        .any()
        .refine((files) => Array.isArray(files) && files.length > 0, {
            message: 'At least one image is required',
        }),
    quantity: z
        .string()
        .refine((val) => Number.isInteger(Number(val)) && Number(val) >= 0, {
            message: 'Quantity must be a non-negative integer',
        }),
    category: z.string().min(1, 'Category is required'),
});

type ProductFormValues = z.infer<typeof formSchema>;

export default function CreateProductForm() {
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: '',
            images: [],
            quantity: '',
            category: '',
        },
    });

    const onSubmit = (values: ProductFormValues) => {
        const data = {
            ...values,
            price: Number(values.price),
            quantity: Number(values.quantity),
        };

        console.log('Validated & Parsed Form Data:', data);
        // Handle API/form submission here
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const updatedFiles = [...imageFiles, ...files];
        setImageFiles(updatedFiles);
        form.setValue('images', updatedFiles);
    };

    const handleFileDelete = (index: number) => {
        const updatedFiles = [...imageFiles];
        updatedFiles.splice(index, 1);
        setImageFiles(updatedFiles);
        form.setValue('images', updatedFiles);
    };

    return (
        <div className="space-y-6 p-4">
            <DialogTitle className="text-2xl font-semibold text-center">
                Create Product
            </DialogTitle>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Text Fields */}
                    {(['name', 'description', 'price', 'quantity', 'category'] as const).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field}
                            render={({ field: f }) => (
                                <FormItem>
                                    <FormLabel className="capitalize">{field}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...f}
                                            type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
                                            placeholder={`Enter ${field}`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    {/* Multiple Image Upload */}
                    <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                            <FormItem>
                                <FormLabel>Product Images</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* File Name Preview List with Delete Button */}
                    {imageFiles.length > 0 && (
                        <div className="space-y-2">
                            {imageFiles.map((file, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between border rounded px-3 py-2 text-sm bg-muted"
                                >
                                    <span className="truncate">{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleFileDelete(idx)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Remove file"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button type="submit" className="w-full">
                        Submit Product
                    </Button>
                </form>
            </Form>
        </div>
    );
}
