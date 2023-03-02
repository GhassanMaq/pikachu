const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));
app.use(express.static(path.join(__dirname, "public")));
async function getPokemonData(id) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { name, moves, types, order } = response.data;
  const image = response.data.sprites.other["official-artwork"].front_default;
  return { name, moves, types, image, order };
}
async function getThreeRandomPokemon() {
  const pokemonIds = [];
  for (let i = 0; i < 3; i++) {
    pokemonIds.push(Math.floor(Math.random() * 898) + 1);
  }
  const pokemonData = [];
  for (const id of pokemonIds) {
    const pokemon = await getPokemonData(id);
    pokemonData.push(pokemon);
  }
  return pokemonData;
}
app.get("/", async (req, res) => {
  const pokemonData = await getThreeRandomPokemon();
  res.render("home", {
    pokemons: pokemonData,
  });
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
