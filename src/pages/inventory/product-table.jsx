

import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, ChevronDown, Eye, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dummy data based on the schema
const products = [
  {
    productId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    productName: "Organic Apple Juice",
    productCode: "OAJ-001",
    categoryId: "cat-001",
    categoryName: "Beverages",
    picture: "/placeholder.svg?height=40&width=40",
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
    picture: "/placeholder.svg?height=40&width=40",
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
    picture: "/placeholder.svg?height=40&width=40",
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
    picture: "/placeholder.svg?height=40&width=40",
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
    picture: "/placeholder.svg?height=40&width=40",
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
    picture: "/placeholder.svg?height=40&width=40",
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
    picture: "/placeholder.svg?height=40&width=40",
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
    picture: "/placeholder.svg?height=40&width=40",
    unit: "Piece",
    capacity: "750ml",
    sellPrice: 24.99,
    costPrice: 12.75,
    discountRate: 0,
    status: "active",
    currentStock: 56,
    desc: "Insulated stainless steel water bottle, keeps drinks cold for 24 hours",
  },
  {
    productId: "9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x",
    productName: "Yoga Mat",
    productCode: "YM-009",
    categoryId: "cat-008",
    categoryName: "Sports",
    picture: "/placeholder.svg?height=40&width=40",
    unit: "Piece",
    capacity: null,
    sellPrice: 39.99,
    costPrice: 20.0,
    discountRate: 0,
    status: "active",
    currentStock: 35,
    desc: "Non-slip yoga mat, 6mm thickness",
  },
  {
    productId: "0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y",
    productName: "Ceramic Coffee Mug",
    productCode: "CCM-010",
    categoryId: "cat-009",
    categoryName: "Kitchenware",
    picture: "/placeholder.svg?height=40&width=40",
    unit: "Piece",
    capacity: "350ml",
    sellPrice: 12.99,
    costPrice: 5.5,
    discountRate: 0,
    status: "active",
    currentStock: 68,
    desc: "Handcrafted ceramic coffee mug",
  },
]



const columns = [
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("productName")}</div>
        <div className="text-xs text-muted-foreground">{row.original.productCode}</div>
      </div>
    ),
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("categoryName")}</Badge>,
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => (
      <div>
        {row.getValue("unit")}
        {row.original.capacity && <span className="text-muted-foreground"> ({row.original.capacity})</span>}
      </div>
    ),
  },
  {
    accessorKey: "sellPrice",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("sellPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)

      const discountRate = row.original.discountRate

      return (
        <div>
          <div className="font-medium">{formatted}</div>
          {discountRate > 0 && <div className="text-xs text-green-600">-{discountRate}% off</div>}
        </div>
      )
    },
  },
  {
    accessorKey: "currentStock",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const stock = Number.parseInt(row.getValue("currentStock"))
      return (
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${stock < 20 ? "bg-red-500" : stock < 50 ? "bg-yellow-500" : "bg-green-500"}`}
          ></div>
          <div className={`font-medium ${stock < 20 ? "text-red-500" : ""}`}>{stock}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") 
      return (
        <Badge variant={status === "active" ? "default" : "secondary"} className="capitalize">
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.productId)}>
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit product</DropdownMenuItem>
              <DropdownMenuItem>View stock history</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Delete product</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]


export function ProductsTable({ searchQuery = "" }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.categoryName === categoryFilter

    return matchesSearch && matchesCategory
  })

  const table = useReactTable({
    data: filteredProducts,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map((p) => p.categoryName))]

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Input
            placeholder="Filter products..."
            value={(table.getColumn("productName")?.getFilterValue() ) ?? ""}
            onChange={(event) => table.getColumn("productName")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">Export</Button>
          <Button>Add Product</Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} product(s) found.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
