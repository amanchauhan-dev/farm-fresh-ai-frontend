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
        { name: "Organic Spinach", image: "/fresh-spinach.png", farmer: "Green Valley" },
        { name: "Fresh Carrots", image: "/bunch-of-carrots.png", farmer: "Root Farm" },
        { name: "Seasonal Apples", image: "/ripe-apples.png", farmer: "Orchard Hills" },
        { name: "Cherry Tomatoes", image: "/ripe-cherry-tomatoes.png", farmer: "Sunny Acres" },
        { name: "Mixed Greens", image: "/mixed-greens.png", farmer: "Leaf & Stem" }
    ],
    family: [
        { name: "Organic Broccoli", image: "/fresh-broccoli.png", farmer: "Green Valley" },
        { name: "Sweet Potatoes", image: "/roasted-sweet-potatoes.png", farmer: "Root Farm" },
        { name: "Seasonal Berries", image: "/mixed-berries.png", farmer: "Berry Bliss" },
        { name: "Bell Peppers", image: "/colorful-bell-peppers.png", farmer: "Sunny Acres" },
        { name: "Fresh Herbs", image: "/fresh-herbs.png", farmer: "Herb Haven" },
        { name: "Zucchini", image: "/single-zucchini.png", farmer: "Garden Grove" }
    ],
    premium: [
        { name: "Heirloom Tomatoes", image: "/heirloom-tomatoes.png", farmer: "Heritage Farm" },
        { name: "Exotic Mushrooms", image: "/exotic-mushrooms.png", farmer: "Forest Floor" },
        { name: "Dragon Fruit", image: "/vibrant-dragon-fruit.png", farmer: "Tropical Grove" },
        { name: "Artisan Cheese", image: "/artisan-cheese.png", farmer: "Mountain Dairy" },
        { name: "Microgreens", image: "/vibrant-microgreens.png", farmer: "Micro Farm" },
        { name: "Organic Honey", image: "/golden-honey-jar.png", farmer: "Bee Happy" }
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
                            <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                            <span className="text-lg md:text-2xl font-bold text-green-800">FarmFresh AI</span>
                        </Link>
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <Link href="/marketplace" className="text-gray-700 hover:text-green-600 text-sm md:text-base">
                                Marketplace
                            </Link>
                            <Button variant="outline" className="border-green-600 text-green-600 text-sm md:text-base px-3 md:px-4">
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-6 md:py-12">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <Badge className="mb-4 bg-green-100 text-green-800 text-xs md:text-sm">
                        <Bot className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                        AI-Powered Personalization
                    </Badge>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                        Fresh Produce Subscription Boxes
                    </h1>
                    <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Let our AI curate the perfect produce box based on your preferences, dietary needs,
                        and seasonal availability. Fresh from local farms, delivered to your door.
                    </p>
                </div>

                <Tabs defaultValue="plans" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 h-auto">
                        <TabsTrigger value="plans" className="text-xs md:text-sm py-2 md:py-3">Choose Plan</TabsTrigger>
                        <TabsTrigger value="customize" className="text-xs md:text-sm py-2 md:py-3">Customize</TabsTrigger>
                        <TabsTrigger value="preview" className="text-xs md:text-sm py-2 md:py-3">Preview & Subscribe</TabsTrigger>
                    </TabsList>

                    {/* Plan Selection */}
                    <TabsContent value="plans" className="space-y-6 md:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
                                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-xs">
                                            Most Popular
                                        </Badge>
                                    )}
                                    <CardHeader className="text-center p-4 md:p-6">
                                        <CardTitle className="text-xl md:text-2xl text-green-800">{plan.name}</CardTitle>
                                        <CardDescription className="text-gray-600 text-sm md:text-base">{plan.description}</CardDescription>
                                        <div className="mt-4">
                                            <span className="text-3xl md:text-4xl font-bold text-gray-900">${plan.price}</span>
                                            <span className="text-gray-600 text-sm md:text-base">/month</span>
                                        </div>
                                        <p className="text-green-600 font-medium text-sm md:text-base">{plan.items}</p>
                                    </CardHeader>
                                    <CardContent className="p-4 md:p-6 pt-0">
                                        <ul className="space-y-2 md:space-y-3">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center">
                                                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Delivery Frequency */}
                        <Card>
                            <CardHeader className="p-4 md:p-6">
                                <CardTitle className="flex items-center text-lg md:text-xl">
                                    <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
                                    Delivery Frequency
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 md:p-6 pt-0">
                                <RadioGroup value={frequency} onValueChange={setFrequency}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                        <div className="flex items-center space-x-2 p-3 md:p-4 border rounded-lg">
                                            <RadioGroupItem value="weekly" id="weekly" />
                                            <Label htmlFor="weekly" className="flex-1">
                                                <div className="font-medium text-sm md:text-base">Weekly</div>
                                                <div className="text-xs md:text-sm text-gray-600">Every week</div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 p-3 md:p-4 border rounded-lg">
                                            <RadioGroupItem value="biweekly" id="biweekly" />
                                            <Label htmlFor="biweekly" className="flex-1">
                                                <div className="font-medium text-sm md:text-base">Bi-weekly</div>
                                                <div className="text-xs md:text-sm text-gray-600">Every 2 weeks</div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 p-3 md:p-4 border rounded-lg">
                                            <RadioGroupItem value="monthly" id="monthly" />
                                            <Label htmlFor="monthly" className="flex-1">
                                                <div className="font-medium text-sm md:text-base">Monthly</div>
                                                <div className="text-xs md:text-sm text-gray-600">Once a month</div>
                                            </Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Customization */}
                    <TabsContent value="customize" className="space-y-6 md:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Family Size */}
                            <Card>
                                <CardHeader className="p-4 md:p-6">
                                    <CardTitle className="flex items-center text-lg md:text-xl">
                                        <Users className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
                                        Family Size
                                    </CardTitle>
                                    <CardDescription className="text-sm md:text-base">
                                        Help us determine the right portion sizes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 md:p-6 pt-0">
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-xs md:text-sm">
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
                                        <p className="text-center font-medium text-sm md:text-base">
                                            {familySize[0]} {familySize[0] === 1 ? 'person' : 'people'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Dietary Preferences */}
                            <Card>
                                <CardHeader className="p-4 md:p-6">
                                    <CardTitle className="flex items-center text-lg md:text-xl">
                                        <Leaf className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
                                        Dietary Preferences
                                    </CardTitle>
                                    <CardDescription className="text-sm md:text-base">
                                        Select all that apply to your household
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 md:p-6 pt-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {dietaryPreferences.map((preference) => (
                                            <div key={preference} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={preference}
                                                    checked={selectedDietary.includes(preference)}
                                                    onCheckedChange={(checked) =>
                                                        handleDietaryChange(preference, checked as boolean)
                                                    }
                                                />
                                                <Label htmlFor={preference} className="text-xs md:text-sm">
                                                    {preference}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Allergies */}
                            <Card>
                                <CardHeader className="p-4 md:p-6">
                                    <CardTitle className="text-lg md:text-xl">Allergies & Restrictions</CardTitle>
                                    <CardDescription className="text-sm md:text-base">
                                        We&apos;ll make sure to avoid these items
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 md:p-6 pt-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {allergies.map((allergy) => (
                                            <div key={allergy} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={allergy}
                                                    checked={selectedAllergies.includes(allergy)}
                                                    onCheckedChange={(checked) =>
                                                        handleAllergyChange(allergy, checked as boolean)
                                                    }
                                                />
                                                <Label htmlFor={allergy} className="text-xs md:text-sm">
                                                    {allergy}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* AI Insights */}
                            <Card className="bg-green-50 border-green-200">
                                <CardHeader className="p-4 md:p-6">
                                    <CardTitle className="flex items-center text-green-800 text-lg md:text-xl">
                                        <Bot className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                                        AI Recommendations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 md:p-6 pt-0">
                                    <div className="space-y-3 text-xs md:text-sm">
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>Based on your family size, we recommend the {currentPlan?.name}</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>Your preferences suggest you&apos;d enjoy seasonal root vegetables</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>We&apos;ll include extra leafy greens for your dietary goals</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Preview & Subscribe */}
                    <TabsContent value="preview" className="space-y-6 md:space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                            {/* Order Summary */}
                            <Card>
                                <CardHeader className="p-4 md:p-6">
                                    <CardTitle className="text-lg md:text-xl">Your Subscription Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-medium text-sm md:text-base">Plan</span>
                                        <span className="text-sm md:text-base">{currentPlan?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-medium text-sm md:text-base">Frequency</span>
                                        <span className="capitalize text-sm md:text-base">{frequency}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-medium text-sm md:text-base">Family Size</span>
                                        <span className="text-sm md:text-base">{familySize[0]} {familySize[0] === 1 ? 'person' : 'people'}</span>
                                    </div>
                                    <div className="flex justify-between items-start py-2 border-b">
                                        <span className="font-medium text-sm md:text-base">Dietary Preferences</span>
                                        <span className="text-right text-xs md:text-sm max-w-[50%]">
                                            {selectedDietary.length > 0 ? selectedDietary.join(', ') : 'None'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start py-2 border-b">
                                        <span className="font-medium text-sm md:text-base">Allergies</span>
                                        <span className="text-right text-xs md:text-sm max-w-[50%]">
                                            {selectedAllergies.length > 0 ? selectedAllergies.join(', ') : 'None'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-4 text-base md:text-lg font-bold">
                                        <span>Total per delivery</span>
                                        <span>${currentPlan?.price}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Sample Box Preview */}
                            <Card>
                                <CardHeader className="p-4 md:p-6">
                                    <CardTitle className="text-lg md:text-xl">Sample Box Contents</CardTitle>
                                    <CardDescription className="text-sm md:text-base">
                                        Here&apos;s what you might receive in your next box
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 md:p-6 pt-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                        {currentSample?.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-2 md:p-3 rounded-lg bg-gray-50">
                                                <Image
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8 md:w-10 md:h-10 rounded-md flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs md:text-sm font-medium truncate">{item.name}</p>
                                                    <p className="text-xs text-gray-500">{item.farmer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                        <p className="text-xs md:text-sm text-green-800">
                                            <Bot className="h-3 w-3 md:h-4 md:w-4 inline mr-1" />
                                            Contents vary based on seasonal availability and your preferences
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Subscribe Button */}
                        <div className="text-center">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 px-6 md:px-8 w-full sm:w-auto">
                                <span className="text-sm md:text-base">Subscribe Now - ${currentPlan?.price}/month</span>
                                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                            <p className="text-xs md:text-sm text-gray-600 mt-2">
                                Cancel anytime • Skip deliveries • Modify preferences
                            </p>
                        </div>
                    </TabsContent>

                    {/* Benefits Section */}
                    <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="text-center">
                            <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-base md:text-lg mb-2">Fresh Delivery</h3>
                            <p className="text-gray-600 text-sm md:text-base">
                                Delivered fresh from local farms within 24-48 hours of harvest
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bot className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-base md:text-lg mb-2">AI Personalization</h3>
                            <p className="text-gray-600 text-sm md:text-base">
                                Smart recommendations that learn and adapt to your preferences
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-base md:text-lg mb-2">Quality Guaranteed</h3>
                            <p className="text-gray-600 text-sm md:text-base">
                                100% satisfaction guarantee or we&apos;ll make it right
                            </p>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}
