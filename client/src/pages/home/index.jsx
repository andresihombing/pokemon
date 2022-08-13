import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/error";
import Header from "../../components/header";
import ListPokemon from "../../components/listPokemon";
import { pokemonList } from "../../store/actions/pokemonAction";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const error = useSelector((state) => state.pokemons.error);
  const pokemons = useSelector((state) => state.pokemons.pokemonList);

  useEffect(() => {
    setLoading(true);
    dispatch(pokemonList(() => setLoading(false)));
  }, []);

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

export default Home;
