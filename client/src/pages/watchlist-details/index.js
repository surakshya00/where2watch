import { Box, Button, Heading, Spinner } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Banner from '../banner/Banner';
import { fetcher } from '../../actions/utils';
import { DeleteWatchlist } from '../../actions/watchlists';
import MovieGrid from '../../components/grid';

function Watchlist({ watchlist }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { title, movies } = watchlist;

  const deleteWatchlistOnClick = () => {
    setLoading(true);
    DeleteWatchlist(watchlist.id)
      .then(() => {
        navigate('/watchlist');
        mutate('/api/watchlists');
      })
      .catch((e) => {
        alert(e.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box>
      <Heading textAlign="center">{title}</Heading>

      <Box display="flex" justifyContent="center" my="5">
        <Button
          colorScheme="red"
          size="sm"
          onClick={deleteWatchlistOnClick}
          isLoading={loading}
        >
          Delete Watchlist
        </Button>
      </Box>

      <MovieGrid movies={movies} loading={false} />
    </Box>
  );
}

function WatchlistDetails() {
  const { id } = useParams();
  const { data, error } = useSWR(`/api/watchlists/${id}`, fetcher);

  const loading = !error && !data;
  const watchlist = data?.watchlist;

  return (
    <div className="App">
      <Banner />

      <Box bgColor="black" minH="100vh" textColor="white" p="5">
        {loading && (
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            flexDir="row"
            py="5"
          >
            <Spinner color="white" size="xl" />
          </Box>
        )}
        {error && (
          <Box textAlign="center" py="5">
            <Heading fontWeight="normal" fontSize="xl">
              {error.toString()}
            </Heading>
          </Box>
        )}
        {watchlist && <Watchlist watchlist={watchlist} />}
      </Box>
    </div>
  );
}

export default WatchlistDetails;
