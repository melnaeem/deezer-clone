import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import genreReducer from "../redux/reducers/genre";

const initialState = {
  genresList: [],
  artistsList: [],
  selectedGenre: {},
  isArtistsModalOpen: false,
};

const store = createStore(genreReducer, initialState, applyMiddleware(thunk));

export default store;
