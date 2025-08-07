'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-gray-800 px-4 md:px-16 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
            >
                <h1 className="text-4xl font-bold text-green-700 mb-4">About FarmFresh</h1>
                <p className="text-lg text-gray-600 mb-6">
                    At <span className="font-semibold text-green-600">FarmFresh</span>, we bring you nature&apos;s best directly from our farm to your table.
                    With a commitment to sustainability, purity, and community, we believe in reconnecting people with the roots of real food.
                </p>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Card className="border-green-500 hover:shadow-lg transition">
                            <CardHeader>
                                <CardTitle className="text-green-600">Fresh Produce</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our vegetables and fruits are handpicked and organically grown with no chemicals or preservatives.</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Card className="border-green-500 hover:shadow-lg transition">
                            <CardHeader>
                                <CardTitle className="text-green-600">Local & Sustainable</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>We support local farming and ensure each product you get is ethical and environmentally friendly.</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Card className="border-green-500 hover:shadow-lg transition">
                            <CardHeader>
                                <CardTitle className="text-green-600">Farm to Home</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>No middlemen. Just real, healthy food delivered directly from our farm to your doorstep.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <div className="mt-10 flex justify-center">
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
                            Shop Now
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
