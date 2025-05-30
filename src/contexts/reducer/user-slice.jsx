import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getUsers = createApiThunk(
  "/auth/all-auth/getUsers",
  "/auth/all-auth"
);

const UsersSlice = createGenericSlice("/auth/all-auth", getUsers);

export default UsersSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  UsersSlice.actions;
