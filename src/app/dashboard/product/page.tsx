'use client';

import { useState } from 'react';
import ProductTable from './_components/ProductTable';

const initialData = [
    {
        id: '1',
        name: 'Tomato',
        description: 'Fresh tomatoes',
        price: 40,
        image: 'https://source.unsplash.com/50x50/?tomato',
        quantity: 20,
        category: 'Vegetable',
    },
    {
        id: '1',
        name: 'Tomato',
        description: 'Fresh tomatoes',
        price: 40,
        image: 'https://source.unsplash.com/50x50/?tomato',
        quantity: 20,
        category: 'Vegetable',
    },
];

export default function ProductPage() {
    const [products, setProducts] = useState(initialData);

    const handleDelete = (id: string) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return <ProductTable products={products} onDelete={handleDelete} />;
}
