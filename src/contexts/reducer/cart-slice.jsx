import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCarts = createApiThunk("carts/getCarts", "/cart");

const cartSlice = createGenericSlice("carts", getCarts);

export default cartSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  cartSlice.actions;
