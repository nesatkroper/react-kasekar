import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCustomers = createApiThunk(
  "customers/getCustomers",
  "/customer"
);

const customerSlice = createGenericSlice("customers", getCustomers, {
  meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
});

export default customerSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  customerSlice.actions;
