import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import Input from "../components/Input";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";
import { emailRegex, nombreRegex } from "../utils/constants";
import { createAccount } from "../request/account";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert, showAlert } from "../redux/alertSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { show, color, message } = useSelector((state) => state.alert);
  const navigate = useNavigate();
  const [dataAccount, setDataAccount] = useState({
    email: "",
    username: "",
    password: "",
    repeatP: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDataAccount({ ...dataAccount, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      [
        dataAccount.email,
        dataAccount.username,
        dataAccount.password,
        dataAccount.repeatP,
      ].includes("")
    ) {
      dispatch(
        showAlert({ color: "failure", message: "All inputs are required" })
      );

      setTimeout(() => {
        dispatch(hideAlert());
        setLoading(false);
      }, 2500);
      return;
    }
    if (!emailRegex.test(dataAccount.email)) {
      dispatch(showAlert({ color: "failure", message: "Enter a valid email" }));

      setTimeout(() => {
        dispatch(hideAlert());
        setLoading(false);
      }, 2500);
      return;
    }
    if (!nombreRegex.test(dataAccount.username)) {
      dispatch(showAlert({ color: "failure", message: "Enter a valid name" }));

      setTimeout(() => {
        dispatch(hideAlert());
        setLoading(false);
      }, 2500);
      return;
    }
    if (dataAccount.password !== dataAccount.repeatP) {
      dispatch(
        showAlert({
          color: "failure",
          message: "Both passwords must be the same",
        })
      );
      setTimeout(() => {
        dispatch(hideAlert());
        setLoading(false);
      }, 2500);
      return;
    }
    try {
      const data = await createAccount({
        email: dataAccount.email,
        password: dataAccount.password,
        username: dataAccount.username,
      });

      if (data.status !== 200) throw data;
      if (data.success) {
        dispatch(
          showAlert({
            color: "success",
            message: data.message,
          })
        );
        setTimeout(() => {
          dispatch(hideAlert());
          setLoading(false);
        }, 2500);
        navigate("/signin");
      }
    } catch (error) {
      const errorMsg = error.data.message;
      if (errorMsg) {
        dispatch(
          showAlert({
            color: "failure",
            message: errorMsg,
          })
        );
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
          inputValue={dataAccount.email}
          onChange={handleChange}
        />
        <Input
          labelText="Your name"
          inputId="username"
          type="text"
          placeholder="Juan Hernandez"
          name="username"
          inputValue={dataAccount.username}
          onChange={handleChange}
        />

        <Input
          labelText="Your password"
          inputId="password"
          type="password"
          placeholder="*****"
          name="password"
          inputValue={dataAccount.password}
          onChange={handleChange}
        />

        <Input
          labelText="Repeat password"
          inputId="password2"
          type="password"
          placeholder="*****"
          name="repeatP"
          inputValue={dataAccount.repeatP}
          onChange={handleChange}
        />

        {loading ? (
          <SpinnerR />
        ) : (
          <Button type="submit" className="w-full max-w-[80%] mx-auto">
            Register new account
          </Button>
        )}
      </form>
    </div>
  );
};

export default SignUp;
