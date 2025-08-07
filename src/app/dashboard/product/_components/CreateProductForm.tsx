'use client';

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

// ✅ Zod Schema
const formSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Price must be a positive number',
        }),
    image: z.string().url('Must be a valid image URL'),
    quantity: z
        .string()
        .refine((val) => Number.isInteger(Number(val)) && Number(val) >= 0, {
            message: 'Quantity must be a non-negative integer',
        }),
    category: z.string().min(1, 'Category is required'),
});

// ✅ Inferred Type
type ProductFormValues = z.infer<typeof formSchema>;

export default function CreateProductForm() {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: '',
            image: '',
            quantity: '',
            category: '',
        },
    });

    const onSubmit = (values: ProductFormValues) => {
        // Convert to correct types
        const data = {
            ...values,
            price: Number(values.price),
            quantity: Number(values.quantity),
        };

        console.log('Validated & Parsed Form Data:', data);
        // Add API call here
    };

    return (
        <div className="space-y-6 p-4">
            <DialogTitle className="text-2xl font-semibold text-center">Create Product</DialogTitle>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {(['name', 'description', 'price', 'image', 'quantity', 'category'] as const).map((field) => (
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

                    <Button type="submit" className="w-full">
                        Submit Product
                    </Button>
                </form>
            </Form>
        </div>
    );
}
