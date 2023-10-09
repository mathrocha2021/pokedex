import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import axios from 'axios';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Array de URLs dos Pokémon
  const endpoints = [];
  for (let i = 1; i <= 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  }

  // Função para buscar os dados de um Pokémon por URL
  const fetchPokemonData = (url) => {
      return axios.get(url);
  };

  // Função para buscar dados de todos os Pokémon
  const fetchAllPokemonData = () => {
      // Faz todas as solicitações em paralelo usando axios.all
      axios.all(endpoints.map((url) => fetchPokemonData(url)))
          .then((res) => {
              // Mapeia as respostas para extrair os dados dos Pokémon
              const pokemonArray = res.map((res) => res.data);
              // Define o estado com o array de dados dos Pokémon
              setPokemonData(pokemonArray);
          })
          .catch((error) => {
              setError('Erro ao buscar dados dos Pokémon.');
              console.error(error);
          });
  };

  useEffect(() => {
      // Chama a função para buscar os dados de todos os Pokémon
      fetchAllPokemonData();
  }, []);

  const filterPokemon = () => {
    return pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <>
        <div className="flex bg-white justify-center py-5 mt-10 w-full sm:w-3/5 md:shadow-md md:rounded-md lg:w-1/3">
            <input
                type="text"
                placeholder="Search Pokémon by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado conforme a digitação
                className="border rounded-full py-2 px-4 w-2/3"
            />
        </div>
        <div className="w-full grid md:grid-cols-3 md:gap-4 md:w-11/12 md:my-10 xl:w-3/5">
            {error && <p className="error">{error}</p>}
            {filterPokemon().map((pokemon, index) => (
                <div className="flex flex-col items-center bg-white justify-center py-10 px-4 md:rounded-md md:shadow-md">
                    <h2 key={index} className="font-semibold text-3xl">{capitalizeFirstLetter(pokemon.name)}</h2>
                    <img src={pokemon.sprites.front_default} className="mt-8"/>
                    <table className="w-3/5 mt-4 bg-white md:w-4/5">
                        <tr className="bg-gray-200">
                            <th className="border p-2">Attribute</th>
                            <th className="border p-2">Value</th>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border py-2 px-4">Weight</td>
                            <td className="border py-2 text-center">{pokemon.weight / 10} kg</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="border py-2 px-4">Height</td>
                            <td className="border py-2 text-center">{pokemon.height * 10} cm</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border py-2 px-4">Type</td>
                            <td className="border py-2 text-center">{typeHandler(pokemon.types)}</td>
                        </tr>
                    </table>
                    <Link className="text-center bg-red-500 rounded-full px-6 py-4 text-white mt-6 hover:bg-red-700 transition" to={`/pokemon/${pokemon.name}`}>
                        Show more
                    </Link>
                </div>
            ))}
        </div>
    </>


);}

export default App;