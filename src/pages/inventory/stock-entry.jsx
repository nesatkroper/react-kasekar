import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getProductEntry } from "@/contexts/reducer";
import { AppDataTable } from "@/components/app/table";
import { useDispatch, useSelector } from "react-redux";
import { generateColumns } from "@/components/app/table";

export const StockEntries = () => {
  const dispatch = useDispatch();
  const { data: entry, loading } = useSelector((state) => state.entry);

  useEffect(() => {
    dispatch(getProductEntry({ params: { product: true, supplier: true } }));
  }, [dispatch]);

  console.log(entry);

  return (
    <AppDataTable
      data={entry}
      columns={EntryColumns()}
      loading={loading}
      title='Product Entry'
    />
  );
};

const EntryColumns = () => {
  const [t] = useTranslation("admin");
  return generateColumns(
    [
      { key: "entryDate", label: t("Date") },
      { key: "product.productName", label: t("Product") },
      { key: "supplier.supplierName", label: t("Spupplier") },
      { key: "entryPrice", label: t("Cost") },
      { key: "quantity", label: t("QTY") },
      { key: "memo", label: t("Note") },
      { key: "status", label: t("table.status") },
    ],
    "entry",
    getProductEntry
  );
};
