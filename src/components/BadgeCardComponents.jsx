import React from "react";
import { color } from "./badgeColors";
const BadgeCardComponents = ({ types }) => {
  // console.log(types, "badge card components types map array");
  return (
    <div>
      {types?.map((type) => {
        return (
          <span
            className=" text-xs text-black/100  font-medium mr-2 px-4 py-1 rounded  "
            style={{ backgroundColor: `${color[`${type}`]}` }}
            key={type}
          >
            {type}
          </span>
        );
      })}
    </div>
  );
};

export default BadgeCardComponents;
