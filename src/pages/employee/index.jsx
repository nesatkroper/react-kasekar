import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import EmployeeAdd from "./add";
import AppDataTable from "@/components/app/table/app-data-table";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeColumns } from "./columns";
import { clearCache, getEmployees } from "@/contexts/reducer/employee-slice";

const Employee = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: empData, loading: empLoading } = useSelector(
    (state) => state?.employees
  );

  const refresh = async () => {
    dispatch(clearCache());
    dispatch(
      getEmployees({ params: { status: "all", info: true, position: true } })
    );
  };

  useEffect(() => {
    dispatch(
      getEmployees({ params: { status: "all", info: true, position: true } })
    );
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={empData}
        addElement={
          <EmployeeAdd isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        }
        columns={EmployeeColumns()}
        loading={empLoading}
        title='Employeese'
        add='Add Employee'
        main='fullName'
        refresh={refresh}
      />
    </Layout>
  );
};

export default Employee;
