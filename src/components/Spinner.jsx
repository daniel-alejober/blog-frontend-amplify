import React from "react";
import { Spinner } from "flowbite-react";

const SpinnerR = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner color="info" aria-label="Info spinner example" />
    </div>
  );
};

export default SpinnerR;
