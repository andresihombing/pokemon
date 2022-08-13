const express = require("express");
const router = express.Router();

const {
  myPokemons,
  myPokemonDetail,
  checkProbability,
  addPokemon,
  randomNumber,
  releasePokemon,
  renamePokemon,
} = require("../controllers");

router.get("/my-pokemons", myPokemons);
router.get("/my-pokemons/:id", myPokemonDetail);
router.get("/check-probability", checkProbability);
router.get("/check-prime", randomNumber);

router.post("/my-pokemons", addPokemon);

router.put("/my-pokemons/:id", renamePokemon);

router.delete("/my-pokemons/:id", releasePokemon);

module.exports = router;
