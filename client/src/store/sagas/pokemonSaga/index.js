import { call, put, takeLatest } from "redux-saga/effects";
import {
  getListApi,
  getDetailApi,
  getProbabilityApi,
  catchPokemonApi,
  getListMyPokemonApi,
  renamePokemonApi,
  getPrimePokemonApi,
  deletePokemonApi,
} from "../../../service/pokemons";
import { ActionTypes } from "../../constants";
import {
  setPokemonList,
  setError,
  setDetailPokemon,
  setProbability,
  setCatchPokemon,
  setMyPokemon,
  setRenamePokemon,
  setReleasePokemon,
} from "../../actions/pokemonAction";

function* pokemonSaga(loading) {
  try {
    const pokemon = yield call(getListApi);
    let list = [];
    pokemon.results.map((item) => {
      return list.push({
        name: item.name,
        url: item.url,
        imageUrl: `${process.env.REACT_APP_IMAGE_API}/${
          item.url.split("/")[6]
        }.png`,
      });
    });

    yield put(setPokemonList(list));
    loading?.payload();
  } catch (error) {
    if (error) {
      yield put(setError(error));
    }
  }
}

function* detailPokemonSaga(action) {
  try {
    var detail = yield call(getDetailApi, action);
    detail = {
      ...detail,
      id: Number(action.payload.id),
      name: detail.name,
      imageUrl: detail?.sprites?.front_default,
      moves: detail.moves
        .map((item) => item.move.name)
        .slice(0, 5)
        .join(", "),
      types: detail.types.map((item) => item.type.name).join(", "),
      abilities: detail.abilities.map((item) => item.ability.name).join(", "),
    };

    yield put(setDetailPokemon(detail));
    action?.payload?.loading();
  } catch (error) {
    if (error) {
      yield put(setError(error));
    }
  }
}

function* checkProbabilitySaga(alert) {
  try {
    const probability = yield call(getProbabilityApi);
    yield put(setProbability(probability));
    alert?.payload();
  } catch (error) {
    if (error) {
      yield put(setError(error));
    }
  }
}

function* catchPokemonSaga(data) {
  try {
    const myPokemon = yield call(catchPokemonApi, data);
    yield put(setCatchPokemon(myPokemon));
    data?.payload?.navigate();
  } catch (error) {
    if (error) {
      data?.payload?.exist();
      yield put(setError(error));
    }
  }
}

function* myPokemonSaga(loading) {
  try {
    const myPokemon = yield call(getListMyPokemonApi);
    let list = [];
    myPokemon.allPokemon.map((item) => {
      return list.push({
        id: item.id,
        url: "",
        name: item.nickname,
        imageUrl: item.imageUrl,
      });
    });

    yield put(setMyPokemon(list));
    loading?.payload();
  } catch (error) {
    if (error) {
      yield put(setError(error));
    }
  }
}

function* renamePokemonSaga(data) {
  try {
    const rename = yield call(renamePokemonApi, data);
    yield put(setRenamePokemon(rename));
  } catch (error) {
    if (error) {
      yield put(setError(error));
    }
  }
}

function* checkPrimeSaga(action) {
  try {
    const prime = yield call(getPrimePokemonApi);
    if (prime?.prime) {
      const deleted = yield call(deletePokemonApi, action);
      yield put(setReleasePokemon(deleted));
    } else {
      action?.payload?.alert();
    }
  } catch (error) {
    if (error) {
      yield put(setError(error));
    }
  }
}

export default function* pokemons() {
  yield takeLatest(ActionTypes.POKEMON_LIST, pokemonSaga);
  yield takeLatest(ActionTypes.DETAIL_POKEMON, detailPokemonSaga);
  yield takeLatest(ActionTypes.PROBABILITY, checkProbabilitySaga);
  yield takeLatest(ActionTypes.CATCH_POKEMON, catchPokemonSaga);
  yield takeLatest(ActionTypes.MY_POKEMON, myPokemonSaga);
  yield takeLatest(ActionTypes.RENAME_POKEMON, renamePokemonSaga);
  yield takeLatest(ActionTypes.CHECK_PRIME, checkPrimeSaga);
}
