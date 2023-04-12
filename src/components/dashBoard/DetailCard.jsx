import React from "react";

const DetailCard = ({ weight, height, classification }) => {
  return (
    <div className="bg-blue-500 flex rounded-lg px-10 max-sm:px-2">
      <div className="container grid grid-cols-2 gap-2 space-y-2 my-3 justify-center items-center mx-auto">
        {/* --------first row ------ */}
        <div className="flex flex-col space-y-1">
          <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-sm">
            MaxHeight{" "}
          </div>
          <div className="font-smeibold text-xl max-sm:text-xl">
            {height?.maximum}
          </div>
        </div>

        {/* --------first row ------ */}
        <div className="flex flex-col space-y-1">
          <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-xl">
            MinHeight{" "}
          </div>
          <div className="font-smeibold text-xl max-sm:text-xl">
            {height?.minimum}
          </div>
        </div>

        {/* --------first row ------ */}
        <div className="flex flex-col space-y-1">
          <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-xl">
            MaxWeight{" "}
          </div>
          <div className="font-smeibold text-xl max-sm:text-xl">
            {weight?.maximum}
          </div>
        </div>

        {/* --------first row ------ */}
        <div className="flex flex-col space-y-1">
          <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-xl">
            MinWeight{" "}
          </div>
          <div className="font-smeibold text-xl max-sm:text-xl">
            {weight?.minimum}
          </div>
        </div>

        {/* --------category row ------ */}
        <div className="flex flex-col space-y-1">
          <div className="tracking-wider font-extrabold text-white text-xl max-sm:text-xl">
            Category
          </div>
          <div className="font-smeibold text-xl max-sm:text-xl">
            {classification}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
