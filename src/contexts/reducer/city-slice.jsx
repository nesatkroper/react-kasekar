import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCities = createApiThunk("citys/getCities", "/city");

const citieSlice = createGenericSlice("citys", getCities);

export default citieSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  citieSlice.actions;
