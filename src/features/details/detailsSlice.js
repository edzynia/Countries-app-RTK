import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCountryByName = createAsyncThunk(
  '@@details/fetch-by-name',
  async (name, { extra: { client, api } }) => {
    const { data } = await client.get(api.searchByCountry(name));
    return data;
  },
);

export const fetchNeighbors = createAsyncThunk(
  '@@details/fetch-neighbors',
  async (borders, { extra: { client, api } }) => {
    const { data } = await client.get(api.filterByCode(borders));
    return data;
  },
);

const initialState = {
  status: 'idle', //loading| received | rejected
  error: null,
  currentCountry: null,
  neighbors: [],
};

export const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryByName.fulfilled, (state, action) => {
        state.currentCountry = action.payload[0];
        state.status = 'received';
      })
      .addCase(fetchCountryByName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCountryByName.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(fetchNeighbors.fulfilled, (state, action) => {
        state.neighbors = action.payload.map((item) => item.name);
        state.status = 'received';
      })
      .addCase(fetchNeighbors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNeighbors.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

//selectors
export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
