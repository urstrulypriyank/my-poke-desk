import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
// import styles from "@/Styles/EvolutionaryData";
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
  //   const { loading, error, data } = useQuery(GET_POKEMON, {
  //     variables: { name },
  //   });
  const [getPokemon, { loading, error, data }] = useLazyQuery(GET_POKEMON);
  const [evolutionPokemon, setEvolutionPokemon] = useState(null);
  useEffect(() => {
    if (showPopup) {
      getPokemon({ variables: { name } });
    }
  }, [showPopup, name]);

  useEffect(() => {
    if (!loading && !error && data) {
      let new_data = data.pokemon.evolutions;
      // console.log(new_data);
      setEvolutionPokemon(new_data);
    }
  }, [data]);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null; // return null when popup is closed
  }

  // if (!loading && !error && data) {
  //   console.log(data.pokemon.evolutions);
  //   console.log(evolutionPokemon);
  // }
  if (evolutionPokemon) {
    console.log(evolutionPokemon);
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="bg-white rounded-lg p-6 w-[80vw] h-[50vh]">
          <h1>{data?.pokemon?.name}</h1>
          <img
            src={data?.pokemon?.evolutions[0]?.image}
            alt={data?.pokemon?.name}
          />
          <p>Evolutionary data:</p>
          {/* Render evolutionary data here */}
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonPopup;
