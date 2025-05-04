import axiosInstance from "@/lib/axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createApiThunk = (name, endpoint, options = {}) => {
  const { isPrismaEndpoint = false } = options;

  return createAsyncThunk(
    name,
    async (
      { id, params = {}, payload, method = "GET" } = {},
      { rejectWithValue }
    ) => {
      try {
        let response;
        const queryParams = new URLSearchParams(params).toString();

        switch (method) {
          case "GET": {
            let url;
            if (isPrismaEndpoint) {
              url = id ? `${endpoint}/${id}` : endpoint;
              response = await axiosInstance.get(url, { params });
              console.log(url);
            } else {
              url = id
                ? `${endpoint}/${id}?${queryParams}`
                : `${endpoint}?${queryParams}`;
              response = await axiosInstance.get(url);
              console.log(url);
            }
            break;
          }
          case "POST":
            response = await axiosInstance.post(endpoint, payload);
            break;
          case "PUT":
            response = await axiosInstance.put(`${endpoint}/${id}`, payload);
            break;
          case "DELETE":
            response = await axiosInstance.delete(`${endpoint}/${id}`);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        let apiData, meta;
        if (isPrismaEndpoint) {
          apiData = response.data.data || response.data;
          meta = response.data.meta || {
            total: Array.isArray(apiData) ? apiData.length : 1,
            page: params.page || 1,
            limit: params.limit || 10,
            totalPages: params.limit
              ? Math.ceil(
                  (response.data.meta?.total || apiData.length) / params.limit
                )
              : 1,
          };
        } else {
          apiData = response.data?.data || response.data;
          meta = response.data?.meta || {
            total: response.data?.data?.length || 0,
            page: 1,
            limit: 10,
            totalPages: 0,
          };
        }

        return {
          data: Array.isArray(apiData) ? apiData : [apiData],
          meta,
        };
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
};

export const createGenericSlice = (name, apiThunk, initialState = {}) => {
  const initialCacheState = {
    data: [],
    meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    loading: false,
    error: null,
    lastFetched: null,
    ...initialState,
  };

  const slice = createSlice({
    name,
    initialState: initialCacheState,
    reducers: {
      clearCache: (state) => {
        Object.assign(state, initialCacheState);
      },
      updateItem: (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }
      },
      addItem: (state, action) => {
        state.data.unshift(action.payload);
        state.meta.total += 1;
      },
      removeItem: (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.meta.total = Math.max(0, state.meta.total - 1);
      },
      updateNestedItem: (state, action) => {
        const { id, path, value } = action.payload;
        const item = state.data.find((item) => item.id === id);
        if (item) {
          const pathParts = path.split(".");
          let current = item;
          for (let i = 0; i < pathParts.length - 1; i++) {
            if (!current[pathParts[i]]) {
              current[pathParts[i]] = {};
            }
            current = current[pathParts[i]];
          }
          current[pathParts[pathParts.length - 1]] = value;
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(apiThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(apiThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload.data || [];
          state.meta = action.payload.meta || initialCacheState.meta;
          state.lastFetched = Date.now();
        })
        .addCase(apiThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  return slice;
};
