import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCountriesInfo,
  selectSearchCountries,
  fetchCountries,
} from '../../features/countries/countriesSlice';
import { selectAllControls } from '../../features/controls/controlsSlice';

export const useCountries = () => {
  const dispatch = useDispatch();
  const { search, region } = useSelector(selectAllControls);
  const countries = useSelector((state) =>
    selectSearchCountries(state, { search, region }),
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(fetchCountries());
    }
  }, [dispatch, qty]);
  return [countries, { status, error }];
};
