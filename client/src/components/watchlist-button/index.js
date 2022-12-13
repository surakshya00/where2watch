import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../../actions/utils';
import { AddToWatchlist, RemoveFromWatchlist } from '../../actions/watchlists';

function WatchlistEntry({ movie, watchlist }) {
  const [loading, setLoading] = useState(false);
  const isInWatchlist = watchlist.movies.some((x) => x.movieId === movie.id);

  const manageWatchlist = () => {
    setLoading(true);

    if (isInWatchlist) {
      RemoveFromWatchlist(watchlist.id, movie.id)
        .then(() => {
          mutate('/api/watchlists');
          mutate(`/api/watchlists/${watchlist.id}`);
        })
        .catch((e) => {
          alert(e.toString());
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      AddToWatchlist(watchlist.id, movie)
        .then(() => {
          mutate('/api/watchlists');
          mutate(`/api/watchlists/${watchlist.id}`);
        })
        .catch((e) => {
          alert(e.toString());
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box my="2">
      <Button
        w="100%"
        leftIcon={isInWatchlist ? <CheckIcon /> : null}
        isLoading={loading}
        onClick={manageWatchlist}
      >
        {watchlist.title}
      </Button>
    </Box>
  );
}

function WatchlistButton({ movie }) {
  const { data, error } = useSWR(`/api/watchlists`, fetcher);
  const isLoading = !error && !data;
  const watchlists = data?.watchlists || [];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="blue" size="sm" onClick={onOpen}>
        Add to Watchlist
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to watchlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading && <Spinner />}
            {error && (
              <Box textAlign="center" py="5">
                <Heading fontWeight="normal" fontSize="xl">
                  {error.toString()}
                </Heading>
              </Box>
            )}
            {watchlists.map((x) => (
              <WatchlistEntry movie={movie} watchlist={x} key={x.id} />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WatchlistButton;
