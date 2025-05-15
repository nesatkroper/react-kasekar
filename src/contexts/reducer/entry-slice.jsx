import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getProductEntry = createApiThunk(
  "entrys/getProductEntry",
  "/entry"
);

const ProductEntrySlice = createGenericSlice("entrys", getProductEntry, {
  meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
});

export default ProductEntrySlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  ProductEntrySlice.actions;
