import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import Input from "../components/Input";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";
import axiosClient from "../utils/axiosClient";
import { emailRegex, nombreRegex } from "../utils/constants";

const SignUp = () => {
  const navigate = useNavigate();
  const [dataAccount, setDataAccount] = useState({
    email: "",
    username: "",
    password: "",
    repeatP: "",
  });
  const [dataAlert, setDataAlert] = useState({
    colorAlert: "",
    messageAlert: "",
  });
  const [alertForm, setAlertForm] = useState(false);
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
    if (!emailRegex.test(dataAccount.email)) {
      setAlertForm(true);
      setDataAlert({
        colorAlert: "failure",
        messageAlert: "Enter a valid email",
      });
      setTimeout(() => {
        setAlertForm(false);
        setLoading(false);
      }, 2500);
      return;
    }
    if (!nombreRegex.test(dataAccount.username)) {
      setAlertForm(true);
      setDataAlert({
        colorAlert: "failure",
        messageAlert: "Enter a valid name",
      });
      setTimeout(() => {
        setAlertForm(false);
        setLoading(false);
      }, 2500);
      return;
    }
    if (dataAccount.password !== dataAccount.repeatP) {
      setAlertForm(true);
      setDataAlert({
        colorAlert: "failure",
        messageAlert: "Both passwords must be the same",
      });
      setTimeout(() => {
        setAlertForm(false);
        setLoading(false);
      }, 2500);
      return;
    }
    try {
      const { data } = await axiosClient.post("/users", {
        email: dataAccount.email,
        password: dataAccount.password,
        username: dataAccount.username,
      });
      if (data.success) {
        setAlertForm(true);
        setDataAlert({
          colorAlert: "success",
          messageAlert: data.message,
        });
        setTimeout(() => {
          setAlertForm(false);
          setLoading(false);
          navigate("/signin");
        }, 2500);
      }
    } catch (error) {
      setAlertForm(true);
      setDataAlert({
        colorAlert: "failure",
        messageAlert: error.response.data.message,
      });
      setTimeout(() => {
        setAlertForm(false);
        setLoading(false);
      }, 2500);
      return;
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
