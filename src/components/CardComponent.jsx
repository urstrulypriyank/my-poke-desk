import Image from "next/image";
import React from "react";

const CardComponent = ({ pokemon }) => {
  let color = {
    Normal: "#A8A77A",
    Fire: "#EE8130",
    Water: "#6390F0",
    Electric: "#F7D02C",
    Grass: "#7AC74C",
    Ice: "#96D9D6",
    Fighting: "#C22E28",
    Poison: "#A33EA1",
    Ground: "#E2BF65",
    Flying: "#A98FF3",
    Psychic: "#F95587",
    Bug: "#A6B91A",
    Rock: "#B6A136",
    Ghost: "#735797",
    Dragon: "#6F35FC",
    Dark: "#705746",
    Steel: "#B7B7CE",
    Fairy: "#D685AD",
  };
  // console.log(pokemon);
  return (
    <div className="p-3 shadow-sm shadow-white rounded-lg   flex justify-center max-sm:w-[90vw] transform transition duration-500 hover:scale-110 ">
      <div
        className="
         bg-white p-7
         "
      >
        <img
          alt={pokemon.name + " image"}
          src={pokemon.image}
          className="h-[160px] w-[160px] sm:h-[200px] sm:w-[200px] bg-gray-300   "
        />
        <p className="text-gray-500 opacity-80 font-semibold">{`#${pokemon.number}`}</p>
        <p className="opacity-80 text-2xl mt-2 font-semibold tracking-wide">
          {pokemon.name}
        </p>
        <div>
          {pokemon.types.map((type) => {
            return (
              <span
                className=" text-xs text-black/100  font-medium mr-2 px-2.5 py-0.5 rounded  "
                style={{ backgroundColor: `${color[`${type}`]}` }}
                key={type}
              >
                {type}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
