import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCustomerInfos = createApiThunk(
  "customers/getCustomerInfos",
  "/customer/info"
);

const customerInfoSlice = createGenericSlice(
  "customer/infos",
  getCustomerInfos,
  {
    meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
  }
);

export default customerInfoSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  customerInfoSlice.actions;
