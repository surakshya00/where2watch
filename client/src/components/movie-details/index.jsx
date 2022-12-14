import { useEffect, useState } from 'react';
import {
  Heading,
  Box,
  Text,
  Divider,
  Stat,
  StatNumber,
  StatLabel,
  Tag,
  CloseButton,
} from '@chakra-ui/react';
import YouTube from 'react-youtube';
import { getGenreName, getReleaseYear } from './utils';
import MovieProviders from '../providers';
import WatchlistButton from '../watchlist-button';

const youtubeVideoConfig = {
  height: '500',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

async function getMovieVideos(movieId) {
  const response = await fetch(`/api/movies/${movieId}/videos`);
  const responseJSON = await response.json();

  if (response.status === 200) {
    return responseJSON['videos'];
  }

  throw new Error(responseJSON?.message || 'Failed to retrieve movie videos');
}

function MovieDetails({ movie, onClose, showCloseButton }) {
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    getMovieVideos(movie.id).then((videos) => {
      const trailers = videos.filter((x) => x.type === 'Trailer');
      if (trailers.length > 0) {
        setTrailerUrl(trailers[0].key);
      }
    });
  }, [movie.id]);

  const { release_date, original_title, vote_average, overview } = movie;

  const releaseYear = getReleaseYear(release_date);
  const genreIds =
    movie.genre_ids || (movie.genres && movie.genres.map((x) => x.id)) || [];

  return (
    <Box p="5" mb="5" backgroundColor="black">
      {showCloseButton && (
        <CloseButton
          size="xl"
          color="white"
          my="3"
          onClick={onClose}
          float="right"
        />
      )}

      {trailerUrl && <YouTube videoId={trailerUrl} opts={youtubeVideoConfig} />}

      <Heading size="lg" my="2">
        {original_title}
      </Heading>

      <WatchlistButton movie={movie} />

      {/* Movie Genres */}
      <Box display="flex" flexDir="row" my="4">
        {genreIds.map((x) => (
          <Tag key={x} mr="3" size="sm">
            {getGenreName(x)}
          </Tag>
        ))}
      </Box>

      {/* Metadata about the movie */}
      <Box maxW="800px">
        <Box
          fontSize="xs"
          my="1"
          display="flex"
          flexDir="row"
          justifyContent="flex-start"
        >
          <Stat>
            <StatLabel>Release Year</StatLabel>
            <StatNumber>{releaseYear}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Ratings</StatLabel>
            <StatNumber>{vote_average}</StatNumber>
          </Stat>
        </Box>

        <Divider my="4" />

        <Text my="3">{overview}</Text>

        <Box my="5">
          <Heading size="sm">Providers</Heading>
          <MovieProviders id={movie.id} />
        </Box>
      </Box>
    </Box>
  );
}

export default MovieDetails;
