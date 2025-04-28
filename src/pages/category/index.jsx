import React, { useEffect, useState } from "react";
import Layout from "@/layout/index.jsx";
import ProductCategoryAdd from "./add.jsx";
import AppDataTable from "@/components/app/table/app-data-table.jsx";
import { CategoryColumns } from "./columns.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCache,
  getCategorys,
} from "@/contexts/reducer/category-slice.jsx";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: pcaData, loading: pcaLoading } = useSelector(
    (state) => state?.categories
  );

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCache());
    dispatch(getCategorys());
  };

  return (
    <Layout>
      <AppDataTable
        data={pcaData}
        columns={CategoryColumns()}
        title='Category'
        main='categoryName'
        loading={pcaLoading}
        refresh={refresh}
        add='Add Category'
        addElement={
          <ProductCategoryAdd
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        }
      />
    </Layout>
  );
};

export default ProductCategory;
