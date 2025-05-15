import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getInventory = createApiThunk(
  "inventorys/getInventory",
  "/inventory"
);

const InventorySlice = createGenericSlice("inventorys", getInventory, {
  meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
});

export default InventorySlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  InventorySlice.actions;
