import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from '../components/Button';
import CountryDetails from '../components/CountryDetails';

export const Details = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      <CountryDetails name={name} navigate={navigate} />
    </div>
  );
};
