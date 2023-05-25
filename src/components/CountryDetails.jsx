import { Info } from '../components/Info';
import { useCountry } from '../features/hooks/useCountry';

const CountryDetails = ({ name, navigate }) => {
  const { currentCountry, error, status } = useCountry(name);

  return (
    <>
      {' '}
      {error && <h2>Cannot fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </>
  );
};

export default CountryDetails;
