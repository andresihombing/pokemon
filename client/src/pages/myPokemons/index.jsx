import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import ListPokemon from "../../components/listPokemon";
import { useSelector, useDispatch } from "react-redux";
import { myPokemon } from "../../store/actions/pokemonAction";
import Error from "../../components/error";

const MyPokemons = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons.pokemonList);
  const rename = useSelector((state) => state.pokemons.renamePokemon);
  const release = useSelector((state) => state.pokemons.release);
  const error = useSelector((state) => state.pokemons.error);

  useEffect(() => {
    setLoading(true);
    dispatch(myPokemon(() => setLoading(false)));
  }, []);

  useEffect(() => {
    dispatch(myPokemon(() => setLoading(false)));
  }, [rename, release]);

  return (
    <>
      {error?.code !== "ERR_NETWORK" ? (
        <>
          <Header />
          <ListPokemon loading={loading} pokemons={pokemons} />{" "}
        </>
      ) : (
        <Error />
      )}
    </>
  );
};

export default MyPokemons;
