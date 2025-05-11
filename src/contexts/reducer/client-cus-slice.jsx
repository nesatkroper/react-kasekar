import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getClientCus = createApiThunk(
  "customer/getClientCus",
  "/customer/client"
);

const clientCustomerSlice = createGenericSlice(
  "customer/clients",
  getClientCus
);

export default clientCustomerSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  clientCustomerSlice.actions;
