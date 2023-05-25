import { useSelector, useDispatch } from 'react-redux';

import { setRegion, selectRegion } from '../../features/controls/controlsSlice';

export const useControls = () => {
  const dispatch = useDispatch();
  const region = useSelector(selectRegion);
  const handleSelectRegion = (region) => {
    dispatch(setRegion(region?.value || ''));
  };

  return [region, handleSelectRegion];
};
