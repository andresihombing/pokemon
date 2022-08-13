const { Pokemon } = require("../../models");

const exclude = ["updatedAt", "createdAt"];

exports.myPokemons = async (req, res) => {
  try {
    let allPokemon = await Pokemon.findAll({
      attributes: {
        exclude,
      },
    });

    res.status(200).send({
      status: "Success",
      allPokemon,
    });
  } catch (error) {
    res.status(500).send({
      status: "Error",
      message: "Internal server error",
    });
  }
};

exports.myPokemonDetail = async (req, res) => {
  try {
    const { id } = req.params;
    let pokemon = await Pokemon.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude,
      },
    });

    if (!pokemon) {
      return res.status(404).send({
        status: "Failed",
        message: "Pokemon not found",
      });
    }

    res.status(200).send({
      status: "Success",
      pokemon,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal server error",
    });
  }
};

exports.checkProbability = async (req, res) => {
  try {
    const rate = Math.ceil(Math.random() * 10);
    var catchStatus = false;

    if (rate > 5) {
      catchStatus = true;
    }

    res.status(200).send({
      status: "Success",
      catchStatus: catchStatus,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal server error",
    });
  }
};

exports.addPokemon = async (req, res) => {
  try {
    const data = req.body;
    const nickname = data.nickname;

    const exist = await Pokemon.findOne({
      where: {
        nickname,
      },
      attributes: {
        exclude,
      },
    });

    if (exist) {
      res.status(409).send({
        status: "Failed",
        message: "Nickname already exist",
      });
    } else {
      newPokemon = await Pokemon.create({ ...data, renameCount: "0" });

      res.status(201).send({
        status: "Success",
        newPokemon,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "Internal server error",
    });
  }
};

exports.randomNumber = async (req, res) => {
  try {
    const number = Math.ceil(Math.random() * 50);

    const isPrimeNumber = (n) => {
      for (var i = 2; i < n; i++) {
        if (n % i === 0) return false;
      }
      return n > 1;
    };

    res.status(200).send({
      status: "Success",
      prime: isPrimeNumber(number),
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal server error",
    });
  }
};

exports.releasePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findOne({
      where: {
        id,
      },
    });

    if (!pokemon) {
      res.status(404).send({
        status: "Failed",
        message: "Pokemon not found",
      });
    }

    await Pokemon.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "Success",
      message: "Pokemon released",
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal server error",
    });
  }
};

const generateFibonacci = (num) => {
  var a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
};

exports.renamePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const exist = await Pokemon.findOne({
      where: {
        id,
      },
    });

    if (!exist) {
      return res.status(404).send({
        status: "Failed",
        message: "Pokemon not found",
      });
    }

    const fibonacciIndex = Number(exist.renameCount) - 1;
    const fibonacciNumber = generateFibonacci(fibonacciIndex);
    const pokemon = {
      nickname: `${data.nickname} - ${fibonacciNumber}`,
      imageUrl: data.imageUrl,
      pokemonId: data.pokemonId,
      renameCount: Number(exist.renameCount) + 1,
    };

    await Pokemon.update(pokemon, {
      where: {
        id,
      },
    });

    const updatePokemon = await Pokemon.findOne({
      where: {
        id,
      },
      attributes: {
        exclude,
      },
    });

    res.status(200).send({
      status: "Success",
      updatePokemon,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal server error",
    });
  }
};
