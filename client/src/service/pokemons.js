import request from "../utils/request";
const base_URL_LIST_POKEMON = process.env.REACT_APP_POKEMON_API;
const base_URL_MY_POKEMON = process.env.REACT_APP_MY_API;

const urls = {
  pokemons: `${base_URL_LIST_POKEMON}/pokemon`,
  myProbability: `${base_URL_MY_POKEMON}/check-probability`,
  myPokemon: `${base_URL_MY_POKEMON}/my-pokemons`,
  prime: `${base_URL_MY_POKEMON}/check-prime`,
};

const callApi = (
  endpoint,
  method,
  headers = {},
  params = {},
  data = {},
  base = {}
) => {
  const options = {
    baseURL: base,
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response?.data;
    return responseAPI;
  });
};

export const getListApi = () => {
  return callApi(urls.pokemons, "get", {}, {}, {}, base_URL_LIST_POKEMON);
};

export const getDetailApi = (action) => {
  return callApi(
    `${urls.pokemons}/${action.payload.id}`,
    "get",
    {},
    {},
    {},
    base_URL_LIST_POKEMON
  );
};

export const getProbabilityApi = () => {
  return callApi(urls.myProbability, "get", {}, {}, {}, base_URL_MY_POKEMON);
};

export const catchPokemonApi = (data) => {
  return callApi(
    urls.myPokemon,
    "post",
    {},
    {},
    data.payload.data,
    base_URL_MY_POKEMON
  );
};

export const getListMyPokemonApi = () => {
  return callApi(urls.myPokemon, "get", {}, {}, {}, base_URL_MY_POKEMON);
};

export const renamePokemonApi = (action) => {
  return callApi(
    `${urls.myPokemon}/${action.payload.id}`,
    "put",
    {},
    {},
    action.payload.data,
    base_URL_MY_POKEMON
  );
};

export const getPrimePokemonApi = () => {
  return callApi(urls.prime, "get", {}, {}, {}, base_URL_MY_POKEMON);
};

export const deletePokemonApi = (action) => {
  return callApi(
    `${urls.myPokemon}/${action.payload.id}`,
    "delete",
    {},
    {},
    {},
    base_URL_MY_POKEMON
  );
};
