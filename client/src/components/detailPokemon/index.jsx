import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailPokemon, probability } from "../../store/actions/pokemonAction";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { catchPokemon } from "../../store/actions/pokemonAction";
import Form from "../form";
import Alert from "../alert";

const DetailPokemon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [nameExist, setNameExist] = useState(false);

  const pokemons = useSelector((state) => state.pokemons.detailPokemon);
  const checkProb = useSelector((state) => state.pokemons.probability);
  const error = useSelector((state) => state.pokemons.error);
  console.log(error);

  useEffect(() => {
    setLoading(true);
    dispatch(detailPokemon(id, () => setLoading(false)));
  }, []);

  const showAlert = () => {
    setTimeout(() => {
      setAlert(false);
    }, 1000);
    setAlert(true);
  };

  const showAlertExist = () => {
    setTimeout(() => {
      setNameExist(false);
    }, 1000);
    setNameExist(true);
  };

  const handleCatch = () => {
    dispatch(probability(() => showAlert()));
  };

  const handleSubmit = (inputs) => {
    const data = {
      nickname: inputs.nickname,
      imageUrl: pokemons.imageUrl,
    };
    dispatch(
      catchPokemon(
        data,
        () => navigate("/my-pokemon"),
        () => showAlertExist()
      )
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {!loading ? (
              <div className="card">
                <div className="row m-4">
                  <div className="col-md-5">
                    <div className="card">
                      <img src={pokemons?.imageUrl} alt={pokemons?.name} />
                    </div>
                  </div>
                  <div className="col-md-7 text-start">
                    <h3 className="fw-bold">{pokemons.name}</h3>
                    <p>MOVES : {pokemons?.moves}</p>
                    <p>TYPES : {pokemons?.types}</p>
                    <p>ABILITIES : {pokemons?.abilities}</p>
                    <button
                      type="button"
                      className="btn btn-success btn-sm float-end m-3"
                      onClick={() => handleCatch()}
                    >
                      Catch Pokemon
                    </button>
                    {checkProb ? (
                      <Form handleSubmit={handleSubmit} />
                    ) : (
                      <Alert
                        show={alert}
                        description="Failed to Catch Pokemon"
                      />
                    )}
                    <Alert
                      show={nameExist}
                      description={error?.response?.data?.message}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="row">
                  <div className="col-md-5">
                    <Skeleton height={250} />
                  </div>
                  <div className="col-md-4 text-start">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPokemon;
