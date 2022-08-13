import { all } from "redux-saga/effects";
import pokemons from "./pokemonSaga";

export default function* rootSaga() {
  yield all([pokemons()]);
}
