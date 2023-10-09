import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { capitalizeFirstLetter, typeHandler } from '../utils';

function Profile({pokemonData, error, setError}) {
    const {pokemonname} = useParams(); // Obtém o nome do Pokémon da URL
    const [pokemonProfile, setPokemonProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const findPokemonByName = (nameToFind) => {
            // Verifica se pokemonData já recebeu os dados da api
            if (pokemonData && pokemonData.length > 0) {
                return pokemonData.find((pokemon) => pokemon.name === nameToFind);            
            }
            // Lida com o caso em que pokemonData não está pronto
            return null;
        }
        const foundProfile = findPokemonByName(pokemonname);
        if (foundProfile) {
            setPokemonProfile(foundProfile);
            setIsLoading(false);
        } else if (!foundProfile && pokemonData.length > 0) {
            setIsLoading(false);
            setError(`Erro ao encontrar Pokémon ${pokemonname}`);
        } else {
            setPokemonProfile();
        }
    }, [pokemonname, pokemonData]);

    // Renderiza a página do Pokémon com base nos dados recebidos
    return (
        <>
            {error && (
                <section className="flex flex-col items-center bg-white py-20 px-6 md:rounded-md md:shadow-md md:my-10 lg:w-3/5 2xl:w-2/5">
                    <Link className="text-center bg-slate-100 rounded-full border px-6 py-4 hover:bg-slate-50 transition" to={`/`}>
                        Voltar para a página inicial
                    </Link>
                    <p className="text-red-500 mt-16">{error}</p>
                </section>
            )}
            {isLoading && (
                <section className="flex flex-col items-center bg-white py-20 px-6 md:rounded-md md:shadow-md md:my-10 lg:w-3/5 2xl:w-2/5">
                    <p className="text-gray-600">Carregando...</p>
                </section>
            )}
            {pokemonProfile && (    
                <section className="flex flex-col items-center bg-white justify-center py-10 px-4 md:rounded-md md:shadow-md lg:my-10 lg:w-3/5 2xl:w-2/5">
                    <Link className="text-center bg-slate-100 rounded-full border px-6 py-4 mt-6 hover:bg-slate-50 transition" to={`/`}>
                        Go Back To Home
                    </Link>
                    <h1 className="font-semibold text-3xl mt-16">{capitalizeFirstLetter(pokemonProfile.name)}</h1>
                    <img src={pokemonProfile.sprites.front_default} alt={pokemonProfile.name} className="mt-12"/>
                    <table className="w-3/5 mt-8 bg-white md:w-2/5">
                            <tr className="bg-gray-200">
                                <th className="border p-2">Attribute</th>
                                <th className="border p-2">Value</th>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="border py-2 px-4">Weight</td>
                                <td className="border py-2 px-4 text-center">{pokemonProfile.weight / 10} kg</td>
                            </tr>
                            <tr className="bg-gray-200">
                                <td className="border py-2 px-4">Height</td>
                                <td className="border py-2 px-4 text-center">{pokemonProfile.height * 10} cm</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="border py-2 px-4">Type</td>
                                <td className="border py-2 px-4 text-center">{typeHandler(pokemonProfile.types)}</td>
                            </tr>
                    </table>
                    <h2 className="text-2xl mt-16 border-b-4 border-red-300">Variations</h2>
                    <div className="flex mt-12 justify-around w-full">
                        <img src={pokemonProfile.sprites.front_female} />
                        <img src={pokemonProfile.sprites.front_shiny} />
                        <img src={pokemonProfile.sprites.front_shiny_female} />
                    </div>
                    <h2 className="text-2xl mt-16 border-b-4 border-red-300">Abilities</h2>
                    <div className="mt-12 flex flex-wrap justify-center">
                        {pokemonProfile.moves.map((move) => (
                            <div className="bg-gray-100 rounded-full m-2 p-2">{move.move.name}</div>
                        ))}
                    </div>
                </section>
            )}
        </>

    )       
    
}

export default Profile;