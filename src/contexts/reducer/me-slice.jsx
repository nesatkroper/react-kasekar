import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getMe = createApiThunk("/me/getMe", "/auth/me");

const meSlice = createGenericSlice("/auth/mes", getMe);

export default meSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  meSlice.actions;
