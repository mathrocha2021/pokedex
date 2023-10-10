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
              setError(null);
          })
          .catch((error) => {
              setError("Erro ao buscar dados dos Pokémons.");
              setPokemonData([]);
              console.error(error);
          });
  };

  useEffect(() => {
      // Chama a função para buscar os dados de todos os Pokémon
      fetchAllPokemonData();
  }, []);

  return (
      <div className="flex flex-col items-center md:bg-slate-50 h-full min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home pokemonData={pokemonData} error={error} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            <Route path={`/pokemon/:pokemonname`} element={<Profile pokemonData={pokemonData} error={error} />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;