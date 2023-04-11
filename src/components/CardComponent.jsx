import Image from "next/image";
import React from "react";

const CardComponent = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div className=" flex justify-center md:w-[50%]">
      <Image
        alt={pokemon.name + " image"}
        src={pokemon.image}
        width="90"
        height="80"
      />
    </div>
  );
};

export default CardComponent;
