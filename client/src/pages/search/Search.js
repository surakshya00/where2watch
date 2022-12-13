import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SearchMovies } from '../../actions/search';
import MovieGrid from '../../components/grid';
import Banner from '../banner/Banner';
import SearchBanner from '../search/SearchBanner';

function Search() {
  const [loading, setLoading] = useState(false);
  const [lastSearchFilters, setLastSearchFilters] = useState(null);
  const [movies, setMovies] = useState([]);

  const searchMovies = (filters) => {
    setLoading(true);
    setMovies([]);
    setLastSearchFilters(null);

    SearchMovies(filters)
      .then((result) => {
        const parsedMovies = result.map((x) => {
          return {
            movieId: x.id,
            moviePoster: x.poster_path,
            movieTitle: x.original_title,
          };
        });
        setMovies(parsedMovies);
        setLastSearchFilters(filters);
      })
      .catch((e) => {
        alert(e.toString());
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(false);
  };

  const loadMovies = () => {
    if (lastSearchFilters) {
      const filters = structuredClone(lastSearchFilters);
      filters.page += 1;

      setLoading(true);

      SearchMovies(filters)
        .then((result) => {
          const parsedMovies = result.map((x) => {
            return {
              movieId: x.id,
              moviePoster: x.poster_path,
              movieTitle: x.original_title,
            };
          });
          setMovies([...movies, ...parsedMovies]);
          setLastSearchFilters(filters);
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
    <div className="App">
      <Banner />
      <SearchBanner onSubmit={searchMovies} isLoading={loading} />
      <Box backgroundColor="black" p="5" textColor="white">
        <MovieGrid movies={movies} />
        {lastSearchFilters && movies && movies.length > 0 && (
          <Box display="flex" justifyContent="center" my="5">
            <Button colorScheme="blue" onClick={loadMovies} isLoading={loading}>
              Load more
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Search;
