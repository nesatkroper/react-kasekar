import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import PositionAdd from "./add";
import { clearCache, getPositions } from "@/contexts/reducer/position-slice";
import { PositionColumns } from "./columns";
import { useDispatch, useSelector } from "react-redux";

const Position = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: posData, loading: posLoading } = useSelector(
    (state) => state.positions
  );

  const refresh = () => {
    dispatch(clearCache());
    dispatch(getPositions({ params: { status: "all", department: true } }));
  };

  useEffect(() => {
    dispatch(
      getPositions({
        params: { status: "all", department: true },
      })
    );
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={posData}
        columns={PositionColumns()}
        loading={posLoading}
        addElement={
          <PositionAdd isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        }
        title='Positions'
        main='positionName'
        refresh={refresh}
      />
    </Layout>
  );
};

export default Position;
