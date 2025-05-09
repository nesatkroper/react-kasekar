import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Calendar,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropTypes from "prop-types";

// Dummy data based on the schema
const stockMovements = [
  {
    movementId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    productId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    productName: "Organic Apple Juice",
    productCode: "OAJ-001",
    quantity: 50,
    type: "in",
    referenceId: "stock-001",
    referenceType: "Stock Entry",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    movementId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    productId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    productName: "Organic Apple Juice",
    productCode: "OAJ-001",
    quantity: 5,
    type: "out",
    referenceId: "sale-001",
    referenceType: "Sale",
    createdAt: "2023-05-16T14:20:00Z",
  },
  {
    movementId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    productId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    productName: "Whole Grain Bread",
    productCode: "WGB-002",
    quantity: 30,
    type: "in",
    referenceId: "stock-002",
    referenceType: "Stock Entry",
    createdAt: "2023-05-16T08:45:00Z",
  },
  {
    movementId: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    productId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    productName: "Whole Grain Bread",
    productCode: "WGB-002",
    quantity: 8,
    type: "out",
    referenceId: "sale-002",
    referenceType: "Sale",
    createdAt: "2023-05-17T09:30:00Z",
  },
  {
    movementId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    productId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    productName: "Wireless Headphones",
    productCode: "WH-003",
    quantity: 15,
    type: "in",
    referenceId: "stock-003",
    referenceType: "Stock Entry",
    createdAt: "2023-05-17T14:20:00Z",
  },
  {
    movementId: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
    productId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    productName: "Wireless Headphones",
    productCode: "WH-003",
    quantity: 2,
    type: "out",
    referenceId: "sale-003",
    referenceType: "Sale",
    createdAt: "2023-05-18T11:45:00Z",
  },
  {
    movementId: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
    productId: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    productName: "Cotton T-Shirt",
    productCode: "CTS-004",
    quantity: 40,
    type: "in",
    referenceId: "stock-004",
    referenceType: "Stock Entry",
    createdAt: "2023-05-18T11:10:00Z",
  },
  {
    movementId: "8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
    productId: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    productName: "Cotton T-Shirt",
    productCode: "CTS-004",
    quantity: 12,
    type: "out",
    referenceId: "sale-004",
    referenceType: "Sale",
    createdAt: "2023-05-19T15:30:00Z",
  },
  {
    movementId: "9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x",
    productId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    productName: "Wooden Dining Table",
    productCode: "WDT-005",
    quantity: 5,
    type: "in",
    referenceId: "stock-005",
    referenceType: "Stock Entry",
    createdAt: "2023-05-19T09:30:00Z",
  },
  {
    movementId: "0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y",
    productId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    productName: "Wooden Dining Table",
    productCode: "WDT-005",
    quantity: 1,
    type: "out",
    referenceId: "sale-005",
    referenceType: "Sale",
    createdAt: "2023-05-20T13:15:00Z",
  },
];

const columns = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date & Time
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className='flex items-center'>
          <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
          <div>
            <div>{date.toLocaleDateString()}</div>
            <div className='text-xs text-muted-foreground'>
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => (
      <div>
        <div className='font-medium'>{row.getValue("productName")}</div>
        <div className='text-xs text-muted-foreground'>
          {row.original.productCode}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <div className='flex items-center gap-2'>
          <div
            className={`h-6 w-6 rounded-full flex items-center justify-center ${
              type === "in"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}>
            {type === "in" ? (
              <ArrowDownLeft className='h-3 w-3' />
            ) : (
              <ArrowUpRight className='h-3 w-3' />
            )}
          </div>
          <Badge
            variant={type === "in" ? "default" : "destructive"}
            className='capitalize'>
            {type === "in" ? "Stock In" : "Stock Out"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Quantity
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity = Number.parseInt(row.getValue("quantity"));
      const type = row.getValue("type");
      return (
        <div
          className={`font-medium ${
            type === "in" ? "text-green-600" : "text-red-600"
          }`}>
          {type === "in" ? "+" : "-"}
          {quantity}
        </div>
      );
    },
  },
  {
    accessorKey: "referenceType",
    header: "Reference",
    cell: ({ row }) => (
      <div>
        <Badge variant='outline' className='font-normal'>
          {row.getValue("referenceType")}
        </Badge>
        <div className='text-xs text-muted-foreground mt-1'>
          {row.original.referenceId}
        </div>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const movement = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-[160px]'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(movement.movementId)
              }>
              Copy movement ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>View reference</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function StockMovements({ searchQuery = "", limit }) {
  const [sorting, setSorting] = useState([{ id: "createdAt", desc: true }]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");

  let filteredMovements = stockMovements.filter((movement) => {
    const matchesSearch =
      movement.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movement.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movement.referenceId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || movement.type === typeFilter;

    return matchesSearch && matchesType;
  });

  if (limit) {
    filteredMovements = filteredMovements.slice(0, limit);
  }

  const table = useReactTable({
    data: filteredMovements,
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
    initialState: {
      pagination: {
        pageSize: limit || 10,
      },
    },
  });

  return (
    <div className='w-full flex flex-col gap-4 '>
      {!limit && (
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            <Input
              placeholder='Search products, references...'
              value={table.getColumn("productName")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn("productName")
                  ?.setFilterValue(event.target.value)
              }
              className='max-w-sm'
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Movement Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Types</SelectItem>
                <SelectItem value='in'>Stock In</SelectItem>
                <SelectItem value='out'>Stock Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center gap-2 ml-auto'>
            <Button variant='outline'>Export</Button>
            <Button>Add Movement</Button>
          </div>
        </div>
      )}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No stock movements found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!limit && (
        <div className='flex items-center justify-between space-x-2 py-4'>
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredRowModel().rows.length} movements found.
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <div className='text-sm font-medium'>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

StockMovements.propTypes = {
  searchQuery: PropTypes.string,
  limit: PropTypes.number,
};
