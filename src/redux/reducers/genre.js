import * as actionTypes from '../actions/types'


const genreReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_GENRES:
      return {
        ...state,
        genresList: action.payload
      };
    case actionTypes.SELECT_GENRE:
      return {
        ...state,
        selectedGenre: action.payload,
        isArtistsModalOpen: true
      };
    case actionTypes.SET_GENRE_ARTISTS:
      return {
        ...state,
        artistsList: action.payload
      };
    case actionTypes.RESET_GENRE:
      return {
        ...state,
        artistsList: action.payload.artistsList,
        selectedGenre: action.payload.selectedGenre,
        isArtistsModalOpen: false
      };

    default:
      return {
        ...state
      };
  }
}

export default genreReducer;