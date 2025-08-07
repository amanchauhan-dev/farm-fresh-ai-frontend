'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    const [form, setForm] = useState<Product | null>(null);

    useEffect(() => {
        setForm(product);
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!form) return;
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updating product: ', form); // Replace with API call
    };

    if (!form) return null;

    return (
        <>

            <form onSubmit={handleSubmit} className="space-y-4">
                {(['name', 'description', 'price', 'image', 'quantity', 'category'] as const).map((field) => (
                    <div key={field}>
                        <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                        <Input
                            id={field}
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            required
                            type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
                        />
                    </div>
                ))}
                <Button type="submit">Update</Button>
            </form>
        </>
    );
}
