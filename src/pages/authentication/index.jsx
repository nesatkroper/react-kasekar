import React, { useEffect, useState } from "react";
import AppDataTable from "@/components/app/table/app-data-table";
import AuthenticationAdd from "./add";
import Layout from "@/layout";
import { getAuth } from "@/contexts/reducer/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticationColumns } from "./columns";

const Authentication = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { authData, authLoading } = useSelector((state) => state.auths);

  useEffect(() => {
    dispatch(getAuth({ params: { employee: true } }));
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={authData}
        loading={authLoading}
        columns={AuthenticationColumns()}
        addElement={
          <AuthenticationAdd
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        }
        title='Authentication'
        main='email'
      />
    </Layout>
  );
};

export default Authentication;
