import Image from "next/image";
import React from "react";

const CardComponent = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div className=" flex lg:w-[23vw] md:w-[30vw] sm:w-[40vw] w-[90vw] justify-center items-center md:mx-auto ">
      <img
        
        alt={pokemon.name + " image"}
        src={pokemon.image}
        className="h-[160px] w-[160px] sm:h-[200px] sm:w-[200px] "
      />
    </div>
  );
};

export default CardComponent;
