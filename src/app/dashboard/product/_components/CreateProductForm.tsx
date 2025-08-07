'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DialogTitle } from '@/components/ui/dialog';

export default function CreateProductForm() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        quantity: '',
        category: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form); // Replace with API call
    };

    return (
        <>
            <DialogTitle>Create Product</DialogTitle>
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
                <Button type="submit">Create</Button>
            </form>
        </>
    );
}
