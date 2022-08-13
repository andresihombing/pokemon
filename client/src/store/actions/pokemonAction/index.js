import { ActionTypes } from "../../constants";

export const pokemonList = (loading) => {
  return {
    type: ActionTypes.POKEMON_LIST,
    payload: loading,
  };
};

export const setPokemonList = (response) => {
  return {
    type: ActionTypes.SET_POKEMON_LIST,
    payload: response,
  };
};

export const detailPokemon = (id, loading) => {
  return {
    type: ActionTypes.DETAIL_POKEMON,
    payload: {
      id,
      loading,
    },
  };
};

export const setDetailPokemon = (response) => {
  return {
    type: ActionTypes.SET_DETAIL_POKEMON,
    payload: response,
  };
};

export const probability = (alert) => {
  return {
    type: ActionTypes.PROBABILITY,
    payload: alert,
  };
};

export const setProbability = (response) => {
  return {
    type: ActionTypes.SET_PROBABILITY,
    payload: response,
  };
};

export const catchPokemon = (data, navigate, exist) => {
  return {
    type: ActionTypes.CATCH_POKEMON,
    payload: { data, navigate, exist },
  };
};

export const setCatchPokemon = (response) => {
  return {
    type: ActionTypes.SET_CATCH_POKEMON,
    payload: response,
  };
};

export const myPokemon = (loading) => {
  return {
    type: ActionTypes.MY_POKEMON,
    payload: loading,
  };
};

export const setMyPokemon = (response) => {
  return {
    type: ActionTypes.SET_MY_POKEMON,
    payload: response,
  };
};

export const renamePokemon = (id, data) => {
  return {
    type: ActionTypes.RENAME_POKEMON,
    payload: { id, data },
  };
};

export const setRenamePokemon = (response) => {
  return {
    type: ActionTypes.SET_RENAME_POKEMON,
    payload: response,
  };
};

export const checkPrime = (id, alert) => {
  return {
    type: ActionTypes.CHECK_PRIME,
    payload: { id, alert },
  };
};

export const setReleasePokemon = (response) => {
  return {
    type: ActionTypes.SET_RELEASE,
    payload: response,
  };
};

export const setError = (response) => {
  return {
    type: ActionTypes.ERROR,
    payload: response,
  };
};
