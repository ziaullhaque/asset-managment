import React from 'react';
import { PuffLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <PuffLoader size={100} color="#006d6f" />
    </div>
  );
};

export default LoadingSpinner;