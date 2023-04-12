import Image from "next/image";
import React from "react";
import { color } from "./badgeColors";
import BadgeCardComponents from "./BadgeCardComponents";
const CardComponent = ({ pokemon }) => {
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

        <BadgeCardComponents types={pokemon.types} />
      </div>
    </div>
  );
};

export default CardComponent;
