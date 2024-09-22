import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((response) => response.json())
      .then((data) => {
        const results = data.results;

        const detailedData = results.map((pokemon) => {
          return fetch(pokemon.url)
            .then((res) => res.json())
            .then((pokemonDetail) => ({
              name: pokemonDetail.name,
              image: pokemonDetail.sprites.front_default,
            }));
        });

        Promise.all(detailedData).then(setPokemonData);
      });
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
