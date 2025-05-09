import React from "react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/layout";

const Cart = () => {
  return (
    <Layout>
      <div className='container mx-auto'>
        <div className='flex items-center gap-2 mb-4'>
          <Link to='/sale'>
            <Button variant='ghost' className='flex items-center gap-1'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
        </div>

        <div className='grid md:grid-cols-3 gap-4'>
          <div className='md:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle>Cart Items (3)</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Cart Item 1 */}
                <div className='flex gap-4'>
                  <div className='relative h-24 w-24 flex-shrink-0 rounded-md border overflow-hidden'>
                    <image
                      src='/placeholder.svg?height=100&width=100'
                      alt='Ergonomic Office Chair'
                      className='object-contain p-2'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-medium'>Ergonomic Office Chair</h3>
                    <p className='text-sm text-muted-foreground'>Black</p>
                    <div className='flex items-center justify-between mt-2'>
                      <div className='flex items-center border rounded-md'>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <Minus className='h-3 w-3' />
                        </Button>
                        <span className='w-8 text-center'>1</span>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <Plus className='h-3 w-3' />
                        </Button>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold'>$299.99</span>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-red-500'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cart Item 2 */}
                <div className='flex gap-4'>
                  <div className='relative h-24 w-24 flex-shrink-0 rounded-md border overflow-hidden'>
                    <image
                      src='/placeholder.svg?height=100&width=100'
                      alt='Wireless Headphones'
                      className='object-contain p-2'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-medium'>Wireless Headphones</h3>
                    <p className='text-sm text-muted-foreground'>Black</p>
                    <div className='flex items-center justify-between mt-2'>
                      <div className='flex items-center border rounded-md'>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <Minus className='h-3 w-3' />
                        </Button>
                        <span className='w-8 text-center'>1</span>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <Plus className='h-3 w-3' />
                        </Button>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold'>$149.99</span>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-red-500'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cart Item 3 */}
                <div className='flex gap-4'>
                  <div className='relative h-24 w-24 flex-shrink-0 rounded-md border overflow-hidden'>
                    <image
                      src='/placeholder.svg?height=100&width=100'
                      alt='Smart Watch'
                      className='object-contain p-2'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-medium'>Smart Watch</h3>
                    <p className='text-sm text-muted-foreground'>Silver</p>
                    <div className='flex items-center justify-between mt-2'>
                      <div className='flex items-center border rounded-md'>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <Minus className='h-3 w-3' />
                        </Button>
                        <span className='w-8 text-center'>1</span>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <Plus className='h-3 w-3' />
                        </Button>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-bold'>$199.99</span>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-red-500'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span className='font-medium'>$649.97</span>
                </div>
                <div className='flex justify-between'>
                  <span>Tax</span>
                  <span className='font-medium'>$52.00</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping</span>
                  <span className='font-medium'>$0.00</span>
                </div>
                <Separator />
                <div className='flex justify-between text-lg font-bold'>
                  <span>Total</span>
                  <span>$701.97</span>
                </div>

                <div className='pt-4'>
                  <div className='mb-4'>
                    <label
                      htmlFor='coupon'
                      className='block text-sm font-medium mb-1'>
                      Coupon Code
                    </label>
                    <div className='flex gap-2'>
                      <Input id='coupon' placeholder='Enter code' />
                      <Button variant='outline'>Apply</Button>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <label
                      htmlFor='employee'
                      className='block text-sm font-medium mb-1'>
                      Employee
                    </label>
                    <select
                      id='employee'
                      className='w-full px-3 py-2 border rounded-md'>
                      <option>Select Employee</option>
                      <option>John Doe</option>
                      <option>Jane Smith</option>
                    </select>
                  </div>

                  <div className='mb-4'>
                    <label
                      htmlFor='customer'
                      className='block text-sm font-medium mb-1'>
                      Customer
                    </label>
                    <select
                      id='customer'
                      className='w-full px-3 py-2 border rounded-md'>
                      <option>Select Customer</option>
                      <option>Alice Johnson</option>
                      <option>Bob Williams</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href='/invoice' className='w-full'>
                  <Button className='w-full'>Proceed to Checkout</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
