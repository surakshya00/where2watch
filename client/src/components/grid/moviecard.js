import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import MovieModal from './movieModal';

const POSTER_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  const posterSrc = `${POSTER_IMAGE_URL}${movie.moviePoster}`;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        h="325px"
        w="100%"
        maxW="225px"
        mx="auto"
        bg="white"
        borderRadius="lg"
        cursor="pointer"
        onClick={onOpen}
      >
        <Image
          src={posterSrc}
          alt={movie.movieTitle}
          title={movie.movieTitle}
          w="100%"
          h="100%"
          objectFit="cover"
          borderRadius="lg"
        />
      </Box>

      {isOpen && (
        <MovieModal movieId={movie.movieId} onClose={onClose} isOpen />
      )}
    </>
  );
}

export default MovieCard;
