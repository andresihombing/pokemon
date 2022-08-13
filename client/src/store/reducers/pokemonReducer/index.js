import { ActionTypes } from "../../constants";

const initialState = {
  pokemonList: [],
  detailPokemon: {},
  probability: false,
  catchPokemon: {},
  renamePokemon: {},
  release: {},
  error: "",
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: action.payload,
      };

    case ActionTypes.SET_DETAIL_POKEMON:
      return {
        ...state,
        detailPokemon: action.payload,
      };

    case ActionTypes.SET_PROBABILITY:
      return {
        ...state,
        probability: action.payload.catchStatus,
      };

    case ActionTypes.SET_CATCH_POKEMON:
      return {
        ...state,
        catchPokemon: action.payload.allPokemon,
      };

    case ActionTypes.SET_MY_POKEMON:
      return {
        ...state,
        pokemonList: action.payload,
      };

    case ActionTypes.SET_RENAME_POKEMON:
      return {
        ...state,
        renamePokemon: action.payload,
      };

    case ActionTypes.SET_RELEASE:
      return {
        ...state,
        release: action.payload,
      };

    case ActionTypes.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default pokemonReducer;
