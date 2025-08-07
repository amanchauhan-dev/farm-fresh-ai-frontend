'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

type Order = {
    id: string;
    buyer: string;
    products: string[];
    quantity: number;
    time: string;
    delivered: boolean;
};

type Props = {
    orders: Order[];
};

export default function OrderTable({ orders }: Props) {
    return (
        <div className="overflow-x-auto rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.buyer}</TableCell>
                            <TableCell>
                                <ul className="list-disc ml-4 space-y-1 text-sm">
                                    {order.products.map((product, i) => (
                                        <li key={i}>{product}</li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell>{order.quantity}</TableCell>

                            <TableCell>
                                <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${order.delivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                >
                                    {order.delivered ? 'Delivered' : 'Pending'}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
