import React from "react";
import { Toast, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ToastR = ({ messageToast, setShowToast }) => {
  const navigate = useNavigate();
  return (
    <Toast className="absolute right-0 md:top-15">
      <div className="flex !items-start">
        <div className="ml-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
            Go to signin
          </span>
          <div className="mb-2 text-sm font-normal">{messageToast}</div>

          <div className="w-full">
            <Button size="xs" onClick={() => navigate("/signin")}>
              Signin
            </Button>
          </div>
        </div>
        <Toast.Toggle onClick={() => setShowToast(false)} />
      </div>
    </Toast>
  );
};

export default ToastR;
