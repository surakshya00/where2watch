import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import MovieCard from './moviecard';

function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <Box
        d="flex"
        flexDir="column"
        alignItems="center"
        fontSize="2xl"
        textAlign="center"
        my="5"
      >
        <Text fontSize="2xl">No Movies Found</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} w="100%" spacing="5" my="5" py="5">
      {movies.map((x) => (
        <MovieCard key={x.movieId} movie={x} />
      ))}
    </SimpleGrid>
  );
}

export default MovieGrid;
