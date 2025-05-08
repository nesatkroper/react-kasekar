import React, { useState } from "react";
import PropTypes from "prop-types";
import AddressMap from "./map";
import ImageGallery from "./image-gallery";
import Layout from "@/layout";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  User,
  MapIcon,
  Clock,
  Building,
  Tag,
  ChevronRight,
  Shield,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CustomerDetail = () => {
  const customer = {
    customerId: 1,
    firstName: "John",
    lastName: "Doe",
    gender: "male",
    phone: "+1 (555) 123-4547",
    status: "active",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-05-20"),
    info: {
      picture: "/placeholder.svg?height=150&width=150",
      region: "North",
      email: "john.doe@example.com",
      note: "VIP customer, prefers communication via email",
      govId: "ID12345478",
      govPicture: "/placeholder.svg?height=300&width=400",
      govExpire: new Date("2025-10-15"),
      status: "active",
    },
    address: [
      {
        addressId: "addr-uuid-1",
        cityId: 1,
        stateId: 1,
        latitude: 40.7128,
        longitude: -74.004,
        status: "active",
        createdAt: new Date("2023-01-15"),
        updatedAt: new Date("2023-01-15"),
        city: { cityId: 1, name: "New York City" },
        state: { stateId: 1, name: "New York" },
        image: [
          {
            imageId: "img-uuid-1",
            imageUrl: "/placeholder.svg?height=400&width=400",
            imageType: "exterior",
            addressId: "addr-uuid-1",
            status: "active",
            createdAt: new Date("2023-01-15"),
            updatedAt: new Date("2023-01-15"),
          },
          {
            imageId: "img-uuid-2",
            imageUrl: "/placeholder.svg?height=400&width=400",
            imageType: "interior",
            addressId: "addr-uuid-1",
            status: "active",
            createdAt: new Date("2023-01-15"),
            updatedAt: new Date("2023-01-15"),
          },
          {
            imageId: "img-uuid-3",
            imageUrl: "/placeholder.svg?height=400&width=400",
            imageType: "document",
            addressId: "addr-uuid-1",
            status: "active",
            createdAt: new Date("2023-01-15"),
            updatedAt: new Date("2023-01-15"),
          },
        ],
      },
      {
        addressId: "addr-uuid-2",
        cityId: 2,
        stateId: 1,
        latitude: 40.4782,
        longitude: -73.9442,
        status: "active",
        createdAt: new Date("2023-02-20"),
        updatedAt: new Date("2023-02-20"),
        city: { cityId: 2, name: "Brooklyn" },
        state: { stateId: 1, name: "New York" },
        image: [
          {
            imageId: "img-uuid-4",
            imageUrl: "/placeholder.svg?height=400&width=400",
            imageType: "exterior",
            addressId: "addr-uuid-2",
            status: "active",
            createdAt: new Date("2023-02-20"),
            updatedAt: new Date("2023-02-20"),
          },
        ],
      },
    ],
  };

  const [selectedAddress, setSelectedAddress] = useState(
    customer.address[0]?.addressId || ""
  );

  const currentAddress =
    customer.address.find((addr) => addr.addressId === selectedAddress) ||
    customer.address[0];

  const fullName = `${customer.firstName} ${customer.lastName}`;

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "secondary";
      case "suspended":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Layout>
      {" "}
      <div className='container mx-auto space-y-4 max-w-7xl'>
        <div className='bg-white dark:bg-slate-950 rounded-lg border shadow-sm p-4'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div className='flex items-center gap-5'>
              <Avatar className='h-20 w-20 border-2 border-primary/10'>
                <AvatarImage
                  src={customer.info?.picture || ""}
                  alt={fullName}
                />
                <AvatarFallback className='text-lg bg-primary/10 text-primary'>
                  {customer.firstName.charAt(0)}
                  {customer.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className='flex items-center gap-3'>
                  <h1 className='text-lg font-bold tracking-tight'>
                    {fullName}
                  </h1>
                  <Badge
                    variant={getStatusVariant(customer.status)}
                    className='ml-2'>
                    {customer.status}
                  </Badge>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-muted-foreground'>
                  {customer.info?.email && (
                    <div className='flex items-center gap-1.5 text-sm'>
                      <Mail className='h-3.5 w-3.5' />
                      <span>{customer.info.email}</span>
                    </div>
                  )}
                  {customer.phone && (
                    <div className='flex items-center gap-1.5 text-sm'>
                      <Phone className='h-3.5 w-3.5' />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  {customer.info?.region && (
                    <div className='flex items-center gap-1.5 text-sm'>
                      <Building className='h-3.5 w-3.5' />
                      <span>{customer.info.region} Region</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='flex gap-3 self-end md:self-auto'>
              <Button variant='outline' size='sm'>
                <Clock className='mr-2 h-4 w-4' />
                Activity Log
              </Button>
              <Button>
                <FileText className='mr-2 h-4 w-4' />
                Edit Customer
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue='details' className='w-full'>
          <TabsList className='grid grid-cols-4 md:w-[500px] p-1'>
            <TabsTrigger value='details' className='rounded-md'>
              <User className='mr-2 h-4 w-4' />
              <span className='hidden sm:inline'>Customer</span> Details
            </TabsTrigger>
            <TabsTrigger value='address' className='rounded-md'>
              <MapPin className='mr-2 h-4 w-4' />
              <span className='hidden sm:inline'>Location</span> Address
            </TabsTrigger>
            <TabsTrigger value='documents' className='rounded-md'>
              <FileText className='mr-2 h-4 w-4' />
              Documents
            </TabsTrigger>
            <TabsTrigger value='sales' className='rounded-md'>
              <Tag className='mr-2 h-4 w-4' />
              Sales
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value='details'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              <div className='lg:col-span-2 space-y-4'>
                <Card className='overflow-hidden'>
                  <CardHeader className='bg-muted/30 pb-3'>
                    <CardTitle className='text-md flex items-center'>
                      <User className='mr-2 h-5 w-5 text-primary' />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-12'>
                      <div className='space-y-1'>
                        <p className='text-sm font-medium text-muted-foreground'>
                          Full Name
                        </p>
                        <p>{fullName}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-medium text-muted-foreground'>
                          Gender
                        </p>
                        <p className='capitalize'>{customer.gender}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-medium text-muted-foreground'>
                          Email Address
                        </p>
                        <p>{customer.info?.email || "—"}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-medium text-muted-foreground'>
                          Phone Number
                        </p>
                        <p>{customer.phone || "—"}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-medium text-muted-foreground'>
                          Region
                        </p>
                        <p>{customer.info?.region || "—"}</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm font-medium text-muted-foreground'>
                          Status
                        </p>
                        <Badge variant={getStatusVariant(customer.status)}>
                          {customer.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {customer.info?.note && (
                  <Card>
                    <CardHeader className='bg-muted/30 pb-3'>
                      <CardTitle className='text-md flex items-center'>
                        <FileText className='mr-2 h-5 w-5 text-primary' />
                        Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm leading-relaxed'>
                        {customer.info.note}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {customer.info?.govId && (
                  <Card>
                    <CardHeader className='bg-muted/30 pb-3'>
                      <CardTitle className='text-md flex items-center'>
                        <Shield className='mr-2 h-5 w-5 text-primary' />
                        Government ID
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='flex flex-col md:flex-row gap-4'>
                        {customer.info.govPicture && (
                          <div className='md:w-1/3'>
                            <Dialog>
                              <DialogTrigger asChild>
                                <div className='relative h-48 w-full cursor-pointer overflow-hidden rounded-md border bg-muted/30'>
                                  <image
                                    src={
                                      customer.info.govPicture ||
                                      "/placeholder.svg"
                                    }
                                    alt='Government ID'
                                    className='object-cover transition-all hover:scale-105'
                                  />
                                  <div className='absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                                    <span className='text-white font-medium px-3 py-1 bg-black/50 rounded-md'>
                                      View ID
                                    </span>
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent className='max-w-3xl'>
                                <div className='relative h-[70vh] w-full'>
                                  <image
                                    src={
                                      customer.info.govPicture ||
                                      "/placeholder.svg"
                                    }
                                    alt='Government ID'
                                    className='object-contain'
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                        <div className='flex-1 space-y-4'>
                          <div className='space-y-1'>
                            <p className='text-sm font-medium text-muted-foreground'>
                              ID Number
                            </p>
                            <p className='font-mono'>{customer.info.govId}</p>
                          </div>
                          {customer.info.govExpire && (
                            <div className='space-y-1'>
                              <p className='text-sm font-medium text-muted-foreground'>
                                Expiration Date
                              </p>
                              <div className='flex items-center gap-2'>
                                <p>
                                  {format(
                                    customer.info.govExpire,
                                    "MMMM d, yyyy"
                                  )}
                                </p>
                                {new Date() > customer.info.govExpire && (
                                  <Badge
                                    variant='destructive'
                                    className='text-xs'>
                                    Expired
                                  </Badge>
                                )}
                                {new Date() < customer.info.govExpire &&
                                  new Date(customer.info.govExpire).getTime() -
                                    new Date().getTime() <
                                    1000 * 40 * 40 * 24 * 90 && (
                                    <Badge
                                      variant='warning'
                                      className='text-xs bg-amber-500'>
                                      Expiring Soon
                                    </Badge>
                                  )}
                              </div>
                            </div>
                          )}
                          <div className='space-y-1'>
                            <p className='text-sm font-medium text-muted-foreground'>
                              Verification Status
                            </p>
                            <Badge
                              variant='outline'
                              className='bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800'>
                              <Shield className='mr-1 h-3 w-3' />
                              Verified
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className='space-y-4'>
                <Card>
                  <CardHeader className='bg-muted/30 pb-3'>
                    <CardTitle className='text-md flex items-center'>
                      <Clock className='mr-2 h-5 w-5 text-primary' />
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Customer ID
                      </p>
                      <p className='font-mono text-sm'>{customer.customerId}</p>
                    </div>
                    <Separator />
                    <div className='space-y-1'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Created
                      </p>
                      <div className='flex items-center'>
                        <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                        <p>{format(customer.createdAt, "MMMM d, yyyy")}</p>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        {format(customer.createdAt, "h:mm a")}
                      </p>
                    </div>
                    <Separator />
                    <div className='space-y-1'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Last Updated
                      </p>
                      <div className='flex items-center'>
                        <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                        <p>{format(customer.updatedAt, "MMMM d, yyyy")}</p>
                      </div>
                      <p className='text-xs text-muted-foreground'>
                        {format(customer.updatedAt, "h:mm a")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='bg-muted/30 pb-3'>
                    <CardTitle className='text-md flex items-center'>
                      <MapPin className='mr-2 h-5 w-5 text-primary' />
                      Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className='h-[220px] pr-4'>
                      <div className='space-y-4'>
                        {customer.address.map((addr) => (
                          <div
                            key={addr.addressId}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                              selectedAddress === addr.addressId
                                ? "bg-primary/10 border border-primary/20"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => setSelectedAddress(addr.addressId)}>
                            <div className='flex justify-between items-start'>
                              <div>
                                <p className='font-medium'>
                                  {addr.city?.name || "Unknown City"},{" "}
                                  {addr.state?.name || "Unknown State"}
                                </p>
                                <div className='flex items-center gap-1 mt-1 text-xs text-muted-foreground'>
                                  <MapPin className='h-3 w-3' />
                                  <span>
                                    {addr.latitude && addr.longitude
                                      ? `${addr.latitude.toFixed(
                                          4
                                        )}, ${addr.longitude.toFixed(4)}`
                                      : "No coordinates"}
                                  </span>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  addr.status === "active"
                                    ? "outline"
                                    : "secondary"
                                }
                                className={
                                  addr.status === "active"
                                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800"
                                    : ""
                                }>
                                {addr.status}
                              </Badge>
                            </div>
                            <div className='flex items-center justify-between mt-2'>
                              <span className='text-xs text-muted-foreground'>
                                {format(addr.createdAt, "MMM d, yyyy")}
                              </span>
                              <div className='flex items-center text-xs text-primary'>
                                <span>View details</span>
                                <ChevronRight className='h-3 w-3 ml-1' />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Address Tab */}
          <TabsContent value='address'>
            <Card className='overflow-hidden'>
              <CardHeader className='bg-muted/30 pb-3'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                  <div>
                    <CardTitle className='text-md flex items-center'>
                      <MapPin className='mr-2 h-5 w-5 text-primary' />
                      Address Locations
                    </CardTitle>
                    <CardDescription>
                      Select an address to view details and location
                    </CardDescription>
                  </div>
                  <Button size='sm' variant='outline'>
                    <MapPin className='mr-2 h-4 w-4' />
                    Add New Address
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='pt-4'>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {customer.address.map((addr) => (
                    <Button
                      key={addr.addressId}
                      variant={
                        selectedAddress === addr.addressId
                          ? "default"
                          : "outline"
                      }
                      size='sm'
                      onClick={() => setSelectedAddress(addr.addressId)}
                      className={
                        selectedAddress === addr.addressId ? "" : "bg-muted/50"
                      }>
                      {addr.city?.name || "Unknown"},{" "}
                      {addr.state?.name || "Unknown"}
                    </Button>
                  ))}
                </div>

                {currentAddress && (
                  <div className='space-y-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <Card className='md:col-span-1 border-dashed'>
                        <CardHeader className='pb-2'>
                          <CardTitle className='text-base'>
                            Location Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-4'>
                            <div className='space-y-1'>
                              <p className='text-sm font-medium text-muted-foreground'>
                                Address
                              </p>
                              <div className='flex items-start gap-2'>
                                <MapPin className='h-4 w-4 text-muted-foreground mt-0.5' />
                                <span>
                                  {currentAddress.city?.name || "Unknown City"},{" "}
                                  {currentAddress.state?.name ||
                                    "Unknown State"}
                                </span>
                              </div>
                            </div>

                            {currentAddress.latitude &&
                              currentAddress.longitude && (
                                <div className='space-y-1'>
                                  <p className='text-sm font-medium text-muted-foreground'>
                                    Coordinates
                                  </p>
                                  <div className='flex items-start gap-2'>
                                    <MapIcon className='h-4 w-4 text-muted-foreground mt-0.5' />
                                    <span className='font-mono text-sm'>
                                      {currentAddress.latitude.toFixed(4)},{" "}
                                      {currentAddress.longitude.toFixed(4)}
                                    </span>
                                  </div>
                                </div>
                              )}

                            <div className='space-y-1'>
                              <p className='text-sm font-medium text-muted-foreground'>
                                Added On
                              </p>
                              <div className='flex items-start gap-2'>
                                <Calendar className='h-4 w-4 text-muted-foreground mt-0.5' />
                                <span>
                                  {format(
                                    currentAddress.createdAt,
                                    "MMMM d, yyyy"
                                  )}
                                </span>
                              </div>
                            </div>

                            <div className='space-y-1'>
                              <p className='text-sm font-medium text-muted-foreground'>
                                Status
                              </p>
                              <Badge
                                variant={
                                  currentAddress.status === "active"
                                    ? "outline"
                                    : "secondary"
                                }
                                className={
                                  currentAddress.status === "active"
                                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800"
                                    : ""
                                }>
                                {currentAddress.status}
                              </Badge>
                            </div>

                            <div className='pt-2'>
                              <Button
                                variant='outline'
                                size='sm'
                                className='w-full'>
                                <FileText className='mr-2 h-4 w-4' />
                                Edit Address
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className='md:col-span-2'>
                        {currentAddress.latitude && currentAddress.longitude ? (
                          <div className='h-[400px] w-full rounded-md border overflow-hidden shadow-sm'>
                            <AddressMap
                              addresses={customer.address.filter(
                                (addr) => addr.latitude && addr.longitude
                              )}
                              selectedAddressId={selectedAddress}
                            />
                          </div>
                        ) : (
                          <div className='h-[400px] w-full rounded-md border flex items-center justify-center bg-muted/30'>
                            <div className='text-center p-4'>
                              <AlertCircle className='h-10 w-10 text-muted-foreground mx-auto mb-4' />
                              <h3 className='text-md font-medium mb-2'>
                                No Location Data
                              </h3>
                              <p className='text-sm text-muted-foreground max-w-md mx-auto'>
                                {`  This address doesn't have geographic coordinates.
                              Add latitude and longitude to display it on the
                              map.`}
                              </p>
                              <Button variant='outline' size='sm'>
                                <MapPin className='mr-2 h-4 w-4' />
                                Add Coordinates
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {currentAddress.image.length > 0 && (
                      <div>
                        <div className='flex items-center justify-between mb-4'>
                          <h3 className='text-md font-medium'>
                            Address Images
                          </h3>
                          <Button variant='outline' size='sm'>
                            <FileText className='mr-2 h-4 w-4' />
                            Upload New Image
                          </Button>
                        </div>
                        <ImageGallery images={currentAddress.image} />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value='documents'>
            <Card className='overflow-hidden'>
              <CardHeader className='bg-muted/30 pb-3'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                  <div>
                    <CardTitle className='text-md flex items-center'>
                      <FileText className='mr-2 h-5 w-5 text-primary' />
                      Documents & Images
                    </CardTitle>
                    <CardDescription>
                      View all images and documents associated with this
                      customer
                    </CardDescription>
                  </div>
                  <Button size='sm' variant='outline'>
                    <FileText className='mr-2 h-4 w-4' />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='pt-4'>
                <Tabs defaultValue='all' className='w-full'>
                  <TabsList className='mb-4 w-full sm:w-auto inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground'>
                    <TabsTrigger value='all' className='rounded-md'>
                      All
                    </TabsTrigger>
                    <TabsTrigger value='exterior' className='rounded-md'>
                      Exterior
                    </TabsTrigger>
                    <TabsTrigger value='interior' className='rounded-md'>
                      Interior
                    </TabsTrigger>
                    <TabsTrigger value='document' className='rounded-md'>
                      Documents
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value='all'>
                    <ImageGallery
                      images={customer.address.flatMap((addr) => addr.image)}
                      showAddressInfo
                      addresses={customer.address}
                    />
                  </TabsContent>

                  <TabsContent value='exterior'>
                    <ImageGallery
                      images={customer.address.flatMap((addr) =>
                        addr.image.filter((img) => img.imageType === "exterior")
                      )}
                      showAddressInfo
                      addresses={customer.address}
                    />
                  </TabsContent>

                  <TabsContent value='interior'>
                    <ImageGallery
                      images={customer.address.flatMap((addr) =>
                        addr.image.filter((img) => img.imageType === "interior")
                      )}
                      showAddressInfo
                      addresses={customer.address}
                    />
                  </TabsContent>

                  <TabsContent value='document'>
                    <ImageGallery
                      images={customer.address.flatMap((addr) =>
                        addr.image.filter((img) => img.imageType === "document")
                      )}
                      showAddressInfo
                      addresses={customer.address}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value='sales'>
            <Card className='overflow-hidden'>
              <CardHeader className='bg-muted/30 pb-3'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                  <div>
                    <CardTitle className='text-md flex items-center'>
                      <Tag className='mr-2 h-5 w-5 text-primary' />
                      Sales History
                    </CardTitle>
                    <CardDescription>
                      View all sales transactions for this customer
                    </CardDescription>
                  </div>
                  <Button size='sm'>
                    <Tag className='mr-2 h-4 w-4' />
                    New Sale
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='pt-4'>
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                  <div className='rounded-full bg-muted/50 p-4 mb-4'>
                    <Tag className='h-8 w-8 text-muted-foreground' />
                  </div>
                  <h3 className='text-md font-medium mb-2'>No Sales Records</h3>
                  <p className='text-sm text-muted-foreground max-w-md'>
                    {`This customer doesn't have any sales records yet. Create a new
                  sale to get started.`}
                  </p>
                  <Button>
                    <Tag className='mr-2 h-4 w-4' />
                    Create First Sale
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

CustomerDetail.propTypes = {
  customer: PropTypes.object,
};

export default CustomerDetail;
