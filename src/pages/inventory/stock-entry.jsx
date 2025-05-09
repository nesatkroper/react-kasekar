

import { useState } from "react"
import {

  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,

  getFilteredRowModel,

} from "@tanstack/react-table"
import { ArrowUpDown, Calendar, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Dummy data based on the schema
const stockEntries = [
  {
    entryId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    stockId: "stock-001",
    productId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    productName: "Organic Apple Juice",
    productCode: "OAJ-001",
    quantity: 50,
    entryPrice: 125.0,
    unitPrice: 2.5,
    memo: "Regular stock replenishment",
    status: "active",
    entryDate: "2023-05-15T10:30:00Z",
    supplierName: "Organic Farms Inc.",
    invNumber: "INV-2023-05-001",
  },
  {
    entryId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    stockId: "stock-002",
    productId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    productName: "Whole Grain Bread",
    productCode: "WGB-002",
    quantity: 30,
    entryPrice: 52.5,
    unitPrice: 1.75,
    memo: "Weekly bakery delivery",
    status: "active",
    entryDate: "2023-05-16T08:45:00Z",
    supplierName: "Healthy Bakery Co.",
    invNumber: "INV-2023-05-002",
  },
  {
    entryId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    stockId: "stock-003",
    productId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    productName: "Wireless Headphones",
    productCode: "WH-003",
    quantity: 15,
    entryPrice: 675.0,
    unitPrice: 45.0,
    memo: "New model arrival",
    status: "active",
    entryDate: "2023-05-17T14:20:00Z",
    supplierName: "Tech Gadgets Ltd.",
    invNumber: "INV-2023-05-003",
  },
  {
    entryId: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    stockId: "stock-004",
    productId: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    productName: "Cotton T-Shirt",
    productCode: "CTS-004",
    quantity: 40,
    entryPrice: 340.0,
    unitPrice: 8.5,
    memo: "Summer collection",
    status: "active",
    entryDate: "2023-05-18T11:10:00Z",
    supplierName: "Fashion Apparel Inc.",
    invNumber: "INV-2023-05-004",
  },
  {
    entryId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    stockId: "stock-005",
    productId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    productName: "Wooden Dining Table",
    productCode: "WDT-005",
    quantity: 5,
    entryPrice: 750.0,
    unitPrice: 150.0,
    memo: "New furniture collection",
    status: "active",
    entryDate: "2023-05-19T09:30:00Z",
    supplierName: "Woodcraft Furniture",
    invNumber: "INV-2023-05-005",
  },
  {
    entryId: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
    stockId: "stock-006",
    productId: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
    productName: "LED Desk Lamp",
    productCode: "LDL-006",
    quantity: 20,
    entryPrice: 365.0,
    unitPrice: 18.25,
    memo: "Office supplies restock",
    status: "active",
    entryDate: "2023-05-20T13:45:00Z",
    supplierName: "Office Essentials Co.",
    invNumber: "INV-2023-05-006",
  },
  {
    entryId: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
    stockId: "stock-007",
    productId: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
    productName: "Protein Powder",
    productCode: "PP-007",
    quantity: 25,
    entryPrice: 387.5,
    unitPrice: 15.5,
    memo: "Fitness supplements restock",
    status: "active",
    entryDate: "2023-05-21T10:15:00Z",
    supplierName: "Health Nutrition Inc.",
    invNumber: "INV-2023-05-007",
  },
  {
    entryId: "8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
    stockId: "stock-008",
    productId: "8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
    productName: "Stainless Steel Water Bottle",
    productCode: "SSWB-008",
    quantity: 30,
    entryPrice: 382.5,
    unitPrice: 12.75,
    memo: "Eco-friendly products restock",
    status: "active",
    entryDate: "2023-05-22T15:30:00Z",
    supplierName: "Green Living Products",
    invNumber: "INV-2023-05-008",
  },
]



const columns = [
  {
    accessorKey: "invNumber",
    header: "Invoice #",
    cell: ({ row }) => <div className="font-medium">{row.getValue("invNumber")}</div>,
  },
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
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium text-center">{row.getValue("quantity")}</div>
    },
  },
  {
    accessorKey: "entryPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("entryPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("unitPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "supplierName",
    header: "Supplier",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-normal">
        {row.getValue("supplierName")}
      </Badge>
    ),
  },
  {
    accessorKey: "entryDate",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("entryDate"))
      return (
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          {date.toLocaleDateString()}
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
      const entry = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(entry.entryId)}>
              Copy entry ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Print invoice</DropdownMenuItem>
            <DropdownMenuItem>Void entry</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]



export function StockEntries({ searchQuery = "" }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const filteredEntries = stockEntries.filter(
    (entry) =>
      entry.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.invNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.supplierName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const table = useReactTable({
    data: filteredEntries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Input
          placeholder="Search invoices, products, suppliers..."
          value={(table.getColumn("invNumber")?.getFilterValue()) ?? ""}
          onChange={(event) => table.getColumn("invNumber")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline">Export</Button>
          <Button>Add Stock Entry</Button>
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
                  No stock entries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} entries found.
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
