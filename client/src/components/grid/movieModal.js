import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { fetcher } from '../../actions/utils';
import MovieDetails from '../movie-details';

function MovieModal({ movieId, onClose, isOpen }) {
  const { data, error } = useSWR(`/api/movies/${movieId}`, fetcher);

  const isLoading = !data && !error;
  const movie = data?.movie;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent backgroundColor="black">
        <ModalCloseButton color="white" />

        <ModalBody textColor="white">
          {isLoading && (
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
          {movie && <MovieDetails movie={movie} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MovieModal;
