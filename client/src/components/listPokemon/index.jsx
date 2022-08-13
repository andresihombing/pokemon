import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  checkPrime,
  renamePokemon,
  setProbability,
} from "../../store/actions/pokemonAction";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Form from "../form";
import Alert from "../alert";

const ListPokemon = ({ loading, pokemons }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lengtLoading = Array.from({ length: 8 });
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(false);

  const showAlert = () => {
    setTimeout(() => {
      setAlert(false);
    }, 1000);
    setAlert(true);
  };

  const handleDetail = (item) => {
    dispatch(setProbability({ catchStatus: false, status: "Success" }));
    navigate(`detail/${item.url.split("/")[6]}`);
  };

  const handleSubmit = (inputs) => {
    dispatch(renamePokemon(showForm, inputs));
  };

  const handleRelease = (id) => {
    setShowForm(false);
    dispatch(checkPrime(id, () => showAlert()));
  };

  return (
    <>
      <div className="container">
        {alert && <Alert show={alert} description="Failed to Release" />}
        {!loading ? (
          <div className="row">
            {pokemons
              ?.sort((a, b) => b.id - a.id)
              ?.map((item, idx) => {
                return (
                  <div className="col-12 col-md-3 col-sm-6 pb-3" key={idx}>
                    <div className="card">
                      <img
                        src={item.imageUrl}
                        className="card-img-top"
                        alt="{item.title}"
                      />
                      <div className="card-body">
                        <h5 className="card-title text-start">{item?.name}</h5>
                        {item.url !== "" ? (
                          <button
                            type="button"
                            className="btn btn-success btn-sm float-end"
                            onClick={() => handleDetail(item)}
                          >
                            Detail
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-success btn-sm float-start"
                              onClick={() => setShowForm(item.id)}
                            >
                              Rename
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm float-end"
                              onClick={() => handleRelease(item.id)}
                            >
                              Release
                            </button>
                            {item.id === showForm && (
                              <Form handleSubmit={handleSubmit} />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="row">
            {lengtLoading?.map((item, idx) => {
              return (
                <div className="col-12 col-md-3 col-sm-6" key={idx}>
                  <Skeleton height={250} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ListPokemon;
