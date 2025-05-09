import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Overview } from "@/pages/inventory/overview";
import { ProductsTable } from "@/pages/inventory/product-table";
import { StockMovements } from "@/pages/inventory/stock-movement";
import { StockEntries } from "@/pages/inventory/stock-entry";
import { InventoryStats } from "@/pages/inventory/state";
import { InventorySearch } from "@/pages/inventory/search";
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutGrid, List } from "lucide-react";
import Layout from "@/layout";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <Layout>
      <div className='flex flex-col'>
        <div className='flex-1 space-y-4'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h2 className='text-lg font-semibold tracking-tight'>
                Inventory Management
              </h2>
              <p className='text-sm text-muted-foreground mt-1'>
                Manage your products, stock levels, and inventory movements
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <InventorySearch onSearch={setSearchQuery} />
              <Button>
                <PlusCircle className='mr-2 h-4 w-4' />
                Add Product
              </Button>
            </div>
          </div>

          <InventoryStats />

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
