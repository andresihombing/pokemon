import React from "react";
import DetailPokemon from "../../components/detailPokemon";
import Header from "../../components/header";
import { useSelector } from "react-redux";
import Error from "../../components/error";

const Detail = () => {
  const error = useSelector((state) => state.pokemons.error);

  return (
    <>
      {error?.code !== "ERR_NETWORK" ? (
        <>
          <Header />
          <DetailPokemon />
        </>
      ) : (
        <Error />
      )}
    </>
  );
};

export default Detail;
