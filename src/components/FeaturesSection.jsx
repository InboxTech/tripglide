// components/FeaturesSection.jsx
import React from "react";

const FeaturesSection = ({ features }) => {
  return (
    <div className="flex justify-between items-start gap-8 mt-8">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-2">
          <span className="text-2xl">{feature.icon}</span>
          <p className="text-black font-semibold">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
