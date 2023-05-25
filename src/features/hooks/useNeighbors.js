import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchNeighbors, selectNeighbors } from '../details/detailsSlice';

export const useNeighbors = (borders = []) => {
  const dispatch = useDispatch();
  const neighbors = useSelector(selectNeighbors);

  useEffect(() => {
    if (borders.length > 0) {
      dispatch(fetchNeighbors(borders));
    }
  }, [borders, dispatch]);

  return neighbors;
};
