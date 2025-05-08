import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  Filter,
  ListCollapse,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  User,
  UserCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

const customers = [
  {
    customerId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    firstName: "John",
    lastName: "Doe",
    gender: "male",
    phone: "+1 (555) 123-4567",
    status: "active",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-05-20"),
  },
  {
    customerId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    firstName: "Jane",
    lastName: "Smith",
    gender: "female",
    phone: "+1 (555) 987-6543",
    status: "active",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-06-15"),
  },
  {
    customerId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    firstName: "Michael",
    lastName: "Johnson",
    gender: "male",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-04-20"),
  },
  {
    customerId: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    firstName: "Emily",
    lastName: "Williams",
    gender: "female",
    phone: "+1 (555) 789-0123",
    status: "active",
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-07-10"),
  },
  {
    customerId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    firstName: "David",
    lastName: "Brown",
    gender: "male",
    phone: "+1 (555) 234-5678",
    status: "active",
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-08-05"),
  },
];

const customerInfos = [
  {
    customerId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    picture: "/placeholder.svg?height=40&width=40",
    region: "North America",
    email: "john.doe@example.com",
    note: "Preferred customer, frequent buyer",
    govId: "AB123456789",
    govPicture: "/placeholder.svg?height=40&width=40",
    govExpire: new Date("2025-10-15"),
    status: "active",
  },
  {
    customerId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    picture: "/placeholder.svg?height=40&width=40",
    region: "Europe",
    email: "jane.smith@example.com",
    note: "New customer, interested in premium products",
    govId: "CD987654321",
    govPicture: "/placeholder.svg?height=40&width=40",
    govExpire: new Date("2024-08-20"),
    status: "active",
  },
  {
    customerId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    picture: "/placeholder.svg?height=40&width=40",
    region: "North America",
    email: "michael.johnson@example.com",
    note: "Requires follow-up",
    govId: "EF567891234",
    govPicture: "/placeholder.svg?height=40&width=40",
    govExpire: new Date("2023-12-05"),
    status: "inactive",
  },
  {
    customerId: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    picture: "/placeholder.svg?height=40&width=40",
    region: "Asia",
    email: "emily.williams@example.com",
    note: "Corporate account",
    govId: "GH432109876",
    govPicture: "/placeholder.svg?height=40&width=40",
    govExpire: new Date("2026-03-15"),
    status: "active",
  },
  {
    customerId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    picture: "/placeholder.svg?height=40&width=40",
    region: "South America",
    email: "david.brown@example.com",
    note: "Seasonal buyer",
    govId: "IJ654321098",
    govPicture: "/placeholder.svg?height=40&width=40",
    govExpire: new Date("2024-11-30"),
    status: "active",
  },
];

const addresses = [
  {
    addressId: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    cityId: 101,
    stateId: 5,
    latitude: 40.7128,
    longitude: -74.006,
    customerId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    status: "active",
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-05-25"),
    cityName: "New York",
    stateName: "New York",
  },
  {
    addressId: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
    cityId: 102,
    stateId: 6,
    latitude: 34.0522,
    longitude: -118.2437,
    customerId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    status: "active",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-06-20"),
    cityName: "Los Angeles",
    stateName: "California",
  },
  {
    addressId: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
    cityId: 103,
    stateId: 7,
    latitude: 41.8781,
    longitude: -87.6298,
    customerId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    status: "inactive",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-04-25"),
    cityName: "Chicago",
    stateName: "Illinois",
  },
  {
    addressId: "d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    cityId: 104,
    stateId: 8,
    latitude: 29.7604,
    longitude: -95.3698,
    customerId: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    status: "active",
    createdAt: new Date("2023-04-25"),
    updatedAt: new Date("2023-07-15"),
    cityName: "Houston",
    stateName: "Texas",
  },
  {
    addressId: "e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0",
    cityId: 105,
    stateId: 9,
    latitude: 33.4484,
    longitude: -112.074,
    customerId: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    status: "active",
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-08-10"),
    cityName: "Phoenix",
    stateName: "Arizona",
  },
];

export default function CustomerTabs() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        <div className='mt-4 mx-auto space-y-6'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
              <h1 className='text-md font-bold tracking-tight'>
                Customer Management
              </h1>
              <p className='text-muted-foreground text-sm'>
                View and manage your customer data, information, and addresses.
              </p>
            </div>
            <Button className='flex items-center gap-2'>
              <Plus className='h-4 w-4' />
              Add New Customer
            </Button>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
            <div className='relative w-full sm:w-72'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search...'
                className='pl-8 w-full'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant='outline'
              className='w-full sm:w-auto flex items-center gap-2'>
              <Filter className='h-4 w-4' />
              Filter
              <ChevronDown className='h-4 w-4 ml-1' />
            </Button>
          </div>

          <Card>
            <CardContent className='p-0'>
              <Tabs defaultValue='customers' className='w-full'>
                <TabsList className='w-full grid grid-cols-3 rounded-b-none'>
                  <TabsTrigger
                    value='customers'
                    className='flex items-center gap-2'>
                    <User className='h-4 w-4' />
                    <span className='hidden sm:inline'>Customers</span>
                    <Badge className='ml-1'>{customers.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value='info' className='flex items-center gap-2'>
                    <UserCircle className='h-4 w-4' />
                    <span className='hidden sm:inline'>Customer Info</span>
                    <Badge className='ml-1'>{customerInfos.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value='addresses'
                    className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4' />
                    <span className='hidden sm:inline'>Addresses</span>
                    <Badge className='ml-1'>{addresses.length}</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='customers' className='m-0'>
                  <div className='rounded-md border'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className='hidden md:table-cell'>
                            Gender
                          </TableHead>
                          <TableHead className='hidden sm:table-cell'>
                            Phone
                          </TableHead>
                          <TableHead className='hidden lg:table-cell'>
                            Created
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className='h-24 text-center'>
                              No customers found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredCustomers.map((customer) => (
                            <TableRow key={customer.customerId}>
                              <TableCell className='font-medium'>
                                {customer.firstName} {customer.lastName}
                              </TableCell>
                              <TableCell className='hidden md:table-cell capitalize'>
                                {customer.gender}
                              </TableCell>
                              <TableCell className='hidden sm:table-cell'>
                                {customer.phone}
                              </TableCell>
                              <TableCell className='hidden lg:table-cell'>
                                {customer.createdAt.toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    customer.status === "active"
                                      ? "default"
                                      : "secondary"
                                  }>
                                  {customer.status}
                                </Badge>
                              </TableCell>
                              <TableCell className='text-right'>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant='ghost'
                                      className='h-8 w-8 p-0'>
                                      <span className='sr-only'>Open menu</span>
                                      <MoreHorizontal className='h-4 w-4' />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align='end'>
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>

                                    <DropdownMenuItem>
                                      <Link
                                        to={`/customer/${customer.customerId}`}
                                        className='flex'>
                                        <ListCollapse
                                          size={16}
                                          className='me-2'
                                        />
                                        View details
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Edit customer
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-destructive'>
                                      Delete customer
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className='flex justify-between items-center'>
            <div className='text-sm text-muted-foreground'>
              Showing <strong>{filteredCustomers.length}</strong> of{" "}
              <strong>{customers.length}</strong> customers
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm' disabled>
                <ChevronDown className='h-4 w-4 mr-2' />
                Previous
              </Button>
              <Button variant='outline' size='sm'>
                Next
                <ChevronDown className='h-4 w-4 ml-2 rotate-180' />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
