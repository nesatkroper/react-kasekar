import React, { useEffect, useState } from "react";
import Layout from "@/layout";
import { Button } from "@/components/ui/button";
import { Overview } from "@/pages/inventory/overview";
import { Card, CardContent } from "@/components/ui/card";
import { InventoryStats } from "@/pages/inventory/state";
import { LayoutGrid, List } from "lucide-react";
import { StockEntries } from "@/pages/inventory/stock-entry";
import { ProductsTable } from "@/pages/inventory/product-table";
import { StockMovements } from "@/pages/inventory/stock-movement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/contexts/reducer";

const Inventory = () => {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    dispatch(getProducts({ param: { entry: true } }));
  }, [dispatch]);

  // console.log(products);

  return (
    <Layout>
      <div className='flex flex-col'>
        <div className='flex-1 space-y-4'>
          <InventoryStats products={products} />

          <div>
            <Tabs
              defaultValue='overview'
              className='space-y-4'
              value={activeTab}
              onValueChange={setActiveTab}>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-2'>
                <TabsList>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='products'>Products</TabsTrigger>
                  <TabsTrigger value='stock'>Stock Entries</TabsTrigger>
                  <TabsTrigger value='movements'>Movements</TabsTrigger>
                </TabsList>

                {activeTab === "products" && (
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setViewMode("grid")}
                      className={viewMode === "grid" ? "bg-muted" : ""}>
                      <LayoutGrid className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setViewMode("table")}
                      className={viewMode === "table" ? "bg-muted" : ""}>
                      <List className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>

              <TabsContent value='overview' className='space-y-6 mt-6'>
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-7'>
                  <Card className='col-span-4'>
                    <CardContent className='p-6'>
                      <h3 className='text-emerald-700 font-medium mb-4'>
                        Inventory Overview
                      </h3>
                      <p className='text-sm text-muted-foreground mb-6'>
                        Stock levels across all product categories
                      </p>
                      <Overview />
                    </CardContent>
                  </Card>
                  <Card className='col-span-3'>
                    <CardContent className='p-4'>
                      <h3 className='text-lg font-medium mb-4'>
                        Recent Stock Movements
                      </h3>
                      <p className='text-sm text-muted-foreground mb-6'>
                        Latest product movements in your inventory
                      </p>
                      <StockMovements limit={5} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value='products' className='space-y-6 mt-6'>
                <Card>
                  <CardContent className='p-6'>
                    <h3 className='text-lg font-medium mb-4'>
                      Products Inventory
                    </h3>
                    <p className='text-sm text-muted-foreground mb-6'>
                      Manage your product catalog and stock levels
                    </p>
                    <ProductsTable searchQuery={searchQuery} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='stock' className='space-y-6 mt-6'>
                <Card>
                  <CardContent className='p-6'>
                    <h3 className='text-lg font-medium mb-4'>Stock Entries</h3>
                    <p className='text-sm text-muted-foreground mb-6'>
                      Track all stock additions and inventory updates
                    </p>
                    <StockEntries searchQuery={searchQuery} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='movements'>
                <Card>
                  <CardContent className='p-4'>
                    <h3 className='text-lg font-medium'>Stock Movements</h3>
                    <p className='text-sm text-muted-foreground'>
                      Track all product movements in and out of inventory
                    </p>
                    <StockMovements searchQuery={searchQuery} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;
