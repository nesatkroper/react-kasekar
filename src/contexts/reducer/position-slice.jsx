import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getPositions = createApiThunk(
  "positions/getPositions",
  "/position",
  {
    cacheEnabled: true,
    cacheExpiration: 24 * 60 * 60 * 1000,
  }
);

const positionSlice = createGenericSlice("positions", getPositions, {
  meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
});

export default positionSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem, updateNestedItem } =
  positionSlice.actions;
