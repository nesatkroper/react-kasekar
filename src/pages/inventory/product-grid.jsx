

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, ShoppingCart } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dummy data based on the schema
const products = [
    {
        productId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        productName: "Organic Apple Juice",
        productCode: "OAJ-001",
        categoryId: "cat-001",
        categoryName: "Beverages",
        picture: "/placeholder.svg?height=200&width=200",
        unit: "Bottle",
        capacity: "1L",
        sellPrice: 4.99,
        costPrice: 2.5,
        discountRate: 0,
        status: "active",
        currentStock: 125,
        desc: "Premium organic apple juice made from fresh apples",
    },
    {
        productId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        productName: "Whole Grain Bread",
        productCode: "WGB-002",
        categoryId: "cat-002",
        categoryName: "Food",
        picture: "/placeholder.svg?height=200&width=200",
        unit: "Loaf",
        capacity: "500g",
        sellPrice: 3.49,
        costPrice: 1.75,
        discountRate: 0,
        status: "active",
        currentStock: 48,
        desc: "Freshly baked whole grain bread",
    },
    {
        productId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
        productName: "Wireless Headphones",
        productCode: "WH-003",
        categoryId: "cat-003",
        categoryName: "Electronics",
        picture: "/placeholder.svg?height=200&width=200",
        unit: "Piece",
        capacity: null,
        sellPrice: 89.99,
        costPrice: 45.0,
        discountRate: 10,
        status: "active",
        currentStock: 32,
        desc: "Noise-cancelling wireless headphones with 20-hour battery life",
    },
    {
        productId: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
        productName: "Cotton T-Shirt",
        productCode: "CTS-004",
        categoryId: "cat-004",
        categoryName: "Clothing",
        picture: "/placeholder.svg?height=200&width=200",
        unit: "Piece",
        capacity: null,
        sellPrice: 19.99,
        costPrice: 8.5,
        discountRate: 0,
        status: "active",
        currentStock: 75,
        desc: "100% organic cotton t-shirt, available in multiple colors",
    },
    {
        productId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
        productName: "Wooden Dining Table",
        productCode: "WDT-005",
        categoryId: "cat-005",
        categoryName: "Furniture",
        picture: "/placeholder.svg?height=200&width=200",
        unit: "Piece",
        capacity: null,
        sellPrice: 299.99,
        costPrice: 150.0,
        discountRate: 5,
        status: "active",
        currentStock: 12,
        desc: "Solid oak dining table, seats 6 people",
    },
    {
        productId: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
        productName: "LED Desk Lamp",
        productCode: "LDL-006",
        categoryId: "cat-003",
        categoryName: "Electronics",
        picture: "/placeholder.svg?height=200&width=200",
        unit: "Piece",
        capacity: null,
        sellPrice: 34.99,
        costPrice: 18.25,
        discountRate: 0,
        status: "active",
        currentStock: 28,
        desc: "Adjustable LED desk lamp with 3 brightness levels",
    },
    {
        productId: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
        productName: "Protein Powder",
        productCode: "PP-007",
        categoryId: "cat-006",
        categoryName: "Health",
        picture: "/placeholder.svg?height=200&width=200",
        unit: "Container",
        capacity: "1kg",
        sellPrice: 29.99,
        costPrice: 15.5,
        discountRate: 0,
        status: "active",
        currentStock: 42,
        desc: "Whey protein powder, chocolate flavor",
    },
    {
        productId: "8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
        productName: "Stainless Steel Water Bottle",
        productCode: "SSWB-008",
        categoryId: "cat-007",
        categoryName: "Accessories",
        picture: "/placeholder.svg?height=200&width=200",
        unit: "Piece",
        capacity: "750ml",
        sellPrice: 24.99,
        costPrice: 12.75,
        discountRate: 0,
        status: "active",
        currentStock: 56,
        desc: "Insulated stainless steel water bottle, keeps drinks cold for 24 hours",
    },
]



export function ProductsGrid({ searchQuery = "" }) {
    const [categoryFilter, setCategoryFilter] = useState < string > ("all")

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.productCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.desc?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = categoryFilter === "all" || product.categoryName === categoryFilter

        return matchesSearch && matchesCategory
    })

    // Get unique categories for filter
    const categories = ["all", ...new Set(products.map((p) => p.categoryName))]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category === "all" ? "All Categories" : category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        Export
                    </Button>
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                        Add Product
                    </Button>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {filteredProducts.map((product) => (
                    <motion.div key={product.productId} variants={item}>
                        <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="relative">
                                <div className="absolute top-2 right-2 z-10">
                                    <Badge variant={product.currentStock < 20 ? "destructive" : "default"} className="font-semibold">
                                        {product.currentStock < 20 ? "Low Stock" : "In Stock"}
                                    </Badge>
                                </div>
                                <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.picture || "/placeholder.svg"}
                                        alt={product.productName}
                                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                                    />
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-lg line-clamp-1">{product.productName}</h3>
                                        <p className="text-sm text-muted-foreground">{product.productCode}</p>
                                    </div>
                                    <Badge variant="outline" className="ml-2">
                                        {product.categoryName}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-4">{product.desc}</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-2xl font-bold">${product.sellPrice.toFixed(2)}</p>
                                        {product.discountRate > 0 && (
                                            <p className="text-xs text-muted-foreground">
                                                <span className="line-through">
                                                    ${(product.sellPrice / (1 - product.discountRate / 100)).toFixed(2)}
                                                </span>
                                                <span className="ml-1 text-green-600">-{product.discountRate}%</span>
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Badge variant="secondary" className="font-medium">
                                            Stock: {product.currentStock}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Eye className="h-4 w-4 mr-1" /> View
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Edit className="h-4 w-4 mr-1" /> Edit
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <ShoppingCart className="h-4 w-4 mr-1" /> Add
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        <ShoppingCart className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                        We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
                    </p>
                </div>
            )}
        </div>
    )
}
