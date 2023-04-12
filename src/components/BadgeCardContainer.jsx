import React from "react";
import BadgeCardComponents from "./BadgeCardComponents";
const BadgeCardContainer = ({ title, badgeType }) => {
  return (
    <div className="p-5">
      <h4 className="text-xl font-semibold tracking-wider">{title}</h4>

      <BadgeCardComponents types={badgeType} />
    </div>
  );
};

export default BadgeCardContainer;
