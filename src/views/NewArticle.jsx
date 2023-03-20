import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FileInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "../components/Input";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";
import { createArticle } from "../request/articles.js";
import cleanTextHtml from "../utils/cleanTextHtml";
import { logOut } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert, showAlert } from "../redux/alertSlice";

const NewArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { show, color, message } = useSelector((state) => state.alert);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanText = cleanTextHtml(value);
    if ([cleanText, title, img].includes("")) {
      dispatch(
        showAlert({ color: "failure", message: "All inputs are required" })
      );
      setTimeout(() => {
        dispatch(hideAlert());
        setLoading(false);
      }, 2500);
      return;
    }

    const formData = new FormData();
    formData.append("photo", img);
    formData.append("title", title);
    formData.append("content", value);

    try {
      const data = await createArticle(formData);

      if (data.status !== 200) throw data;
      if (data.status === 200) {
        dispatch(showAlert({ color: "success", message: data.data.message }));
        setTimeout(() => {
          setValue("");
          setTitle("");
          setImg(null);
          document.getElementById("file").value = "";
          dispatch(hideAlert());
          setLoading(false);
        }, 2500);
      }
    } catch (error) {
      const errorMsg = error.data.message;
      const redirect = error.data.redirectTo;
      if (redirect) {
        dispatch(showAlert({ color: "failure", message: errorMsg }));
        setTimeout(() => {
          dispatch(hideAlert());
          setLoading(false);
          dispatch(logOut());
        }, 3000);
        navigate(redirect);
      } else {
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
