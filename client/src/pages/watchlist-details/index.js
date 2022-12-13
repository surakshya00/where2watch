import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../banner/Banner';

function WatchlistDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [id]);
  return (
    <div className="App">
      <Banner />
      <Heading>{id}</Heading>
    </div>
  );
}

export default WatchlistDetails;
