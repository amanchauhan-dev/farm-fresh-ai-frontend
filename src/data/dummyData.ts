export interface Product {
    id: string;
    name: string;
    price: number;
    unit: string;
    category: string;
    farmer: {
        name: string;
        location: string;
        rating: number;
    };
    image: string;
    description: string;
    inStock: boolean;
    organic: boolean;
    quantity?: number;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    description: string;
    frequency: 'weekly' | 'bi-weekly' | 'monthly';
    items: string[];
    popular?: boolean;
}

export const dummyProducts: Product[] = [
    {
        id: '1',
        name: 'Organic Roma Tomatoes',
        price: 4.99,
        unit: 'lb',
        category: 'Vegetables',
        farmer: {
            name: 'Green Valley Farm',
            location: 'Sonoma County, CA',
            rating: 4.8
        },
        image: '/placeholder.svg',
        description: 'Fresh, vine-ripened organic Roma tomatoes perfect for sauces and cooking.',
        inStock: true,
        organic: true,
        quantity: 50
    },
    {
        id: '2',
        name: 'Baby Spinach',
        price: 3.49,
        unit: 'bunch',
        category: 'Leafy Greens',
        farmer: {
            name: 'Sunshine Organics',
            location: 'Salinas Valley, CA',
            rating: 4.9
        },
        image: '/placeholder.svg',
        description: 'Tender baby spinach leaves, perfect for salads and smoothies.',
        inStock: true,
        organic: true,
        quantity: 75
    },
    {
        id: '3',
        name: 'Honeycrisp Apples',
        price: 5.99,
        unit: 'lb',
        category: 'Fruits',
        farmer: {
            name: 'Mountain View Orchards',
            location: 'Watsonville, CA',
            rating: 4.7
        },
        image: '/placeholder.svg',
        description: 'Crisp, sweet Honeycrisp apples grown in the coastal mountains.',
        inStock: true,
        organic: false,
        quantity: 100
    },
    {
        id: '4',
        name: 'Fresh Basil',
        price: 2.99,
        unit: 'bunch',
        category: 'Herbs',
        farmer: {
            name: 'Herb Heaven',
            location: 'Half Moon Bay, CA',
            rating: 4.6
        },
        image: '/placeholder.svg',
        description: 'Aromatic fresh basil perfect for Italian dishes and pesto.',
        inStock: true,
        organic: true,
        quantity: 30
    },
    {
        id: '5',
        name: 'Rainbow Carrots',
        price: 3.99,
        unit: 'bunch',
        category: 'Vegetables',
        farmer: {
            name: 'Earth & Sky Farm',
            location: 'Pescadero, CA',
            rating: 4.8
        },
        image: '/placeholder.svg',
        description: 'Colorful heirloom carrots in purple, orange, and yellow varieties.',
        inStock: true,
        organic: true,
        quantity: 25
    },
    {
        id: '6',
        name: 'Farm Fresh Eggs',
        price: 6.99,
        unit: 'dozen',
        category: 'Dairy & Eggs',
        farmer: {
            name: 'Happy Hens Farm',
            location: 'Petaluma, CA',
            rating: 4.9
        },
        image: '/placeholder.svg',
        description: 'Free-range eggs from pasture-raised hens.',
        inStock: true,
        organic: true,
        quantity: 40
    },
    {
        id: '7',
        name: 'Mixed Berry Medley',
        price: 8.99,
        unit: 'pint',
        category: 'Fruits',
        farmer: {
            name: 'Berry Best Farm',
            location: 'Santa Cruz, CA',
            rating: 4.7
        },
        image: '/placeholder.svg',
        description: 'Fresh strawberries, blueberries, and raspberries.',
        inStock: true,
        organic: true,
        quantity: 20
    },
    {
        id: '8',
        name: 'Butternut Squash',
        price: 2.49,
        unit: 'lb',
        category: 'Vegetables',
        farmer: {
            name: 'Harvest Moon Farm',
            location: 'Gilroy, CA',
            rating: 4.5
        },
        image: '/placeholder.svg',
        description: 'Sweet, nutty butternut squash perfect for soups and roasting.',
        inStock: true,
        organic: false,
        quantity: 60
    }
];

export const subscriptionPlans: SubscriptionPlan[] = [
    {
        id: 'small',
        name: 'Small Family Box',
        price: 29.99,
        description: 'Perfect for 1-2 people',
        frequency: 'weekly',
        items: ['5-7 seasonal vegetables', '2-3 fresh fruits', '1 herb bundle', 'Recipe suggestions']
    },
    {
        id: 'medium',
        name: 'Family Box',
        price: 49.99,
        description: 'Great for 3-4 people',
        frequency: 'weekly',
        items: ['8-10 seasonal vegetables', '4-5 fresh fruits', '2 herb bundles', 'Recipe suggestions', 'Seasonal specialty item'],
        popular: true
    },
    {
        id: 'large',
        name: 'Large Family Box',
        price: 69.99,
        description: 'Ideal for 5+ people',
        frequency: 'weekly',
        items: ['12-15 seasonal vegetables', '6-8 fresh fruits', '3 herb bundles', 'Recipe suggestions', '2 seasonal specialty items', 'Free-range eggs']
    }
];

export const categories = [
    'All',
    'Vegetables',
    'Fruits',
    'Leafy Greens',
    'Herbs',
    'Dairy & Eggs'
];

export const testimonials = [
    {
        id: '1',
        name: 'Sarah Chen',
        role: 'Home Chef',
        content: 'FarmFresh AI has transformed how I cook. The AI recommendations always surprise me with perfect seasonal combinations!',
        rating: 5
    },
    {
        id: '2',
        name: 'Miguel Rodriguez',
        role: 'Restaurant Owner',
        content: 'As a restaurant owner, having direct access to local farmers has improved our menu quality and reduced costs significantly.',
        rating: 5
    },
    {
        id: '3',
        name: 'Emma Thompson',
        role: 'Busy Parent',
        content: 'The subscription box saves me so much time, and my kids are actually excited to try new vegetables!',
        rating: 5
    }
];