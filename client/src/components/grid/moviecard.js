import { Box, Image } from '@chakra-ui/react';

const POSTER_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  const posterSrc = `${POSTER_IMAGE_URL}${movie.moviePoster}`;

  return (
    <Box
      h="325px"
      w="100%"
      maxW="225px"
      mx="auto"
      bg="white"
      borderRadius="lg"
      cursor="pointer"
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
  );
}

export default MovieCard;
