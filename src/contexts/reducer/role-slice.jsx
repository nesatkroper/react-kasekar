import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getRoles = createApiThunk("roles/getRoles", "/role");

const roleSlice = createGenericSlice("roles", getRoles);

export default roleSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  roleSlice.actions;
