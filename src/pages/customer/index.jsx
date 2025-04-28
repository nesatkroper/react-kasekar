import React, { useEffect, useState } from "react";
import AppDataTable from "@/components/app/table/app-data-table";
import Layout from "@/layout";
import CustomerAdd from "./add";
import { useDispatch, useSelector } from "react-redux";
import { CustomerColumns } from "./columns";
import { clearCache, getCustomers } from "@/contexts/reducer/customer-slice";

const Customer = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: cusData, loading: cusLoading } = useSelector(
    (state) => state.customers
  );

  const refresh = () => {
    dispatch(clearCache());
    dispatch(getCustomers({ params: { status: "all", info: true } }));
  };

  useEffect(() => {
    dispatch(getCustomers({ params: { status: "all", info: true } }));
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={cusData}
        loading={cusLoading}
        columns={CustomerColumns()}
        addElement={
          <CustomerAdd isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        }
        title='Customers'
        main='fullName'
        refresh={refresh}
      />
    </Layout>
  );
};

export default Customer;
