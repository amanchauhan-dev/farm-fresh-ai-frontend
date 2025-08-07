"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Truck, Shield, ShoppingCart, Plus, Minus, MessageCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

// Dummy product data
const productData = {
    1: {
        id: 1,
        name: "Organic Tomatoes",
        farmer: "Green Valley Farm",
        location: "Sonoma County, California",
        price: 4.99,
        unit: "lb",
        images: [
            "/organic-tomatoes-on-vine.png",
            "/organic-tomato-harvest.png",
            "/tomato-farm-greenhouse.png"
        ],
        rating: 4.8,
        reviews: 124,
        category: "Vegetables",
        inStock: true,
        organic: true,
        description: "Our vine-ripened organic tomatoes are grown using sustainable farming practices in the heart of Sonoma County. These tomatoes are picked at peak ripeness to ensure maximum flavor and nutritional value. Perfect for salads, cooking, or eating fresh.",
        nutritionFacts: {
            calories: 18,
            protein: "0.9g",
            carbs: "3.9g",
            fiber: "1.2g",
            sugar: "2.6g",
            fat: "0.2g"
        },
        farmInfo: {
            name: "Green Valley Farm",
            established: "1985",
            size: "150 acres",
            practices: ["Organic Certified", "Sustainable Farming", "Water Conservation"],
            description: "Family-owned farm committed to sustainable agriculture and providing the freshest produce to our community."
        },
        customerReviews: [
            {
                id: 1,
                user: "Sarah M.",
                rating: 5,
                date: "2024-01-15",
                comment: "Best tomatoes I've ever had! So fresh and flavorful. Will definitely order again.",
                verified: true
            },
            {
                id: 2,
                user: "Mike R.",
                rating: 4,
                date: "2024-01-10",
                comment: "Great quality tomatoes. Arrived fresh and well-packaged. Slight delay in delivery but worth the wait.",
                verified: true
            },
            {
                id: 3,
                user: "Lisa K.",
                rating: 5,
                date: "2024-01-08",
                comment: "Amazing taste! You can really tell the difference with organic. My family loves them.",
                verified: true
            }
        ]
    }
}

export default function ProductPage() {
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isWishlisted, setIsWishlisted] = useState(false)

    const product = productData[1] // Using product 1 as default since we only have one detailed product

    if (!product) {
        return <div>Product not found</div>
    }

    const averageRating = product.customerReviews.reduce((acc, review) => acc + review.rating, 0) / product.customerReviews.length

    return (
        <div className="min-h-screen bg-gray-50">
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

            <div className="container mx-auto px-4 py-4 md:py-8">
                <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-lg overflow-hidden bg-white">
                            <Image
                                src={product.images[selectedImage] || "/placeholder.svg"}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            {product.images.map((image, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-green-500' : 'border-gray-200'
                                        }`}
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`${product.name} ${index + 1}`}
                                        width={150}
                                        height={150}
                                        className="w-full h-full object-cover"
                                    />
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                {product.organic && (
                                    <Badge className="bg-green-600 text-white text-xs">Organic</Badge>
                                )}
                                <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                                    {product.category}
                                </Badge>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 md:h-5 md:w-5 ${i < Math.floor(product.rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-xs md:text-sm text-gray-600">
                                        {product.rating} ({product.customerReviews.length} reviews)
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center text-green-600 font-medium mb-4">
                                <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                                <span className="text-sm md:text-base">{product.farmer}, {product.location}</span>
                            </div>
                        </div>

                        <div className="border-t border-b py-4 md:py-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                                    ${product.price}
                                    <span className="text-base md:text-lg text-gray-500">/{product.unit}</span>
                                </span>
                                <div className="flex items-center space-x-2">
                                    <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                                    <span className="text-xs md:text-sm text-green-600">Quality Guaranteed</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                                <div className="flex items-center border rounded-lg w-fit">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-10 w-10 p-0"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="px-4 py-2 font-medium">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-10 w-10 p-0"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <span className="text-sm text-gray-600">
                                    Total: ${(product.price * quantity).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                <Button className="flex-1 bg-green-600 hover:bg-green-700" size="lg">
                                    <ShoppingCart className="h-4 w-4 md:h-6 md:w-5 mr-2 p-5" />
                                    <h1 className="text-center">Add to Cart</h1>
                                </Button>
                                <div className="flex space-x-2 sm:space-x-4">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`flex-1 sm:flex-none ${isWishlisted ? 'border-red-500 text-red-500' : ''}`}
                                    >
                                        <ShoppingCart className={`h-4 w-4 md:h-5 md:w-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                                    </Button>
                                    <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                                        <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 md:space-y-4">
                            <div className="flex items-center space-x-4 text-xs md:text-sm">
                                <div className="flex items-center">
                                    <Truck className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                                    <span>Free delivery on orders over $50</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 text-xs md:text-sm">
                                <div className="flex items-center">
                                    <Shield className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                                    <span>100% satisfaction guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Information Tabs */}
                <div className="mt-8 md:mt-16">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                            <TabsTrigger value="description" className="text-xs md:text-sm py-2">Description</TabsTrigger>
                            <TabsTrigger value="nutrition" className="text-xs md:text-sm py-2">Nutrition</TabsTrigger>
                            <TabsTrigger value="farm" className="text-xs md:text-sm py-2">Farm Info</TabsTrigger>
                            <TabsTrigger value="reviews" className="text-xs md:text-sm py-2">Reviews ({product.customerReviews.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="nutrition" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg md:text-xl">Nutrition Facts</CardTitle>
                                    <p className="text-xs md:text-sm text-gray-600">Per 100g serving</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                        <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                                            <div className="text-xl md:text-2xl font-bold text-green-600">{product.nutritionFacts.calories}</div>
                                            <div className="text-xs md:text-sm text-gray-600">Calories</div>
                                        </div>
                                        <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                                            <div className="text-xl md:text-2xl font-bold text-green-600">{product.nutritionFacts.protein}</div>
                                            <div className="text-xs md:text-sm text-gray-600">Protein</div>
                                        </div>
                                        <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                                            <div className="text-xl md:text-2xl font-bold text-green-600">{product.nutritionFacts.carbs}</div>
                                            <div className="text-xs md:text-sm text-gray-600">Carbs</div>
                                        </div>
                                        <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                                            <div className="text-xl md:text-2xl font-bold text-green-600">{product.nutritionFacts.fiber}</div>
                                            <div className="text-xs md:text-sm text-gray-600">Fiber</div>
                                        </div>
                                        <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                                            <div className="text-xl md:text-2xl font-bold text-green-600">{product.nutritionFacts.sugar}</div>
                                            <div className="text-xs md:text-sm text-gray-600">Sugar</div>
                                        </div>
                                        <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                                            <div className="text-xl md:text-2xl font-bold text-green-600">{product.nutritionFacts.fat}</div>
                                            <div className="text-xs md:text-sm text-gray-600">Fat</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="farm" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                                        <Avatar className="h-12 w-12 sm:mr-4">
                                            <AvatarImage src="/farm-logo.png" />
                                            <AvatarFallback>GV</AvatarFallback>
                                        </Avatar>
                                        <span className="text-lg md:text-xl">{product.farmInfo.name}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm md:text-base text-gray-700">{product.farmInfo.description}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-sm md:text-base">Established</h4>
                                            <p className="text-gray-600 text-sm md:text-base">{product.farmInfo.established}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-sm md:text-base">Farm Size</h4>
                                            <p className="text-gray-600 text-sm md:text-base">{product.farmInfo.size}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-sm md:text-base">Location</h4>
                                            <p className="text-gray-600 text-sm md:text-base">{product.location}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2 text-sm md:text-base">Farming Practices</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {product.farmInfo.practices.map((practice, index) => (
                                                <Badge key={index} variant="outline" className="text-green-600 border-green-600 text-xs">
                                                    {practice}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reviews" className="mt-6">
                            <div className="space-y-4 md:space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg md:text-xl">Customer Reviews</CardTitle>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 md:h-5 md:w-5 ${i < Math.floor(averageRating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                                <span className="ml-2 font-medium text-sm md:text-base">{averageRating.toFixed(1)}</span>
                                            </div>
                                            <span className="text-gray-600 text-xs md:text-sm">Based on {product.customerReviews.length} reviews</span>
                                        </div>
                                    </CardHeader>
                                </Card>

                                {product.customerReviews.map((review) => (
                                    <Card key={review.id}>
                                        <CardContent className="pt-4 md:pt-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                                                        <AvatarFallback className="text-xs md:text-sm">{review.user.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                                                            <span className="font-medium text-sm md:text-base truncate">{review.user}</span>
                                                            {review.verified && (
                                                                <Badge variant="outline" className="text-xs w-fit">Verified Purchase</Badge>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                                                            <div className="flex">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-3 w-3 md:h-4 md:w-4 ${i < review.rating
                                                                            ? 'fill-yellow-400 text-yellow-400'
                                                                            : 'text-gray-300'
                                                                            }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-xs md:text-sm text-gray-600">{review.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">{review.comment}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
