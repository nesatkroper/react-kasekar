import React, { useEffect, useState } from "react";
import Layout from "@/layout";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/contexts/reducer";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Eye, Search, ShoppingCart, Filter, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { apiUrl } from "@/constants/api";
import { getAuthData } from "@/providers/user-provider";

const Sale = () => {
  const dispatch = useDispatch();
  const user = getAuthData();
  console.log(user);
  const { data: products, loading: proLoading } = useSelector(
    (state) => state?.products || {}
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(getProducts({ params: { category: true } }));
  }, [dispatch]);

  const categories = [
    { value: "all", label: "All Categories" },
    ...Array.from(
      new Set(products?.map((p) => p.category?.categoryName).filter(Boolean))
    ).map((name) => ({
      value: name,
      label: name,
    })),
  ];

  const filteredProducts = products
    ?.filter((product) => {
      const matchesCategory =
        categoryFilter === "all"
          ? true
          : product.category?.categoryName === categoryFilter;
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    ?.sort((a, b) => {
      if (sortOption === "price-low") return a.sellPrice - b.sellPrice;
      if (sortOption === "price-high") return b.sellPrice - a.sellPrice;
      if (sortOption === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0; // featured
    });

  const cartItemCount = 3;

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const formatPrice = (price) => {
    return Number.parseFloat(price).toFixed(2);
  };

  const calculateOriginalPrice = (price, discountRate) => {
    return formatPrice(price / (1 - discountRate / 100));
  };

  return (
    <Layout>
      <div className='mx-auto'>
        <div className='relative rounded-xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-700 mb-4'>
          <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg')] bg-center bg-cover"></div>
          <div className='relative z-10 px-6 py-8 md:py-10 md:px-12 text-white'>
            <h1 className='text-lg md:text-2xl font-bold mb-4'>
              Shop Our Premium Fertilizer
            </h1>
            <p className=' md:text-lg max-w-2xl '>
              Discover quality products at competitive prices with our
              satisfaction guarantee.
            </p>
          </div>
        </div>

        <header className='flex flex-col md:flex-row items-center justify-between mb-4 gap-2'>
          <div className='flex items-center gap-2'>
            {filteredProducts && (
              <Badge variant='outline' className='text-sm font-normal'>
                {filteredProducts.length} items
              </Badge>
            )}
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto'>
            <div className='relative w-full sm:w-64'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400' />
              <Input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-9 w-full'
              />
            </div>

            <div className='flex items-center gap-2 w-full sm:w-auto'>
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant='outline' size='sm' className='md:hidden'>
                    <Filter className='h-4 w-4 mr-2' />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side='left'>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down products by category and sort options
                    </SheetDescription>
                  </SheetHeader>
                  <div className='py-6 space-y-6'>
                    <div className='space-y-2'>
                      <h3 className='text-sm font-medium'>Categories</h3>
                      <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-sm font-medium'>Sort By</h3>
                      <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger>
                          <SelectValue placeholder='Sort by' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='featured'>Featured</SelectItem>
                          <SelectItem value='price-low'>
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value='price-high'>
                            Price: High to Low
                          </SelectItem>
                          <SelectItem value='newest'>Newest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className='hidden md:flex items-center gap-3'>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='featured'>Featured</SelectItem>
                    <SelectItem value='price-low'>
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value='price-high'>
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value='newest'>Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Link to='/cart'>
                <Button variant='outline' size='icon' className='relative'>
                  <ShoppingCart className='h-5 w-5' />
                  {cartItemCount > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <Separator className='mb-4' />

        {proLoading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {[...Array(8)].map((_, idx) => (
              <Card key={idx} className='animate-pulse border border-slate-200'>
                <div className='h-64 bg-slate-200' />
                <CardContent className='p-4'>
                  <div className='h-6 bg-slate-200 rounded w-3/4 mb-2' />
                  <div className='h-4 bg-slate-200 rounded w-1/2 mb-4' />
                  <div className='h-6 bg-slate-200 rounded w-1/4' />
                </CardContent>
                <CardFooter className='p-4 pt-0'>
                  <div className='h-10 bg-slate-200 rounded w-full' />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => (
                <Card
                  key={product.productId}
                  className='group overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300'>
                  <CardHeader className='p-0 relative'>
                    <div className='h-64 bg-slate-50 flex items-center justify-center overflow-hidden'>
                      <img
                        src={`${apiUrl}/uploads/${product.picture}`}
                        crossOrigin='anonymous'
                        alt={product.productName}
                        className='w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110'
                      />
                    </div>
                    {product.discountRate > 0 && (
                      <Badge className='absolute top-3 right-3 bg-red-500 hover:bg-red-600'>
                        {product.discountRate}% OFF
                      </Badge>
                    )}
                    <Button
                      size='icon'
                      className='absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-500'
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickView(product);
                      }}>
                      <Eye className='h-4 w-4' />
                    </Button>
                  </CardHeader>
                  <CardContent className='p-5'>
                    <div className='flex items-center text-amber-500 mb-2'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className='h-3.5 w-3.5 fill-current' />
                      ))}
                      <span className='text-xs text-slate-500 ml-1'>(24)</span>
                    </div>
                    <h3 className='font-medium text-base text-slate-900 line-clamp-1 mb-1 group-hover:text-slate-700'>
                      {product.productName}
                    </h3>
                    <p className='text-sm text-slate-500 mb-3'>
                      {product.category?.categoryName || "Uncategorized"}
                    </p>
                    <div className='flex items-center gap-2'>
                      <p className='text-lg font-bold text-slate-900'>
                        ${formatPrice(product.sellPrice)}
                      </p>
                      {product.discountRate > 0 && (
                        <p className='text-sm text-slate-500 line-through'>
                          $
                          {calculateOriginalPrice(
                            product.sellPrice,
                            product.discountRate
                          )}
                        </p>
                      )}
                    </div>
                    {product.capacity && (
                      <p className='text-xs text-slate-500 mt-1'>
                        {product.capacity} {product.unit || ""}
                      </p>
                    )}
                    <p className='text-xs mt-2'>
                      {product.stocks?.length > 0 ? (
                        <span className='text-emerald-600 font-medium'>
                          In Stock
                        </span>
                      ) : (
                        <span className='text-red-600 font-medium'>
                          Out of Stock
                        </span>
                      )}
                    </p>
                  </CardContent>
                  <CardFooter className='p-5 pt-0'>
                    <Button
                      className='w-full bg-slate-900 hover:bg-slate-800 text-white'
                      disabled={
                        product.status !== "active" || !product.stocks?.length
                      }>
                      <Plus className='h-4 w-4 mr-2' />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className='col-span-full flex flex-col items-center justify-center py-12'>
                <div className='bg-slate-100 p-4 rounded-full mb-4'>
                  <Search className='h-8 w-8 text-slate-400' />
                </div>
                <h3 className='text-xl font-medium text-slate-900 mb-2'>
                  No products found
                </h3>
                <p className='text-slate-500 text-center max-w-md mb-6'>
                  {`      We couldn't find any products matching your current filters or
                  search query.`}
                </p>
                <Button
                  variant='outline'
                  onClick={() => {
                    setCategoryFilter("all");
                    setSortOption("featured");
                    setSearchQuery("");
                  }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Quick View Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className='sm:max-w-[700px]'>
            <DialogHeader>
              <DialogTitle className='text-lg'>
                {selectedProduct?.productName}
              </DialogTitle>
              <DialogDescription>
                {selectedProduct?.category?.categoryName || "Uncategorized"}
              </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='bg-slate-50 rounded-lg p-6 flex items-center justify-center'>
                <img
                  src={`${apiUrl}/uploads/${selectedProduct?.picture}`}
                  alt={selectedProduct?.productName}
                  crossOrigin='anonymous'
                  className='w-full h-52 object-contain'
                />
              </div>
              <div className='space-y-5'>
                <div className='flex items-center text-amber-500'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className='h-4 w-4 fill-current' />
                  ))}
                  <span className='text-sm text-slate-500 ml-2'>
                    (24 reviews)
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <p className='text-2xl font-bold text-slate-900'>
                    $
                    {selectedProduct?.sellPrice &&
                      formatPrice(selectedProduct.sellPrice)}
                  </p>
                  {selectedProduct?.discountRate > 0 && (
                    <span className='text-sm text-slate-500 line-through'>
                      $
                      {selectedProduct?.sellPrice &&
                        calculateOriginalPrice(
                          selectedProduct.sellPrice,
                          selectedProduct.discountRate
                        )}
                    </span>
                  )}
                  {selectedProduct?.discountRate > 0 && (
                    <Badge className='bg-red-500 hover:bg-red-600 ml-2'>
                      {selectedProduct.discountRate}% OFF
                    </Badge>
                  )}
                </div>

                {selectedProduct?.capacity && (
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-700'>
                      Capacity:
                    </span>
                    <span className='text-sm text-slate-600'>
                      {selectedProduct.capacity} {selectedProduct.unit || ""}
                    </span>
                  </div>
                )}

                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-slate-700'>
                    Status:
                  </span>
                  {selectedProduct?.stocks?.length > 0 ? (
                    <span className='text-sm text-emerald-600 font-medium'>
                      In Stock
                    </span>
                  ) : (
                    <span className='text-sm text-red-600 font-medium'>
                      Out of Stock
                    </span>
                  )}
                </div>

                {selectedProduct?.desc && (
                  <div className='pt-2'>
                    <h4 className='text-sm font-medium text-slate-700 mb-1'>
                      Description:
                    </h4>
                    <p className='text-sm text-slate-600 leading-relaxed'>
                      {selectedProduct.desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                className='w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white'
                disabled={
                  selectedProduct?.status !== "active" ||
                  !selectedProduct?.stocks?.length
                }>
                <Plus className='h-4 w-4 mr-2' />
                Add to Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Sale;
