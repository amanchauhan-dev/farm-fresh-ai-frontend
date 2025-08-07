"use client"

import { useState } from "react"
import { BarChart3, Calendar, DollarSign, Package, ShoppingCart, TrendingUp, Users, Leaf, MessageSquare, Settings, Bell, Search, Filter, Download, Eye, ArrowUpRight, ArrowDownRight, Star, MapPin, Clock } from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Sample data
const revenueData = [
    { month: "Jan", revenue: 4200, orders: 45 },
    { month: "Feb", revenue: 5100, orders: 52 },
    { month: "Mar", revenue: 4800, orders: 48 },
    { month: "Apr", revenue: 6200, orders: 65 },
    { month: "May", revenue: 7500, orders: 78 },
    { month: "Jun", revenue: 8200, orders: 85 },
]

const popularProducts = [
    { name: "Organic Tomatoes", sales: 245, revenue: 1225, trend: "+12%" },
    { name: "Fresh Lettuce", sales: 189, revenue: 945, trend: "+8%" },
    { name: "Sweet Corn", sales: 156, revenue: 780, trend: "+15%" },
    { name: "Bell Peppers", sales: 134, revenue: 670, trend: "+5%" },
    { name: "Carrots", sales: 123, revenue: 615, trend: "-2%" },
]

const subscriptionData = [
    { type: "Weekly", count: 145, color: "#22c55e" },
    { type: "Bi-weekly", count: 89, color: "#3b82f6" },
    { type: "Monthly", count: 67, color: "#f59e0b" },
]

const recentOrders = [
    { id: "ORD-001", customer: "Green Valley Restaurant", items: "Tomatoes, Lettuce", amount: 125, status: "Delivered", time: "2 hours ago" },
    { id: "ORD-002", customer: "Sarah Johnson", items: "Weekly Box", amount: 45, status: "Processing", time: "4 hours ago" },
    { id: "ORD-003", customer: "Farm to Table Cafe", items: "Mixed Vegetables", amount: 89, status: "Shipped", time: "6 hours ago" },
    { id: "ORD-004", customer: "Mike Chen", items: "Organic Produce Box", amount: 67, status: "Delivered", time: "1 day ago" },
]

const demandForecast = [
    { product: "Tomatoes", currentWeek: 85, nextWeek: 92, trend: "up" },
    { product: "Lettuce", currentWeek: 67, nextWeek: 71, trend: "up" },
    { product: "Corn", currentWeek: 45, nextWeek: 38, trend: "down" },
    { product: "Peppers", currentWeek: 56, nextWeek: 62, trend: "up" },
]

function AppSidebar() {
    const menuItems = [
        { title: "Overview", icon: BarChart3, href: "#" },
        { title: "Orders", icon: ShoppingCart, href: "#" },
        { title: "Products", icon: Package, href: "#" },
        { title: "Customers", icon: Users, href: "#" },
        { title: "Analytics", icon: TrendingUp, href: "#" },
        { title: "Subscriptions", icon: Calendar, href: "#" },
        { title: "Messages", icon: MessageSquare, href: "#" },
        { title: "AI Insights", icon: Leaf, href: "#" },
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
                        <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold">FarmFresh AI</p>
                        <p className="text-xs text-muted-foreground">Farmer Dashboard</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="/diverse-farmers-harvest.png" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span>John&apos;s Farm</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export function FarmDashboard() {
    const [timeRange, setTimeRange] = useState("7d")

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex flex-1 items-center justify-between">
                        <div>
                            <h1 className="text-lg font-semibold">Dashboard Overview</h1>
                            <p className="text-sm text-muted-foreground">Welcome back, John! Here&apos;s your farm performance.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select value={timeRange} onValueChange={setTimeRange}>
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7d">Last 7 days</SelectItem>
                                    <SelectItem value="30d">Last 30 days</SelectItem>
                                    <SelectItem value="90d">Last 3 months</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                            <Button variant="outline" size="sm">
                                <Bell className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 space-y-6 p-6">
                    {/* Key Metrics */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$8,245</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-green-600 flex items-center">
                                        <ArrowUpRight className="h-3 w-3 mr-1" />
                                        +12.5%
                                    </span>
                                    from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">342</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-green-600 flex items-center">
                                        <ArrowUpRight className="h-3 w-3 mr-1" />
                                        +8.2%
                                    </span>
                                    from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">301</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-green-600 flex items-center">
                                        <ArrowUpRight className="h-3 w-3 mr-1" />
                                        +15.3%
                                    </span>
                                    from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                                <Star className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4.8</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-green-600 flex items-center">
                                        <ArrowUpRight className="h-3 w-3 mr-1" />
                                        +0.2
                                    </span>
                                    from last month
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Revenue Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Trend</CardTitle>
                                <CardDescription>Monthly revenue and order count</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        revenue: {
                                            label: "Revenue",
                                            color: "hsl(var(--chart-1))",
                                        },
                                        orders: {
                                            label: "Orders",
                                            color: "hsl(var(--chart-2))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={revenueData}>
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Area
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="hsl(var(--chart-1))"
                                                fill="hsl(var(--chart-1))"
                                                fillOpacity={0.2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Subscription Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Subscription Types</CardTitle>
                                <CardDescription>Distribution of subscription plans</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        weekly: {
                                            label: "Weekly",
                                            color: "#22c55e",
                                        },
                                        biweekly: {
                                            label: "Bi-weekly",
                                            color: "#3b82f6",
                                        },
                                        monthly: {
                                            label: "Monthly",
                                            color: "#f59e0b",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={subscriptionData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                dataKey="count"
                                            >
                                                {subscriptionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                                <div className="flex justify-center gap-4 mt-4">
                                    {subscriptionData.map((item) => (
                                        <div key={item.type} className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="text-sm">{item.type}: {item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Popular Products */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Popular Products</CardTitle>
                                <CardDescription>Top-selling items this month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {popularProducts.map((product, index) => (
                                        <div key={product.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-medium">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{product.name}</p>
                                                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">${product.revenue}</p>
                                                <Badge variant={product.trend.startsWith('+') ? 'default' : 'secondary'}>
                                                    {product.trend}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Demand Forecast */}
                        <Card>
                            <CardHeader>
                                <CardTitle>AI Demand Forecast</CardTitle>
                                <CardDescription>Predicted demand for next week</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {demandForecast.map((item) => (
                                        <div key={item.product} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{item.product}</span>
                                                <div className="flex items-center gap-1">
                                                    {item.trend === 'up' ? (
                                                        <ArrowUpRight className="h-3 w-3 text-green-600" />
                                                    ) : (
                                                        <ArrowDownRight className="h-3 w-3 text-red-600" />
                                                    )}
                                                    <span className="text-sm">{item.nextWeek}%</span>
                                                </div>
                                            </div>
                                            <Progress value={item.nextWeek} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Orders */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Latest orders from your customers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.customer}</TableCell>
                                            <TableCell>{order.items}</TableCell>
                                            <TableCell>${order.amount}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        order.status === 'Delivered'
                                                            ? 'default'
                                                            : order.status === 'Processing'
                                                                ? 'secondary'
                                                                : 'outline'
                                                    }
                                                >
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{order.time}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
