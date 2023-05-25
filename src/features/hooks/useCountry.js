import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  selectDetails,
  clearDetails,
  fetchCountryByName,
} from '../../features/details/detailsSlice';

export const useCountry = (name) => {
  const dispatch = useDispatch();
  const { currentCountry, error, status } = useSelector(selectDetails);

  useEffect(() => {
    dispatch(fetchCountryByName(name));

    return () => {
      dispatch(clearDetails());
    };
  }, [name, dispatch]);

  return { currentCountry, error, status };
};
