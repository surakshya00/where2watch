import { useEffect, useState } from 'react';
import { Box, Text, Wrap, WrapItem, Image, Spinner } from '@chakra-ui/react';

const PROVIDER_IMAGE_URL = 'https://image.tmdb.org/t/p/w45';

async function getMovieProviders(movieId) {
  const response = await fetch(`/api/movies/${movieId}/providers`);
  const responseJSON = await response.json();

  if (response.status === 200) {
    return responseJSON['providers'];
  }

  throw new Error(responseJSON?.message || 'Failed to retrieve movie videos');
}

function Provider({ type, providers }) {
  return (
    <Box my="1">
      <Text fontSize="bold">{type}</Text>
      <Wrap>
        {providers.map((x) => {
          const { provider_id, logo_path, provider_name } = x;
          const imgUrl = `${PROVIDER_IMAGE_URL}${logo_path}`;
          return (
            <WrapItem key={provider_id}>
              <Image src={imgUrl} title={provider_name} alt={provider_name} />
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
}

function MovieProviders({ id }) {
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState({});

  useEffect(() => {
    setLoading(true);
    getMovieProviders(id)
      .then((foundProviders) => {
        setProviders(foundProviders);
      })
      .catch((e) => {
        alert(e.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner color="white" />;
  }

  return (
    <Box>
      {providers?.flatrate && (
        <Provider type="Stream" providers={providers.flatrate} />
      )}
      {providers?.rent && <Provider type="Rent" providers={providers.rent} />}
      {providers?.buy && <Provider type="Buy" providers={providers.buy} />}
    </Box>
  );
}

export default MovieProviders;
