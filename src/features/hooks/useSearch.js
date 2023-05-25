import { useSelector, useDispatch } from 'react-redux';

import { setSearch, selectSearch } from '../../features/controls/controlsSlice';

export const useSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const handleSearch = (event) => {
    dispatch(setSearch(event.target.value));
  };

  return [search, handleSearch];
};
