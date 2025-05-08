import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  User,
  Mail,
  FileText,
  Upload,
  Save,
  ArrowLeft,
  Shield,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "./date-picker";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Define the form schema with Zod
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive", "suspended"]),
  info: z.object({
    picture: z.string().optional(),
    region: z.string().optional(),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .optional()
      .or(z.literal("")),
    note: z.string().optional(),
    govId: z.string().optional(),
    govPicture: z.string().optional(),
    govExpire: z.date().optional().nullable(),
  }),
});

export default function EditCustomerForm({ customer }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState(
    customer.info?.picture || null
  );
  const [govIdImage, setGovIdImage] = useState(
    customer.info?.govPicture || null
  );

  // Initialize the form with customer data
  const form =
    useForm <
    FormValues >
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        gender: customer.gender,
        phone: customer.phone || "",
        status: customer.status,
        info: {
          picture: customer.info?.picture || "",
          region: customer.info?.region || "",
          email: customer.info?.email || "",
          note: customer.info?.note || "",
          govId: customer.info?.govId || "",
          govPicture: customer.info?.govPicture || "",
          govExpire: customer.info?.govExpire || null,
        },
      },
    };

  // Handle form submission
  async function onSubmit(data) {
    setIsSubmitting(true);

    try {
      // This would be replaced with your actual API call
      console.log("Form data submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Customer updated",
        description: "Customer information has been successfully updated.",
      });

      // Navigate back to customer details
      router.push(`/customers/${customer.customerId}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating customer:", error);
      toast({
        title: "Error",
        description: "There was a problem updating the customer information.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle profile image upload
  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to your server/storage
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      form.setValue("info.picture", imageUrl);
    }
  };

  // Handle government ID image upload
  const handleGovIdImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to your server/storage
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setGovIdImage(imageUrl);
      form.setValue("info.govPicture", imageUrl);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Edit Customer</h1>
          <p className='text-muted-foreground'>
            Update customer information and preferences
          </p>
        </div>
        <Button variant='outline' onClick={() => router.back()}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Customer
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <Tabs defaultValue='personal' className='w-full'>
            <div className='bg-white dark:bg-slate-950 rounded-lg border shadow-sm p-1'>
              <TabsList className='grid grid-cols-3 w-full md:w-[400px] p-1'>
                <TabsTrigger value='personal' className='rounded-md'>
                  <User className='mr-2 h-4 w-4' />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value='contact' className='rounded-md'>
                  <Mail className='mr-2 h-4 w-4' />
                  Contact Details
                </TabsTrigger>
                <TabsTrigger value='documents' className='rounded-md'>
                  <FileText className='mr-2 h-4 w-4' />
                  Documents
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Personal Information Tab */}
            <TabsContent value='personal' className='mt-6 space-y-6'>
              <Card>
                <CardHeader className='bg-muted/30 pb-3'>
                  <CardTitle className='text-lg flex items-center'>
                    <User className='mr-2 h-5 w-5 text-primary' />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Edit the customer's basic personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='md:col-span-2 flex flex-col md:flex-row gap-6 items-start'>
                      <div className='flex flex-col items-center gap-3'>
                        <Avatar className='h-24 w-24 border-2 border-primary/10'>
                          <AvatarImage src={profileImage || ""} alt='Profile' />
                          <AvatarFallback className='text-xl bg-primary/10 text-primary'>
                            {form.getValues("firstName").charAt(0)}
                            {form.getValues("lastName").charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col items-center'>
                          <label
                            htmlFor='profile-upload'
                            className='cursor-pointer'>
                            <div className='flex items-center gap-1 text-sm text-primary hover:underline'>
                              <Upload className='h-3 w-3' />
                              Change Photo
                            </div>
                            <input
                              id='profile-upload'
                              type='file'
                              accept='image/*'
                              className='hidden'
                              onChange={handleProfileImageUpload}
                            />
                          </label>
                          <p className='text-xs text-muted-foreground mt-1'>
                            JPG, PNG or GIF, max 2MB
                          </p>
                        </div>
                      </div>

                      <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                        <FormField
                          control={form.control}
                          name='firstName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder='First name' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='lastName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder='Last name' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name='gender'
                      render={({ field }) => (
                        <FormItem className='space-y-3'>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className='flex flex-col space-y-1'>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='male' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Male
                                </FormLabel>
                              </FormItem>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='female' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Female
                                </FormLabel>
                              </FormItem>
                              <FormItem className='flex items-center space-x-3 space-y-0'>
                                <FormControl>
                                  <RadioGroupItem value='other' />
                                </FormControl>
                                <FormLabel className='font-normal'>
                                  Other
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='status'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select status' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='active'>
                                <div className='flex items-center'>
                                  <Badge
                                    variant='outline'
                                    className='bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800 mr-2'>
                                    Active
                                  </Badge>
                                  <span>Customer is active</span>
                                </div>
                              </SelectItem>
                              <SelectItem value='inactive'>
                                <div className='flex items-center'>
                                  <Badge variant='secondary' className='mr-2'>
                                    Inactive
                                  </Badge>
                                  <span>Customer is inactive</span>
                                </div>
                              </SelectItem>
                              <SelectItem value='suspended'>
                                <div className='flex items-center'>
                                  <Badge variant='destructive' className='mr-2'>
                                    Suspended
                                  </Badge>
                                  <span>Customer is suspended</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Details Tab */}
            <TabsContent value='contact' className='mt-6 space-y-6'>
              <Card>
                <CardHeader className='bg-muted/30 pb-3'>
                  <CardTitle className='text-lg flex items-center'>
                    <Mail className='mr-2 h-5 w-5 text-primary' />
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Edit the customer's contact details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder='Phone number' {...field} />
                          </FormControl>
                          <FormDescription>
                            Include country code (e.g., +1 for US)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='info.email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder='Email address' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='info.region'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value || ""}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select region' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='North'>North</SelectItem>
                              <SelectItem value='South'>South</SelectItem>
                              <SelectItem value='East'>East</SelectItem>
                              <SelectItem value='West'>West</SelectItem>
                              <SelectItem value='Central'>Central</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='md:col-span-2'>
                      <FormField
                        control={form.control}
                        name='info.note'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Add notes about this customer'
                                className='min-h-[120px]'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Include any special preferences or important
                              information about this customer.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value='documents' className='mt-6 space-y-6'>
              <Card>
                <CardHeader className='bg-muted/30 pb-3'>
                  <CardTitle className='text-lg flex items-center'>
                    <Shield className='mr-2 h-5 w-5 text-primary' />
                    Government ID
                  </CardTitle>
                  <CardDescription>
                    Update government identification information
                  </CardDescription>
                </CardHeader>
                <CardContent className='pt-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormField
                      control={form.control}
                      name='info.govId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Government ID number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='info.govExpire'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Expiration Date</FormLabel>
                          <DatePicker
                            date={field.value || undefined}
                            setDate={(date) => field.onChange(date)}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='md:col-span-2'>
                      <FormLabel>ID Document</FormLabel>
                      <div className='mt-2 flex flex-col md:flex-row gap-6'>
                        <div className='flex-1'>
                          {govIdImage ? (
                            <div className='relative h-48 w-full overflow-hidden rounded-md border bg-muted/30'>
                              <Image
                                src={govIdImage || "/placeholder.svg"}
                                alt='Government ID'
                                fill
                                className='object-cover'
                              />
                              <div className='absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center'>
                                <label
                                  htmlFor='govid-upload'
                                  className='cursor-pointer'>
                                  <div className='flex items-center gap-1 text-white font-medium px-3 py-1 bg-black/50 rounded-md'>
                                    <Upload className='h-4 w-4' />
                                    Change Image
                                  </div>
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div className='flex flex-col items-center justify-center h-48 w-full rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/30'>
                              <Upload className='h-8 w-8 text-muted-foreground mb-2' />
                              <label
                                htmlFor='govid-upload'
                                className='cursor-pointer'>
                                <div className='flex items-center gap-1 text-sm text-primary hover:underline'>
                                  Upload ID Document
                                </div>
                              </label>
                              <p className='text-xs text-muted-foreground mt-2'>
                                JPG, PNG or PDF, max 5MB
                              </p>
                            </div>
                          )}
                          <input
                            id='govid-upload'
                            type='file'
                            accept='image/*,application/pdf'
                            className='hidden'
                            onChange={handleGovIdImageUpload}
                          />
                        </div>
                        <div className='flex-1 flex flex-col justify-center'>
                          <div className='space-y-2'>
                            <div className='flex items-start gap-2'>
                              <AlertTriangle className='h-5 w-5 text-amber-500 mt-0.5' />
                              <div>
                                <p className='font-medium'>Important</p>
                                <p className='text-sm text-muted-foreground'>
                                  Make sure the ID document is clearly visible
                                  and all information is legible. Both the front
                                  and back of the ID should be included if
                                  applicable.
                                </p>
                              </div>
                            </div>
                            <Separator />
                            <p className='text-sm text-muted-foreground'>
                              Accepted ID types: Passport, Driver's License,
                              National ID Card
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className='flex justify-between items-center'>
            <Button
              variant='outline'
              type='button'
              onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className='mr-2 h-4 w-4' />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
