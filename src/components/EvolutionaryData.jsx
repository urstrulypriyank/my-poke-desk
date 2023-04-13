import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import CardComponent from "./CardComponent";
import { useRouter } from "next/router";
import Loading from "./Loading";
const GET_POKEMON = gql`
  query Pokemon($name: String) {
    pokemon(name: $name) {
      id
      name
      evolutions {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
      }
    }
  }
`;

const PokemonPopup = ({ name, setShowPopup, showPopup }) => {
  const router = useRouter();
  const [getPokemon, { loading, error, data }] = useLazyQuery(GET_POKEMON);
  const [evolutionPokemon, setEvolutionPokemon] = useState(null);
  useEffect(() => {
    if (showPopup) {
      getPokemon({ variables: { name } });
    }
  }, [showPopup, name, getPokemon]);
  let routeToPokemonPage = (id) => {
    setShowPopup(false);
    router.push("/pokemon/" + id);
  };
  useEffect(() => {
    if (!loading && !error && data) {
      let new_data = data.pokemon.evolutions;
      setEvolutionPokemon(new_data);
    }
  }, [data, error, loading]);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null; // return null when popup is closed
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-40 ">
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="bg-white rounded-lg p-6 w-[95vw] h-[97vh] overflow-y-scroll ">
          <h1 className="flex justify-center text-2xl font-bold uppercase tracking-wider">
            {data?.pokemon?.name}
          </h1>

          <p className="italic font-bold text-center">Evolutions Possibles</p>
          {/* Render evolutionary data here */}

          <div className="flex flex-wrap justify-between  mx-auto items-center w-[80vw] ">
            {evolutionPokemon?.map((pokemon) => (
              <div
                onClick={() => routeToPokemonPage(pokemon.id)}
                key={pokemon.id}
                className="cursor-pointer"
              >
                <CardComponent pokemon={pokemon} key={pokemon.id} />
              </div>
            ))}
          </div>

          <button
            className=" fixed top-2 right-10 mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 text-5xl"
            onClick={handleClose}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonPopup;
