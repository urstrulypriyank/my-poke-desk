import React from "react";

const Headder = ({ name, number }) => {
  return (
    <div className="mt-8">
      <p className="flex md:w-[50vw] w-[90vw] mx-auto rounded-xl h-20 shadow-lg  text-center justify-center items-center">
        <span className="font-sans font-medium tracking-wide text-3xl ">
          {name}
        </span>
        <span className=" text-2xl px-5 text-gray-700 opacity-80">
          #{number}
        </span>
      </p>
    </div>
  );
};

export default Headder;
