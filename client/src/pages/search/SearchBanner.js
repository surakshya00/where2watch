import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Select as ChakraSelect,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import './SearchBanner.css';
import { GenreIdToName } from '../../utils/genres';

function getGenreOptions() {
  const options = [];

  for (const [key, value] of Object.entries(GenreIdToName)) {
    options.push({
      value: key,
      label: value,
    });
  }
  return options;
}

function SearchBanner({ isLoading, onSubmit }) {
  const [keyword, setKeyword] = useState('');
  const [genres, setGenres] = useState([]);
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [minRatings, setMinRatings] = useState('');
  const [maxRatings, setMaxRatings] = useState('');
  const [certification, setCertification] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('popularity');

  const submitForm = () => {
    const parsedKeywords = keyword.split(',').map((x) => x.trim());
    const parsedGenres = genres.map((x) => x.value);

    const payload = {
      keyword: parsedKeywords,
      genres: parsedGenres,
      minReleaseYear: minYear,
      maxReleaseYear: maxYear,
      minRatings,
      maxRatings,
      certification: [certification],
      sortBy,
      sortOrder,
      page: 1,
    };

    onSubmit(payload);
  };

  const genreOptions = getGenreOptions();

  return (
    <Box textColor="black" p="5" backgroundColor="white">
      <Heading textAlign="center" py="5" fontSize="xl">
        Search Movies
      </Heading>

      <Box
        display="flex"
        my="2"
        mx="2"
        flexDir={['column', null, 'row']}
        justifyContent="space-evenly"
      >
        <Box>
          <Heading size="sm" my="2">
            Keywords
          </Heading>
          <Input
            placeholder="romance,software"
            value={keyword}
            minW="320px"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </Box>

        <Box>
          <Heading size="sm" my="2">
            Genres
          </Heading>
          <Select
            className="filter_genres"
            isMulti
            onChange={(selectedGenres) => setGenres(selectedGenres)}
            value={genres}
            options={genreOptions}
            placeholder="Pick genre(s)"
          />
        </Box>
      </Box>

      <Box
        display="flex"
        my="2"
        mx="2"
        flexDir={['column', null, 'row']}
        justifyContent="space-evenly"
      >
        <Box>
          <Heading size="sm" my="2">
            Release Year
          </Heading>
          <Box display="flex" flexDir="row">
            <Input
              type="number"
              placeholder="Minimum Release Year"
              value={minYear}
              onChange={(e) => {
                setMinYear(e.target.value);
              }}
            />
            <Text fontSize="lg" mx="2">
              -
            </Text>
            <Input
              type="number"
              placeholder="Maximum Release Year"
              value={maxYear}
              onChange={(e) => {
                setMaxYear(e.target.value);
              }}
            />
          </Box>
        </Box>

        <Box>
          <Heading size="sm" my="2">
            Ratings
          </Heading>
          <Box display="flex" flexDir="row">
            <Input
              type="number"
              placeholder="Minimum Ratings"
              value={minRatings}
              onChange={(e) => {
                setMinRatings(e.target.value);
              }}
            />
            <Text fontSize="lg" mx="2">
              -
            </Text>
            <Input
              type="number"
              placeholder="Maximum Ratings"
              value={maxRatings}
              onChange={(e) => {
                setMaxRatings(e.target.value);
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        my="2"
        mx="2"
        flexDir={['column', null, 'row']}
        justifyContent="space-evenly"
      >
        <Box>
          <Heading size="sm" my="2">
            Certification
          </Heading>
          <ChakraSelect
            placeholder=""
            value={certification}
            onChange={(e) => setCertification(e.target.value)}
          >
            <option value="">Any</option>
            <option value="g">g</option>
            <option value="pg">pg</option>
            <option value="pg-13">pg-13</option>
            <option value="r">r</option>
            <option value="nc-19">nc-19</option>
          </ChakraSelect>
        </Box>

        <Box>
          <Heading size="sm" my="2">
            Sort By
          </Heading>
          <ChakraSelect
            placeholder=""
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="vote_average">Ratings</option>
            <option value="release_date">Release Date</option>
            <option value="original_title">Title</option>
          </ChakraSelect>
        </Box>

        <Box>
          <Heading size="sm" my="2">
            Sort Order
          </Heading>
          <ChakraSelect
            placeholder=""
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </ChakraSelect>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" my="5" onClick={submitForm}>
        <Button
          leftIcon={<SearchIcon />}
          isLoading={isLoading}
          colorScheme="blue"
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}

export default SearchBanner;
