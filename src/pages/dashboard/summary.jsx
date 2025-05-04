import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowUp, Droplets, Package, Truck } from "lucide-react";

const Summary = () => {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Total Inventory Value
          </CardTitle>
          <Package className='h-6 w-6 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-xl font-bold'>$45,231.89</div>
          <p className='text-sm text-muted-foreground'>
            <span className='text-green-500 flex items-center'>
              <ArrowUp className='mr-1 h-6 w-6' />
              +20.1%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Low Stock Items</CardTitle>
          <AlertTriangle className='h-6 w-6 text-amber-500' />
        </CardHeader>
        <CardContent>
          <div className='text-xl font-bold'>7</div>
          <p className='text-sm text-muted-foreground'>
            <span className='text-red-500 flex items-center'>
              <ArrowUp className='mr-1 h-6 w-6' />
              +3
            </span>
            from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Upcoming Deliveries
          </CardTitle>
          <Truck className='h-6 w-6 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-xl font-bold'>5</div>
          <p className='text-sm text-muted-foreground'>
            Next delivery in 2 days
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Application Efficiency
          </CardTitle>
          <Droplets className='h-6 w-6 text-blue-500' />
        </CardHeader>
        <CardContent>
          <div className='text-xl font-bold'>92%</div>
          <p className='text-sm text-muted-foreground'>
            <span className='text-green-500 flex items-center'>
              <ArrowUp className='mr-1 h-6 w-6' />
              +5.2%
            </span>
            from target
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
