"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { CheckCircle, Leaf, Truck, Calendar, Users, Star, ArrowRight, Bot } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

const subscriptionPlans = [
    {
        id: "essential",
        name: "Essential Box",
        price: 29.99,
        items: "5-7 items",
        description: "Perfect for individuals or small families",
        features: [
            "Seasonal vegetables",
            "Local fruits",
            "Recipe cards",
            "Basic customization",
            "Weekly or bi-weekly delivery"
        ],
        popular: false
    },
    {
        id: "family",
        name: "Family Box",
        price: 49.99,
        items: "10-12 items",
        description: "Ideal for families of 3-4 people",
        features: [
            "Mixed vegetables",
            "Seasonal fruits",
            "Fresh herbs",
            "Recipe cards",
            "Advanced customization",
            "Priority support",
            "Weekly delivery"
        ],
        popular: true
    },
    {
        id: "premium",
        name: "Premium Box",
        price: 79.99,
        items: "15-18 items",
        description: "For large families or produce enthusiasts",
        features: [
            "Premium vegetables",
            "Exotic fruits",
            "Herbs & spices",
            "Dairy products",
            "Artisan items",
            "Recipe cards",
            "Full customization",
            "Free delivery",
            "24/7 support"
        ],
        popular: false
    }
]

const sampleBoxContents = {
    essential: [
        { name: "Organic Spinach", image: "/placeholder.svg?key=yaf1m", farmer: "Green Valley" },
        { name: "Fresh Carrots", image: "/placeholder.svg?key=p7jx0", farmer: "Root Farm" },
        { name: "Seasonal Apples", image: "/placeholder.svg?key=iz5mz", farmer: "Orchard Hills" },
        { name: "Cherry Tomatoes", image: "/placeholder.svg?key=6vziz", farmer: "Sunny Acres" },
        { name: "Mixed Greens", image: "/placeholder.svg?key=8uz4j", farmer: "Leaf & Stem" }
    ],
    family: [
        { name: "Organic Broccoli", image: "/placeholder.svg?key=r0mod", farmer: "Green Valley" },
        { name: "Sweet Potatoes", image: "/placeholder.svg?key=34mz6", farmer: "Root Farm" },
        { name: "Seasonal Berries", image: "/placeholder.svg?key=j7o1l", farmer: "Berry Bliss" },
        { name: "Bell Peppers", image: "/placeholder.svg?key=s62ht", farmer: "Sunny Acres" },
        { name: "Fresh Herbs", image: "/placeholder.svg?key=g2mqv", farmer: "Herb Haven" },
        { name: "Zucchini", image: "/placeholder.svg?key=q30sd", farmer: "Garden Grove" }
    ],
    premium: [
        { name: "Heirloom Tomatoes", image: "/placeholder.svg?key=r3xxb", farmer: "Heritage Farm" },
        { name: "Exotic Mushrooms", image: "/placeholder.svg?key=rrhnf", farmer: "Forest Floor" },
        { name: "Dragon Fruit", image: "/placeholder.svg?key=pavjx", farmer: "Tropical Grove" },
        { name: "Artisan Cheese", image: "/placeholder.svg?key=5v676", farmer: "Mountain Dairy" },
        { name: "Microgreens", image: "/placeholder.svg?key=dlwl5", farmer: "Micro Farm" },
        { name: "Organic Honey", image: "/placeholder.svg?key=lnly3", farmer: "Bee Happy" }
    ]
}

const dietaryPreferences = [
    "Vegetarian", "Vegan", "Gluten-Free", "Keto-Friendly", "Low-Carb", "High-Protein"
]

const allergies = [
    "Nuts", "Dairy", "Soy", "Eggs", "Shellfish", "Wheat"
]

export default function SubscriptionPage() {
    const [selectedPlan, setSelectedPlan] = useState("family")
    const [frequency, setFrequency] = useState("weekly")
    const [selectedDietary, setSelectedDietary] = useState<string[]>([])
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([])
    const [familySize, setFamilySize] = useState([3])

    const handleDietaryChange = (preference: string, checked: boolean) => {
        if (checked) {
            setSelectedDietary([...selectedDietary, preference])
        } else {
            setSelectedDietary(selectedDietary.filter(p => p !== preference))
        }
    }

    const handleAllergyChange = (allergy: string, checked: boolean) => {
        if (checked) {
            setSelectedAllergies([...selectedAllergies, allergy])
        } else {
            setSelectedAllergies(selectedAllergies.filter(a => a !== allergy))
        }
    }

    const currentPlan = subscriptionPlans.find(plan => plan.id === selectedPlan)
    const currentSample = sampleBoxContents[selectedPlan as keyof typeof sampleBoxContents]

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <Leaf className="h-8 w-8 text-green-600" />
                            <span className="text-2xl font-bold text-green-800">FarmFresh AI</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link href="/marketplace" className="text-gray-700 hover:text-green-600">
                                Marketplace
                            </Link>
                            <Button variant="outline" className="border-green-600 text-green-600">
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-green-100 text-green-800">
                        <Bot className="h-4 w-4 mr-2" />
                        AI-Powered Personalization
                    </Badge>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Fresh Produce Subscription Boxes
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Let our AI curate the perfect produce box based on your preferences, dietary needs,
                        and seasonal availability. Fresh from local farms, delivered to your door.
                    </p>
                </div>

                <Tabs defaultValue="plans" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="plans">Choose Plan</TabsTrigger>
                        <TabsTrigger value="customize">Customize</TabsTrigger>
                        <TabsTrigger value="preview">Preview & Subscribe</TabsTrigger>
                    </TabsList>

                    {/* Plan Selection */}
                    <TabsContent value="plans" className="space-y-8">
                        <div className="grid md:grid-cols-3 gap-6">
                            {subscriptionPlans.map((plan) => (
                                <Card
                                    key={plan.id}
                                    className={`relative cursor-pointer transition-all hover:shadow-lg ${selectedPlan === plan.id
                                        ? 'border-green-500 border-2 shadow-lg'
                                        : plan.popular
                                            ? 'border-green-300 border-2'
                                            : 'border-gray-200'
                                        }`}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    {plan.popular && (
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
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center">
                                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Delivery Frequency */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="h-5 w-5 mr-2 text-green-600" />
                                    Delivery Frequency
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup value={frequency} onValueChange={setFrequency}>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                            <RadioGroupItem value="weekly" id="weekly" />
                                            <Label htmlFor="weekly" className="flex-1">
                                                <div className="font-medium">Weekly</div>
                                                <div className="text-sm text-gray-600">Every week</div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                            <RadioGroupItem value="biweekly" id="biweekly" />
                                            <Label htmlFor="biweekly" className="flex-1">
                                                <div className="font-medium">Bi-weekly</div>
                                                <div className="text-sm text-gray-600">Every 2 weeks</div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                                            <RadioGroupItem value="monthly" id="monthly" />
                                            <Label htmlFor="monthly" className="flex-1">
                                                <div className="font-medium">Monthly</div>
                                                <div className="text-sm text-gray-600">Once a month</div>
                                            </Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Customization */}
                    <TabsContent value="customize" className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Family Size */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Users className="h-5 w-5 mr-2 text-green-600" />
                                        Family Size
                                    </CardTitle>
                                    <CardDescription>
                                        Help us determine the right portion sizes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span>1 person</span>
                                            <span>8+ people</span>
                                        </div>
                                        <Slider
                                            value={familySize}
                                            onValueChange={setFamilySize}
                                            max={8}
                                            min={1}
                                            step={1}
                                            className="w-full"
                                        />
                                        <p className="text-center font-medium">
                                            {familySize[0]} {familySize[0] === 1 ? 'person' : 'people'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Dietary Preferences */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Leaf className="h-5 w-5 mr-2 text-green-600" />
                                        Dietary Preferences
                                    </CardTitle>
                                    <CardDescription>
                                        Select all that apply to your household
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-3">
                                        {dietaryPreferences.map((preference) => (
                                            <div key={preference} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={preference}
                                                    checked={selectedDietary.includes(preference)}
                                                    onCheckedChange={(checked) =>
                                                        handleDietaryChange(preference, checked as boolean)
                                                    }
                                                />
                                                <Label htmlFor={preference} className="text-sm">
                                                    {preference}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Allergies */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Allergies & Restrictions</CardTitle>
                                    <CardDescription>
                                        We&apos;ll make sure to avoid these items
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-3">
                                        {allergies.map((allergy) => (
                                            <div key={allergy} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={allergy}
                                                    checked={selectedAllergies.includes(allergy)}
                                                    onCheckedChange={(checked) =>
                                                        handleAllergyChange(allergy, checked as boolean)
                                                    }
                                                />
                                                <Label htmlFor={allergy} className="text-sm">
                                                    {allergy}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* AI Insights */}
                            <Card className="bg-green-50 border-green-200">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-green-800">
                                        <Bot className="h-5 w-5 mr-2" />
                                        AI Recommendations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                            <span>Based on your family size, we recommend the {currentPlan?.name}</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                            <span>Your preferences suggest you&apos;d enjoy seasonal root vegetables</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                            <span>We&apos;ll include extra leafy greens for your dietary goals</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Preview & Subscribe */}
                    <TabsContent value="preview" className="space-y-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Order Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Subscription Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-medium">Plan</span>
                                        <span>{currentPlan?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-medium">Frequency</span>
                                        <span className="capitalize">{frequency}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-medium">Family Size</span>
                                        <span>{familySize[0]} {familySize[0] === 1 ? 'person' : 'people'}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-medium">Dietary Preferences</span>
                                        <span className="text-right text-sm">
                                            {selectedDietary.length > 0 ? selectedDietary.join(', ') : 'None'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-medium">Allergies</span>
                                        <span className="text-right text-sm">
                                            {selectedAllergies.length > 0 ? selectedAllergies.join(', ') : 'None'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-4 text-lg font-bold">
                                        <span>Total per delivery</span>
                                        <span>${currentPlan?.price}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Sample Box Preview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sample Box Contents</CardTitle>
                                    <CardDescription>
                                        Here&apos;s what you might receive in your next box
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        {currentSample?.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                                                <Image
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-md"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                                    <p className="text-xs text-gray-500">{item.farmer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                        <p className="text-sm text-green-800">
                                            <Bot className="h-4 w-4 inline mr-1" />
                                            Contents vary based on seasonal availability and your preferences
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Subscribe Button */}
                        <div className="text-center">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                                Subscribe Now - ${currentPlan?.price}/month
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <p className="text-sm text-gray-600 mt-2">
                                Cancel anytime • Skip deliveries • Modify preferences
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Benefits Section */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Truck className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Fresh Delivery</h3>
                        <p className="text-gray-600">
                            Delivered fresh from local farms within 24-48 hours of harvest
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bot className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">AI Personalization</h3>
                        <p className="text-gray-600">
                            Smart recommendations that learn and adapt to your preferences
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
                        <p className="text-gray-600">
                            100% satisfaction guarantee or we&apos;ll make it right
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
