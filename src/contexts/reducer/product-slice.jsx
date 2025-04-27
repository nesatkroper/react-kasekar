import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getProducts = createApiThunk("products/getProducts", "/product");

const productSlice = createGenericSlice("products", getProducts);

export default productSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  productSlice.actions;
