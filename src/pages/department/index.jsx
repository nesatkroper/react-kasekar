import React, { useEffect, useState } from "react";
import Layout from "@/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import DepartmentAdd from "./add";
import ForbiddenPage from "@/components/app/403";
import { DepartmentColumns } from "./columns";
import { useDispatch, useSelector } from "react-redux";
import { useRoles } from "@/hooks/use-role";
import {
  clearCache,
  getDepartments,
} from "@/contexts/reducer/department-slice";

const Department = () => {
  const dispatch = useDispatch();
  const { hasRole, hasHigherOrEqualRole, ROLES } = useRoles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: depData, loading: depLoading } = useSelector(
    (state) => state.departments
  );

  const canView =
    hasHigherOrEqualRole(ROLES.MANAGEMENT) || hasRole(ROLES.ADMIN);

  const refresh = () => {
    dispatch(clearCache());
    dispatch(getDepartments({ params: { status: "all" } }));
  };

  useEffect(() => {
    if (canView) dispatch(getDepartments({ params: { status: "all" } }));
  }, [dispatch, canView]);

  if (!canView) return <ForbiddenPage />;

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
