'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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

type ProductFormValues = z.infer<typeof formSchema>;

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
};

export default function UpdateProductForm({ product }: { product: Product | null }) {
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

    // Populate form when product is available
    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name,
                description: product.description,
                price: product.price.toString(),
                image: product.image,
                quantity: product.quantity.toString(),
                category: product.category,
            });
        }
    }, [product, form]);

    const onSubmit = (values: ProductFormValues) => {
        const updatedProduct = {
            ...product,
            ...values,
            price: Number(values.price),
            quantity: Number(values.quantity),
        };

        console.log('Updated Product:', updatedProduct);
        // Call API here
    };

    if (!product) return null;

    return (
        <div className="space-y-6 p-4">
            <h2 className="text-2xl font-semibold text-center">Update Product</h2>

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
                        Update Product
                    </Button>
                </form>
            </Form>
        </div>
    );
}
