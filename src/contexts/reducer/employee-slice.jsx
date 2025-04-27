import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getEmployees = createApiThunk(
  "employees/getEmployees",
  "/employee"
);

const employeeSlice = createGenericSlice("employees", getEmployees, {
  meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
});

export default employeeSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  employeeSlice.actions;
