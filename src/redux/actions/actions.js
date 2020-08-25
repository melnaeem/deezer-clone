import * as actionTypes from './types';

import { createBrowserHistory } from 'history';

const deezerBaseUrl = 'https://api.deezer.com';
// Using CORSBroxy to handle requests from localhost
const CORSBroxyURL = 'https://cors-anywhere.herokuapp.com/';


export const history = new createBrowserHistory();


export const fetchGenresList = () => dispatch =>
  fetch(`${CORSBroxyURL + deezerBaseUrl}/genre`)
    .then(response => response.json())
    .then(({ data: genresList }) => {
      dispatch({
        type: actionTypes.SET_GENRES,
        payload: [...genresList]
      });
      return [...genresList]
    });

export const selectGenre = genre => dispatch => {
  dispatch({
    type: actionTypes.SELECT_GENRE,
    payload: { ...genre }
  });

  dispatch(fetchGenreArtists(genre.id));
  console.log(history.location);

  const genreAtristRoute = `/genres/${genre.id}`;
  genreAtristRoute !== history.location.pathname && history.push(genreAtristRoute);
}

export const fetchGenreArtists = genreId => dispatch => {
  fetch(`${CORSBroxyURL + deezerBaseUrl}/genre/${genreId}/artists`)
    .then(response => response.json())
    .then(({ data: artistsList }) => {
      dispatch({
        type: actionTypes.SET_GENRE_ARTISTS,
        payload: [...artistsList]
      })
    });
}

export const resetGenre = () => {
  const genresListRoute = '/genres';
  genresListRoute !== history.location.pathname && history.push(genresListRoute);
  return {
    type: actionTypes.RESET_GENRE,
    payload: {
      selectedGenre: {},
      artistsList: []
    }
  };
};
