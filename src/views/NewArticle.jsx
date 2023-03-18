import React, { useState } from "react";
import { Button, FileInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "../components/Input";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";
import { createArticle } from "../request/articles.js";

const NewArticle = () => {
  const [loading, setLoading] = useState(false);
  const [dataAlert, setDataAlert] = useState({
    colorAlert: "",
    messageAlert: "",
  });
  const [alertForm, setAlertForm] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanText = value.replace(/(<([^>]+)>)/gi, "");
    if ([cleanText, title, img].includes("")) {
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

    const formData = new FormData();
    formData.append("photo", img);
    formData.append("title", title);
    formData.append("content", cleanText);

    try {
      const data = await createArticle(formData);

      if (data.status !== 200) throw data;
      if (data.status === 200) {
        setAlertForm(true);
        setDataAlert({
          colorAlert: "success",
          messageAlert: data.data.message,
        });
        setTimeout(() => {
          setValue("");
          setTitle("");
          setImg(null);
          setAlertForm(false);
          setLoading(false);
          document.getElementById("file").value = "";
        }, 2500);
      }
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
          labelText="Title"
          inputId="titleArticle"
          type="text"
          placeholder="Title Article"
          name="title"
          inputValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div id="fileUpload">
          <FileInput
            id="file"
            helperText="A picture is useful to better understand the article"
            name="img"
            required={true}
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <ReactQuill
          className="text-white"
          theme="snow"
          value={value}
          onChange={setValue}
        />
        {loading ? (
          <SpinnerR />
        ) : (
          <Button type="submit" className="w-full max-w-[80%] mx-auto">
            Create Article
          </Button>
        )}
      </form>
    </div>
  );
};

export default NewArticle;
