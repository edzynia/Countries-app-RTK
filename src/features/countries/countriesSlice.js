import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk(
  '@@countries/fetch-countries',
  async (_, { extra: { client, api } }) => {
    const { data } = await client.get(api.ALL_COUNTRIES);
    return data;
  },
);

const initialState = {
  status: 'idle', //loading| received | rejected
  error: null,
  list: [],
};
const countrySlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'received';
      })
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      });
  },
});

export const countryReducer = countrySlice.reducer;

//selectors
export const selectCountriesAll = (state) => state.countries.list;
export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});
export const selectSearchCountries = (state, { search = '', region = '' }) => {
  return state.countries.list.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) &&
      country.region.includes(region),
  );
};
