import React, { useEffect } from "react";
import { getInventory } from "@/contexts/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Package, AlertTriangle, BarChart3 } from "lucide-react";
import LazyLoading from "@/components/app/loading";

export const InventoryStats = () => {
  const dispatch = useDispatch();
  const { data: inventory, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LazyLoading />
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground mb-1'>
                    Total Products
                  </p>
                  <div className='text-lg font-semibold'>
                    {inventory[0]?.productcount}
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Across {inventory[0]?.categorycount} categories
                  </p>
                </div>
                <div className='h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center'>
                  <Package className='h-5 w-5 text-blue-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground mb-1'>
                    Inventory Value
                  </p>
                  <div className='text-lg font-semibold'>
                    $ {inventory[0]?.totalentryprice}
                  </div>
                  <p className='text-xs mt-1'>
                    <span className='text-green-600 font-medium'>+2.5%</span>{" "}
                    from last month
                  </p>
                </div>
                <div className='h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center'>
                  <DollarSign className='h-5 w-5 text-green-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground mb-1'>
                    Low Stock Items
                  </p>
                  <div className='text-lg font-semibold'>
                    {inventory[0]?.productlowstock}
                  </div>
                  <p className='text-xs mt-1'>
                    <span className='text-red-600 font-medium'>+4</span> since
                    last week
                  </p>
                </div>
                <div className='h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center'>
                  <AlertTriangle className='h-5 w-5 text-yellow-600' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground mb-1'>
                    New Stock Entries
                  </p>
                  <div className='text-lg font-semibold'>
                    {inventory[0]?.recententrystock}
                  </div>
                  <p className='text-xs mt-1'>
                    <span className='text-green-600 font-medium'>+8</span> from
                    last week
                  </p>
                </div>
                <div className='h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center'>
                  <BarChart3 className='h-5 w-5 text-slate-600' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
