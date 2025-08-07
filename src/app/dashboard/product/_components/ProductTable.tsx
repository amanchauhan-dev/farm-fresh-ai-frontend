'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import CreateProductForm from './CreateProductForm';
import UpdateProductForm from './UpdateProductForm';


type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
};

type Props = {
    products: Product[];
    onDelete: (id: string) => void;
};

export default function ProductTable({ products, onDelete }: Props) {
    const [editProduct, setEditProduct] = useState<Product | null>(null);

    return (
        <>
            <div className="mb-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Create Product</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <CreateProductForm />
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>₹{product.price}</TableCell>

                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="space-x-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="icon" onClick={() => setEditProduct(product)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>Update Product</DialogTitle>

                                        <UpdateProductForm product={editProduct} />
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => {
                                        if (confirm('Are you sure to delete this product?')) {
                                            onDelete(product.id);
                                        }
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
