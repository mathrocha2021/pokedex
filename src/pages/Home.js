import { Link } from 'react-router-dom';
import { capitalizeFirstLetter, typeHandler } from '../utils';

function Home({ pokemonData, error, searchTerm, setSearchTerm }) {

    // Função para filtrar Pokémons que correspondam ao que for digitado na barra de pesquisa
    const filterPokemon = () => {
        return pokemonData.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <>
            <section className="flex bg-white justify-center py-5 mt-10 w-full sm:w-3/5 md:shadow-md md:rounded-md lg:w-1/3">
                <input
                    type="text"
                    placeholder="Search Pokémon by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado conforme a digitação
                    className="border rounded-full py-2 px-4 w-2/3"
                />
            </section>
            {error ? (
                    <section className="my-20">
                        <p className="text-red-400">{error}</p>
                    </section> )
                : (
                    <section className="w-full grid md:grid-cols-3 md:gap-4 md:w-11/12 md:my-10 xl:w-3/5">
                        {filterPokemon().map((pokemon, index) => (
                            <article className="flex flex-col items-center bg-white justify-center py-10 px-4 md:rounded-md md:shadow-md">
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
                            </article>
                        ))}
                    </section>
                )
            }
        </>


    );}

    export default Home;