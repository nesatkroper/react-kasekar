import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getDepartments = createApiThunk(
  "departments/getDepartments",
  "/department"
);

const departmentSlice = createGenericSlice("departments", getDepartments, {
  meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
});

export default departmentSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  departmentSlice.actions;
