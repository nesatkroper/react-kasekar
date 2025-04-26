import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import DepartmentAdd from "./add";
import { DepartmentColumns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "@/contexts/reducer/department-slice";

const Department = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: depData, loading: depLoading } = useSelector(
    (state) => state.departments
  );

  useEffect(() => {
    dispatch(getDepartments({ params: { status: "all" } }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(getDepartments({ params: { status: "all" } }));
  };

  return (
    <Layout>
      <AppDataTable
        data={depData}
        addElement={
          <DepartmentAdd isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        }
        columns={DepartmentColumns()}
        loading={depLoading}
        refresh={refresh}
        title='Departments'
        main='departmentName'
      />
    </Layout>
  );
};

export default Department;
