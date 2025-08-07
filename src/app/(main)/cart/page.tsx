"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Minus, Trash2, Heart, Truck, Shield, Tag, ArrowRight, MapPin, Leaf, ShoppingBag } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

// Dummy cart data
const initialCartItems = [
    {
        id: 1,
        name: "Organic Tomatoes",
        farmer: "Green Valley Farm",
        location: "California",
        price: 4.99,
        unit: "lb",
        quantity: 2,
        image: "/fresh-organic-tomatoes.png",
        organic: true,
        inStock: true,
        category: "Vegetables"
    },
    {
        id: 2,
        name: "Fresh Spinach",
        farmer: "Sunny Acres",
        location: "Oregon",
        price: 3.49,
        unit: "bunch",
        quantity: 1,
        image: "/fresh-spinach.png",
        organic: true,
        inStock: true,
        category: "Vegetables"
    },
    {
        id: 3,
        name: "Farm Eggs",
        farmer: "Happy Hen Farm",
        location: "Vermont",
        price: 6.99,
        unit: "dozen",
        quantity: 1,
        image: "/farm-fresh-eggs.png",
        organic: false,
        inStock: true,
        category: "Dairy & Eggs"
    },
    {
        id: 4,
        name: "Organic Carrots",
        farmer: "Root & Branch Farm",
        location: "Washington",
        price: 2.99,
        unit: "lb",
        quantity: 3,
        image: "/organic-carrots.png",
        organic: true,
        inStock: false,
        category: "Vegetables"
    }
]

const shippingOptions = [
    { id: "standard", name: "Standard Delivery", price: 5.99, time: "3-5 business days" },
    { id: "express", name: "Express Delivery", price: 12.99, time: "1-2 business days" },
    { id: "free", name: "Free Delivery", price: 0, time: "5-7 business days", minOrder: 50 }
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems)
    const [promoCode, setPromoCode] = useState("")
    const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
    const [selectedShipping, setSelectedShipping] = useState("standard")
    const [saveForLater, setSaveForLater] = useState<number[]>([])

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity === 0) {
            removeItem(id)
            return
        }
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
            )
        )
    }

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id))
    }

    const moveToSaveForLater = (id: number) => {
        setSaveForLater(prev => [...prev, id])
        setCartItems(items => items.filter(item => item.id !== id))
    }

    const moveToCart = (id: number) => {
        const savedItem = saveForLater.find(itemId => itemId === id)
        if (savedItem) {
            const originalItem = initialCartItems.find(item => item.id === savedItem)
            if (originalItem) {
                setCartItems(prev => [...prev, { ...originalItem, quantity: 1 }])
                setSaveForLater(prev => prev.filter(itemId => itemId !== id))
            }
        }
    }

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === "fresh10") {
            setAppliedPromo("FRESH10")
            setPromoCode("")
        } else if (promoCode.toLowerCase() === "organic15") {
            setAppliedPromo("ORGANIC15")
            setPromoCode("")
        }
    }

    const removePromoCode = () => {
        setAppliedPromo(null)
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const promoDiscount = appliedPromo === "FRESH10" ? subtotal * 0.1 :
        appliedPromo === "ORGANIC15" ? subtotal * 0.15 : 0
    const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping)
    const shippingCost = selectedShippingOption?.minOrder && subtotal >= selectedShippingOption.minOrder
        ? 0 : selectedShippingOption?.price || 0
    const tax = (subtotal - promoDiscount) * 0.08
    const total = subtotal - promoDiscount + shippingCost + tax

    const savedItems = initialCartItems.filter(item => saveForLater.includes(item.id))

    if (cartItems.length === 0 && savedItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <nav className="border-b bg-white sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center space-x-2">
                                <Leaf className="h-8 w-8 text-green-600" />
                                <span className="text-lg md:text-xl font-bold text-green-800">FarmFresh AI</span>
                            </Link>
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <Link href="/marketplace" className="text-gray-700 hover:text-green-600 text-sm md:text-base">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Empty Cart */}
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <div className="text-center max-w-md mx-auto">
                        <div className="bg-green-100 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                        <p className="text-gray-600 mb-8 text-sm md:text-base">
                            Looks like you haven&apos;t added any fresh produce to your cart yet.
                            Discover amazing products from local farmers!
                        </p>
                        <div className="space-y-3">
                            <Button className="w-full bg-green-600 hover:bg-green-700" size="lg" asChild>
                                <Link href="/marketplace">
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Start Shopping
                                </Link>
                            </Button>
                            <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50" asChild>
                                <Link href="/subscription">
                                    Explore Subscription Boxes
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="border-b bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <Leaf className="h-8 w-8 text-green-600" />
                            <span className="text-lg md:text-xl font-bold text-green-800">FarmFresh AI</span>
                        </Link>
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <Link href="/marketplace" className="text-gray-700 hover:text-green-600 text-sm md:text-base">
                                Continue Shopping
                            </Link>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-6 md:py-8">
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
                            <span className="text-sm md:text-base text-gray-600">
                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                            </span>
                        </div>

                        {/* Cart Items List */}
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id} className="overflow-hidden">
                                    <CardContent className="p-4 md:p-6">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <div className="relative w-full sm:w-24 md:w-32 aspect-square rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={item.image || "/placeholder.svg"}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    {!item.inStock && (
                                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                            <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 space-y-2 md:space-y-3">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="font-semibold text-base md:text-lg">{item.name}</h3>
                                                            {item.organic && (
                                                                <Badge className="bg-green-600 text-white text-xs">Organic</Badge>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center text-green-600 text-sm">
                                                            <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                                            <span>{item.farmer}, {item.location}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg md:text-xl font-bold text-gray-900">
                                                            ${item.price}
                                                            <span className="text-sm text-gray-500">/{item.unit}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Quantity and Actions */}
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                                    <div className="flex items-center space-x-3">
                                                        {/* Quantity Selector */}
                                                        <div className="flex items-center border rounded-lg">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="h-8 w-8 p-0"
                                                                disabled={!item.inStock}
                                                            >
                                                                <Minus className="h-3 w-3 md:h-4 md:w-4" />
                                                            </Button>
                                                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="h-8 w-8 p-0"
                                                                disabled={!item.inStock}
                                                            >
                                                                <Plus className="h-3 w-3 md:h-4 md:w-4" />
                                                            </Button>
                                                        </div>
                                                        <span className="text-sm text-gray-600">
                                                            Total: ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => moveToSaveForLater(item.id)}
                                                            className="text-xs md:text-sm"
                                                        >
                                                            <Heart className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                                            Save for Later
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {!item.inStock && (
                                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                                        <p className="text-red-800 text-sm">
                                                            This item is currently out of stock. Remove it from your cart or save it for later.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Saved for Later */}
                        {savedItems.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                    Saved for Later ({savedItems.length})
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {savedItems.map((item) => (
                                        <Card key={item.id} className="overflow-hidden">
                                            <CardContent className="p-4">
                                                <div className="space-y-3">
                                                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                                                        <Image
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.name}
                                                            width={200}
                                                            height={200}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h3 className="font-semibold text-sm">{item.name}</h3>
                                                        <p className="text-green-600 text-xs">{item.farmer}</p>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-bold text-sm">${item.price}/{item.unit}</span>
                                                            <Button
                                                                size="sm"
                                                                onClick={() => moveToCart(item.id)}
                                                                className="bg-green-600 hover:bg-green-700 text-xs"
                                                            >
                                                                Add to Cart
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-4 md:space-y-6">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-lg md:text-xl">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Promo Code */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Promo Code</label>
                                    {appliedPromo ? (
                                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-center">
                                                <Tag className="h-4 w-4 text-green-600 mr-2" />
                                                <span className="text-sm font-medium text-green-800">{appliedPromo}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={removePromoCode}
                                                className="text-green-600 hover:text-green-700 p-1"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <Input
                                                placeholder="Enter code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                className="text-sm"
                                            />
                                            <Button
                                                variant="outline"
                                                onClick={applyPromoCode}
                                                className="border-green-600 text-green-600 hover:bg-green-50 text-sm"
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-500">Try: FRESH10 or ORGANIC15</p>
                                </div>

                                <Separator />

                                {/* Shipping Options */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium">Shipping Options</label>
                                    <Select value={selectedShipping} onValueChange={setSelectedShipping}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {shippingOptions.map((option) => (
                                                <SelectItem key={option.id} value={option.id}>
                                                    <div className="flex justify-between items-center w-full">
                                                        <div>
                                                            <div className="font-medium text-sm">{option.name}</div>
                                                            <div className="text-xs text-gray-500">{option.time}</div>
                                                        </div>
                                                        <div className="text-sm font-medium">
                                                            {option.minOrder && subtotal >= option.minOrder ? 'FREE' : `$${option.price}`}
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                {/* Price Breakdown */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {promoDiscount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount ({appliedPromo})</span>
                                            <span>-${promoDiscount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-base font-bold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                                    Proceed to Checkout
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>

                                {/* Security Features */}
                                <div className="space-y-2 text-xs text-gray-600">
                                    <div className="flex items-center">
                                        <Shield className="h-3 w-3 mr-2 text-green-600" />
                                        <span>Secure checkout</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Truck className="h-3 w-3 mr-2 text-green-600" />
                                        <span>Free delivery on orders over $50</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
