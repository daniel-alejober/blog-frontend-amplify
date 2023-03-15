import React from "react";
import { Alert } from "flowbite-react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const AlertR = ({ colorAlert, messageAlert }) => {
  return (
    <Alert color={colorAlert} icon={InformationCircleIcon} className="mb-4">
      <span>
        <span className="font-medium">Infomation!!</span> {messageAlert}
      </span>
    </Alert>
  );
};

export default AlertR;
