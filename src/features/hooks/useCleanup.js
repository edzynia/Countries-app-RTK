import { useDispatch } from 'react-redux';
import { clearControls } from '../controls/controlsSlice';

export const useCleanup = () => {
  const dispatch = useDispatch();

  const cleanUp = () => {
    dispatch(clearControls());
  };

  return cleanUp;
};
