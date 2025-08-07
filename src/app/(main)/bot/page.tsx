import React from 'react'
import Bot from '../bot'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

function page() {
    return (
        <div>
            {/* Navigation */}
            <nav className="border-b bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-lg md:text-xl font-bold text-green-800">FarmFresh AI</span>
                        </Link>
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <Link href="/marketplace" className="text-gray-700 hover:text-green-600 text-sm md:text-base">
                                <span className="hidden sm:inline">← Back to Marketplace</span>
                                <span className="sm:hidden">← Back</span>
                            </Link>

                            <Link href='/cart'>
                                <Button variant="ghost" size="sm">
                                    <ShoppingCart className="h-4 w-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Cart (0)</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='max-w-[300px] md:max-w-[600px] w-full mx-auto my-10 border-green-600 rounded-2xl border-2'>
                <Bot />
            </div>
        </div>
    )
}

export default page