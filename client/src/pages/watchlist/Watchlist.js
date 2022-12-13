import React, { useState } from 'react';
import useSWR from 'swr';
import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';

import Banner from '../banner/Banner';
import { CreateWatchlist } from '../../actions/watchlists';
import { mutate } from 'swr';
import { fetcher } from '../../actions/utils';
import { useNavigate } from 'react-router-dom';

function AddWatchlist() {
  const [newWatchlist, setNewWatchlist] = useState('');
  const [loading, setLoading] = useState(false);

  const createWatchlist = () => {
    setLoading(true);
    CreateWatchlist(newWatchlist)
      .then(() => {
        mutate('/api/watchlists');
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => {
        setNewWatchlist('');
        setLoading(false);
      });
  };

  return (
    <Box py="5" m="5" display="flex" flexDirection="row">
      <Input
        placeholder="All time favs"
        maxW="400px"
        mr="3"
        color="white"
        value={newWatchlist}
        onChange={(e) => setNewWatchlist(e.target.value)}
      />
      <Button onClick={createWatchlist} isLoading={loading}>
        Create Watchlist
      </Button>
    </Box>
  );
}

function WatchlistCard({ watchlist }) {
  const navigate = useNavigate();

  const openWatchlist = () => {
    navigate(`/watchlist/${watchlist.id}`);
  };

  return (
    <Box
      backgroundColor="white"
      m="5"
      py="5"
      w="100%"
      rounded="2xl"
      textAlign="center"
      _hover={{
        cursor: 'pointer',
      }}
      onClick={openWatchlist}
    >
      <Heading size="sm">{watchlist.title}</Heading>
      <Divider bgColor="black" my="2" />
      <Text align="center" fontSize="sm">
        {watchlist.movies.length} movies
      </Text>
    </Box>
  );
}

function Watchlist() {
  const { data, error } = useSWR(`/api/watchlists`, fetcher);
  const isLoading = !error && !data;
  const watchlists = data?.watchlists;

  const watchlistCards = (watchlists || []).map((x) => (
    <WatchlistCard watchlist={x} key={x.id} />
  ));

  if (error) {
    alert(error.toString());
  }

  return (
    <div className="App">
      <Banner />

      <Box backgroundColor="black" minH="100vh" p="5">
        {isLoading && (
          <Box
            w="100%"
            display="flex"
            justifyContent="center"
            flexDir="row"
            my="5"
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

        {!isLoading && !error && !watchlists && (
          <Box display="flex" justifyContent="center" my="5">
            <Text color="white">No watchlists available. Create one below</Text>
          </Box>
        )}

        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {watchlistCards}
        </Grid>

        <Divider my="5" />

        <AddWatchlist />
      </Box>
    </div>
  );
}

export default Watchlist;
