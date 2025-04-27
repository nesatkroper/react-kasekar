import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import ProductAdd from "./add.jsx";
import AppDataTable from "@/components/app/table/app-data-table.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ProductColumns } from "./columns.jsx";
import { clearCache, getProducts } from "@/contexts/reducer/product-slice.jsx";

const Product = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: proData, loading: proLoading } = useSelector(
    (state) => state?.products
  );

  useEffect(() => {
    dispatch(getProducts({ params: { category: true } }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCache());
    dispatch(getProducts({ params: { category: true } }));
  };

  console.log(proData);

  return (
    <Layout>
      <AppDataTable
        data={proData}
        columns={ProductColumns()}
        title='Product'
        main='productName'
        loading={proLoading}
        add='Add Product'
        refresh={refresh}
        addElement={
          <ProductAdd isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        }
      />
    </Layout>
  );
};

export default Product;
