import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import Input from "../components/Input";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";
import { saveDataUser } from "../redux/userSlice";
import { login } from "../request/account";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert, showAlert } from "../redux/alertSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { show, color, message } = useSelector((state) => state.alert);

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if ([dataLogin.email, dataLogin.password].includes("")) {
      dispatch(
        showAlert({ color: "failure", message: "All inputs are required" })
      );
      setTimeout(() => {
        dispatch(hideAlert());
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
        dispatch(showAlert({ color: "failure", message: errorMsg }));
        setTimeout(() => {
          dispatch(hideAlert());
          setLoading(false);
        }, 2500);
        return;
      }
    }
  };

  return (
    <div className="max-w-[70%] mx-auto my-16 ">
      {show && <AlertR colorAlert={color} messageAlert={message} />}
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
