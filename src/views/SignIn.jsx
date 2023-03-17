import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import Input from "../components/Input";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";
import { useDispatch } from "react-redux";
import { saveDataUser } from "../redux/userSlice";
import { login } from "../request/account";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [dataAlert, setDataAlert] = useState({
    colorAlert: "",
    messageAlert: "",
  });
  const [alertForm, setAlertForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if ([dataLogin.email, dataLogin.password].includes("")) {
      setAlertForm(true);
      setDataAlert({
        colorAlert: "failure",
        messageAlert: "All inputs are required",
      });
      setTimeout(() => {
        setAlertForm(false);
        setLoading(false);
      }, 2500);
      return;
    }
    try {
      const data = await login({
        email: dataLogin.email,
        password: dataLogin.password,
      });

      if (data.status === 200) {
        dispatch(saveDataUser(data.data));
        setLoading(false);
        navigate("/");
      } else throw data;
    } catch (error) {
      const errorMsg = error.data.message;
      if (errorMsg) {
        setAlertForm(true);
        setDataAlert({
          colorAlert: "failure",
          messageAlert: errorMsg,
        });
        setTimeout(() => {
          setAlertForm(false);
          setLoading(false);
        }, 2500);
        return;
      }
    }
  };

  return (
    <div className="max-w-[70%] mx-auto my-16 ">
      {alertForm && (
        <AlertR
          colorAlert={dataAlert.colorAlert}
          messageAlert={dataAlert.messageAlert}
        />
      )}
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <Input
          labelText="Your email"
          inputId="email2"
          type="email"
          placeholder="email@email.com"
          name="email"
          inputValue={dataLogin.email}
          onChange={handleChange}
        />

        <Input
          labelText="Your password"
          inputId="password"
          type="password"
          placeholder="*****"
          name="password"
          inputValue={dataLogin.password}
          onChange={handleChange}
        />

        {loading ? (
          <SpinnerR />
        ) : (
          <Button type="submit" className="w-full max-w-[80%] mx-auto">
            Login account
          </Button>
        )}
      </form>
    </div>
  );
};

export default SignIn;
