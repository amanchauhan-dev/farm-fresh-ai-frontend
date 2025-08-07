'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, ShoppingCart, Truck, Users, Star, ArrowRight, CheckCircle, Bot } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

import { useState } from "react"
import { Menu, X } from "lucide-react"



import { useAuth } from "@clerk/nextjs"
import { UserButton } from "@clerk/clerk-react"


const featuredProducts = [
    {
        id: 1,
        name: "Organic Tomatoes",
        farmer: "Green Valley Farm",
        price: 4.99,
        unit: "lb",
        image: "/placeholder.svg?key=ia9zi",
        rating: 4.8,
        inStock: true
    },
    {
        id: 2,
        name: "Fresh Spinach",
        farmer: "Sunny Acres",
        price: 3.49,
        unit: "bunch",
        image: "/placeholder.svg?key=penlt",
        rating: 4.9,
        inStock: true
    },
    {
        id: 3,
        name: "Farm Eggs",
        farmer: "Happy Hen Farm",
        price: 6.99,
        unit: "dozen",
        image: "/placeholder.svg?key=jyvgv",
        rating: 4.7,
        inStock: true
    }
]

const subscriptionPlans = [
    {
        name: "Essential Box",
        price: 29.99,
        items: "5-7 items",
        description: "Perfect for individuals or small families",
        features: ["Seasonal vegetables", "Local fruits", "Recipe cards"]
    },
    {
        name: "Family Box",
        price: 49.99,
        items: "10-12 items",
        description: "Ideal for families of 3-4 people",
        features: ["Mixed vegetables", "Seasonal fruits", "Herbs", "Recipe cards", "Priority support"]
    },
    {
        name: "Premium Box",
        price: 79.99,
        items: "15-18 items",
        description: "For large families or produce enthusiasts",
        features: ["Premium vegetables", "Exotic fruits", "Herbs & spices", "Dairy products", "Recipe cards", "Free delivery"]
    }
]

export default function HomePage() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const { userId } = useAuth()


    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Navigation */}


            <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <Leaf className="h-8 w-8 text-green-600" />
                            <span className="text-2xl font-bold text-green-800">FarmFresh AI</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors">
                                Marketplace
                            </Link>
                            <Link href="/subscription" className="text-gray-700 hover:text-green-600 transition-colors">
                                Subscription
                            </Link>
                            <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors">
                                About
                            </Link>
                            <Link href="/bot" className="text-gray-700 hover:text-green-600 transition-colors flex gap-1">
                                Farm Bot <Bot />
                            </Link>

                            {!userId ?
                                <>
                                    <Link href={'/sign-in'} className="border-green-600 text-green-600 hover:bg-green-50">
                                        Sign In
                                    </Link>
                                    <Button asChild className="bg-green-600 hover:bg-green-700">
                                        <Link href={'/sign-in'} className="border-green-600 text-green-600 hover:bg-green-50">
                                            Get Started
                                        </Link>
                                    </Button>
                                </> :
                                <UserButton />
                            }
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-green-600"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 space-y-4 flex flex-col items-start">
                            <Link href="/marketplace" className="text-gray-700 hover:text-green-600 w-full" onClick={() => setMobileMenuOpen(false)}>
                                Marketplace
                            </Link>
                            <Link href="/subscription" className="text-gray-700 hover:text-green-600 w-full" onClick={() => setMobileMenuOpen(false)}>
                                Subscription
                            </Link>
                            <Link href="/about" className="text-gray-700 hover:text-green-600 w-full" onClick={() => setMobileMenuOpen(false)}>
                                About
                            </Link>
                            {!userId ?
                                <>
                                    <Link href={'/sign-in'} className="border-green-600 text-green-600 hover:bg-green-50">
                                        Sign In
                                    </Link>
                                    <Button asChild className="bg-green-600 hover:bg-green-700">
                                        <Link href={'/sign-in'} className="border-green-600 text-green-600 hover:bg-green-50">
                                            Get Started
                                        </Link>
                                    </Button>
                                </> :
                                <UserButton />
                            }
                        </div>
                    )}
                </div>
            </nav>


            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
                        🤖 AI-Powered Fresh Produce Platform
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Fresh from the Farm,
                        <span className="text-green-600"> Straight to Your Door</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Connect directly with local farmers for the freshest produce. Get personalized subscription boxes
                        powered by AI, or shop our marketplace for immediate delivery.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                            <Link href="/marketplace">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Shop Marketplace
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" asChild>
                            <Link href="/subscription">
                                Start Subscription
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                        Why Choose FarmFresh AI?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-green-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Truck className="h-12 w-12 text-green-600 mb-4" />
                                <CardTitle className="text-green-800">Direct from Farmers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Cut out the middleman and get the freshest produce directly from local farms.
                                    Support your community while getting better prices.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Leaf className="h-12 w-12 text-green-600 mb-4" />
                                <CardTitle className="text-green-800">AI-Powered Personalization</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Our AI learns your preferences and dietary needs to curate perfect produce boxes
                                    tailored just for you.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-green-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Users className="h-12 w-12 text-green-600 mb-4" />
                                <CardTitle className="text-green-800">Community Focused</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Connect with local farmers, learn about sustainable practices, and build
                                    relationships with your food sources.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 px-4 bg-green-50">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-100" asChild>
                            <Link href="/marketplace">
                                View All Products
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredProducts.map((product) => (
                            <Card key={product.id} className="hover:shadow-lg transition-shadow bg-white">
                                <CardHeader className="p-0">
                                    <div className="relative">
                                        <Image
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            width={300}
                                            height={200}
                                            className="w-full h-48 object-cover rounded-t-lg"
                                        />
                                        <Badge className="absolute top-2 right-2 bg-green-600">
                                            In Stock
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg">{product.name}</h3>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-green-600 font-medium mb-2">{product.farmer}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-gray-900">
                                            ${product.price}
                                            <span className="text-sm text-gray-500">/{product.unit}</span>
                                        </span>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subscription Plans */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            AI-Curated Subscription Boxes
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Let our AI create the perfect produce box for you based on your preferences,
                            dietary needs, and seasonal availability.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {subscriptionPlans.map((plan, index) => (
                            <Card key={plan.name} className={`relative hover:shadow-lg transition-shadow ${index === 1 ? 'border-green-500 border-2' : 'border-green-200'
                                }`}>
                                {index === 1 && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                                        Most Popular
                                    </Badge>
                                )}
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl text-green-800">{plan.name}</CardTitle>
                                    <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                                        <span className="text-gray-600">/month</span>
                                    </div>
                                    <p className="text-green-600 font-medium">{plan.items}</p>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        className={`w-full ${index === 1
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                            }`}
                                        asChild
                                    >
                                        <Link href="/subscription">
                                            Choose Plan
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-green-600 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Experience Farm-Fresh Goodness?
                    </h2>
                    <p className="text-xl mb-8 text-green-100">
                        Join thousands of customers who trust FarmFresh AI for their produce needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50" asChild>
                            <Link href="/marketplace">
                                Start Shopping
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className=" border-green-600  hover:bg-white !text-green-600" asChild>
                            <Link href="/subscription">
                                Subscribe Now
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Leaf className="h-6 w-6 text-green-400" />
                                <span className="text-xl font-bold">FarmFresh AI</span>
                            </div>
                            <p className="text-gray-400">
                                Connecting farmers and consumers with AI-powered fresh produce solutions.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Marketplace</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/marketplace" className="hover:text-white">Browse Products</Link></li>
                                <li><Link href="/farmers" className="hover:text-white">Our Farmers</Link></li>
                                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Subscription</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/subscription" className="hover:text-white">Plans & Pricing</Link></li>
                                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                                <li><Link href="/customize" className="hover:text-white">Customize Box</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 FarmFresh AI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
