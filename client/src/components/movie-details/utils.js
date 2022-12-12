import { GenreIdToName } from '../../utils/genres';

export function getReleaseYear(releaseDate) {
  if (releaseDate) {
    return releaseDate.split('-')[0];
  }
  return '';
}

export function getGenreName(genreId) {
  if (genreId in GenreIdToName) {
    return GenreIdToName[genreId];
  }
  return '';
}
