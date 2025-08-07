"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, MapPin, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const categories = ["All", "Vegetables", "Fruits", "Dairy & Eggs", "Herbs"]

type Product = {
    id: number
    name: string
    category: string
    price: number
    inStock: boolean
    image: string
    description: string
    farmer: string
}

export default function MarketplacePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [inStockOnly, setInStockOnly] = useState(false)
    const [sortBy, setSortBy] = useState("rating") // fake field, fallback to name or price

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://farm-fresh-backend-nmah.onrender.com/api/products/")
                if (!res.ok) throw new Error("Failed to fetch products")

                const data = await res.json()
                console.log(data);

                const mapped = data.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    category: p.category,
                    price: parseFloat(p.price),
                    inStock: p.quantity > 0,
                    image: p.image,
                    description: p.description,
                    farmer: `Farmer #${p.farmer}`
                }))

                setProducts(mapped)
            } catch {
                setError("Failed to load products.")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase()
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
        const matchesStock = !inStockOnly || product.inStock

        return matchesSearch && matchesCategory && matchesPrice && matchesStock
    }).sort((a, b) => {
        switch (sortBy) {
            case "price-low": return a.price - b.price
            case "price-high": return b.price - a.price
            case "name": return a.name.localeCompare(b.name)
            default: return 0
        }
    })

    return (
        <div className="min-h-screen bg-gray-50">
            {/* NAVBAR */}
            <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">F</span>
                        </div>
                        <span className="text-xl font-bold text-green-800">FarmFresh AI</span>
                    </Link>
                    <Link href='/cart'>
                        <Button variant="ghost" size="sm">
                            <ShoppingCart className="h-4 w-4 mr-2" /> Cart (0)
                        </Button>
                    </Link>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* FILTER SIDEBAR */}
                    <aside className="lg:w-1/4 w-full">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <Filter className="h-5 w-5 text-green-600" />
                                    <h2 className="text-lg font-semibold">Filters</h2>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
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

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Category</label>
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Price Range: Rs{priceRange[0]} - Rs{priceRange[1]}
                                    </label>
                                    <Slider
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        max={1000}
                                        min={0}
                                        step={10}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="instock" checked={inStockOnly} onCheckedChange={v => setInStockOnly(v === true)} />
                                        <label htmlFor="instock" className="text-sm">In Stock Only</label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* MAIN PRODUCT GRID */}
                    <main className="lg:w-3/4 w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Fresh Produce Marketplace
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({filteredProducts.length} products)
                                </span>
                            </h1>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="name">Name: A to Z</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Loading/Error */}
                        {loading && <p className="text-gray-500">Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Card key={product.id} className="hover:shadow-lg transition-shadow bg-white">
                                    <CardHeader className="p-0">
                                        <div className="relative">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={300}
                                                height={250}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <div className="absolute top-2 left-2">
                                                {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                                            >
                                                <ShoppingCart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                        <div className="text-green-600 text-sm flex items-center mb-2">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span>{product.farmer}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-gray-900">
                                                ${product.price}
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

                        {filteredProducts.length === 0 && !loading && (
                            <div className="text-center py-12">
                                <Search className="h-12 w-12 mx-auto text-gray-400" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
