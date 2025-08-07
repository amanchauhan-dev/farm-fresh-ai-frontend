"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Star, MapPin, ShoppingCart, Heart } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

// Dummy data for products
const products = [
    {
        id: 1,
        name: "Organic Tomatoes",
        farmer: "Green Valley Farm",
        location: "California",
        price: 4.99,
        unit: "lb",
        image: "/placeholder.svg?key=2pfqu",
        rating: 4.8,
        reviews: 124,
        category: "Vegetables",
        inStock: true,
        organic: true,
        description: "Vine-ripened organic tomatoes, perfect for salads and cooking."
    },
    {
        id: 2,
        name: "Fresh Spinach",
        farmer: "Sunny Acres",
        location: "Oregon",
        price: 3.49,
        unit: "bunch",
        image: "/placeholder.svg?key=pt9mk",
        rating: 4.9,
        reviews: 89,
        category: "Vegetables",
        inStock: true,
        organic: true,
        description: "Crisp, fresh spinach leaves packed with nutrients."
    },
    {
        id: 3,
        name: "Farm Eggs",
        farmer: "Happy Hen Farm",
        location: "Vermont",
        price: 6.99,
        unit: "dozen",
        image: "/placeholder.svg?key=l0h08",
        rating: 4.7,
        reviews: 156,
        category: "Dairy & Eggs",
        inStock: true,
        organic: false,
        description: "Free-range eggs from happy, healthy hens."
    },
    {
        id: 4,
        name: "Organic Carrots",
        farmer: "Root & Branch Farm",
        location: "Washington",
        price: 2.99,
        unit: "lb",
        image: "/placeholder.svg?key=c52ru",
        rating: 4.6,
        reviews: 78,
        category: "Vegetables",
        inStock: true,
        organic: true,
        description: "Sweet, crunchy organic carrots perfect for snacking."
    },
    {
        id: 5,
        name: "Fresh Strawberries",
        farmer: "Berry Bliss Farm",
        location: "California",
        price: 5.99,
        unit: "pint",
        image: "/placeholder.svg?key=a0e4a",
        rating: 4.9,
        reviews: 203,
        category: "Fruits",
        inStock: true,
        organic: true,
        description: "Juicy, sweet strawberries picked at peak ripeness."
    },
    {
        id: 6,
        name: "Artisan Cheese",
        farmer: "Mountain View Dairy",
        location: "Wisconsin",
        price: 12.99,
        unit: "8oz",
        image: "/placeholder.svg?key=ti2yy",
        rating: 4.8,
        reviews: 67,
        category: "Dairy & Eggs",
        inStock: false,
        organic: false,
        description: "Handcrafted artisan cheese made from grass-fed cows."
    },
    {
        id: 7,
        name: "Organic Apples",
        farmer: "Orchard Hills",
        location: "New York",
        price: 3.99,
        unit: "lb",
        image: "/placeholder.svg?key=dn8v3",
        rating: 4.7,
        reviews: 145,
        category: "Fruits",
        inStock: true,
        organic: true,
        description: "Crisp, sweet organic apples from heritage trees."
    },
    {
        id: 8,
        name: "Fresh Herbs Mix",
        farmer: "Herb Haven",
        location: "Colorado",
        price: 4.49,
        unit: "pack",
        image: "/placeholder.svg?key=tds6d",
        rating: 4.5,
        reviews: 92,
        category: "Herbs",
        inStock: true,
        organic: true,
        description: "Fresh herb mix including basil, parsley, and cilantro."
    }
]

const categories = ["All", "Vegetables", "Fruits", "Dairy & Eggs", "Herbs"]
const locations = ["All Locations", "California", "Oregon", "Vermont", "Washington", "Wisconsin", "New York", "Colorado"]

export default function MarketplacePage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedLocation, setSelectedLocation] = useState("All Locations")
    const [priceRange, setPriceRange] = useState([0, 20])
    const [organicOnly, setOrganicOnly] = useState(false)
    const [inStockOnly, setInStockOnly] = useState(false)
    const [sortBy, setSortBy] = useState("rating")

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
        const matchesLocation = selectedLocation === "All Locations" || product.location === selectedLocation
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
        const matchesOrganic = !organicOnly || product.organic
        const matchesStock = !inStockOnly || product.inStock

        return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesOrganic && matchesStock
    }).sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price
            case "price-high":
                return b.price - a.price
            case "rating":
                return b.rating - a.rating
            case "name":
                return a.name.localeCompare(b.name)
            default:
                return 0
        }
    })

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
                            <span className="text-xl font-bold text-green-800">FarmFresh AI</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <Heart className="h-4 w-4 mr-2" />
                                Wishlist
                            </Button>
                            <Button variant="ghost" size="sm">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Cart (0)
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <Filter className="h-5 w-5 text-green-600" />
                                    <h2 className="text-lg font-semibold">Filters</h2>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Search */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Search</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search products or farmers..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Category</label>
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Location</label>
                                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locations.map(location => (
                                                <SelectItem key={location} value={location}>
                                                    {location}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                                    </label>
                                    <Slider
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        max={20}
                                        min={0}
                                        step={0.5}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Checkboxes */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="organic"
                                            checked={organicOnly}
                                            onCheckedChange={checked => setOrganicOnly(checked === true)}
                                        />
                                        <label htmlFor="organic" className="text-sm">Organic Only</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="instock"
                                            checked={inStockOnly}
                                            onCheckedChange={checked => setInStockOnly(checked === true)}
                                        />
                                        <label htmlFor="instock" className="text-sm">In Stock Only</label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:w-3/4">
                        {/* Sort and Results Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Fresh Produce Marketplace
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({filteredProducts.length} products)
                                </span>
                            </h1>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="name">Name: A to Z</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Products Grid */}
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Card key={product.id} className="hover:shadow-lg transition-shadow bg-white">
                                    <CardHeader className="p-0">
                                        <div className="relative">
                                            <Image
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                width={300}
                                                height={250}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                                                {product.organic && (
                                                    <Badge className="bg-green-600 text-white">Organic</Badge>
                                                )}
                                                {!product.inStock && (
                                                    <Badge variant="destructive">Out of Stock</Badge>
                                                )}
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                                            >
                                                <Heart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-lg">{product.name}</h3>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm text-gray-600 ml-1">
                                                    {product.rating} ({product.reviews})
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-green-600 font-medium mb-2">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{product.farmer}, {product.location}</span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-gray-900">
                                                ${product.price}
                                                <span className="text-sm text-gray-500">/{product.unit}</span>
                                            </span>
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700"
                                                disabled={!product.inStock}
                                                asChild
                                            >
                                                <Link href={`/product/${product.id}`}>
                                                    {product.inStock ? 'View Details' : 'Out of Stock'}
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <Search className="h-12 w-12 mx-auto" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
