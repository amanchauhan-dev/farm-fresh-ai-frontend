'use client';

import OrderTable from "./_components/OrderTable";


const mockOrders = [
    {
        id: 'ORD-001',
        buyer: 'Ravi Kumar',
        products: ['Tomatoes', 'Carrots', 'Spinach'],
        quantity: 8,
        time: '2025-08-07T10:00:00Z',
        delivered: true
    },
    {
        id: 'ORD-002',
        buyer: 'Sneha Das',
        products: ['Apples', 'Bananas'],
        quantity: 5,
        time: '2025-08-07T12:30:00Z',
        delivered: false
    }
];

export default function OrderPage() {
    return (
        <main className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Orders</h1>
            <OrderTable orders={mockOrders} />
        </main>
    );
}
