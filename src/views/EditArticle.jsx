import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FileInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "../components/Input";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";
import { updateArticle } from "../request/articles.js";
import cleanTextHtml from "../utils/cleanTextHtml";
import { logOut } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert, showAlert } from "../redux/alertSlice";

const EditArticle = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const { show, color, message } = useSelector((state) => state.alert);
  const { articles } = useSelector((state) => state.articles);
  const [loading, setLoading] = useState(false);
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [nameImg, setNameImg] = useState("");
  const [currentArticle, setCurrentArticle] = useState(false);
  const [showInputFile, setShowInputFile] = useState(false);

  useEffect(() => {
    const getArticle = async () => {
      setLoadingGlobal(true);

      const currentArticle = articles.filter(
        (article) => article.articleId === articleId
      );
      if (currentArticle.length !== 0) {
        setTitle(currentArticle[0].title);
        setValue(currentArticle[0].content);
        setNameImg(currentArticle[0].nameImg);
        setLoadingGlobal(false);
      } else {
        setCurrentArticle(true);
        setLoadingGlobal(false);
      }
    };
    getArticle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanText = cleanTextHtml(value);
    if ([cleanText, title].includes("")) {
      dispatch(
        showAlert({
          color: "failure",
          message: "Title and Content are required",
        })
      );
      setTimeout(() => {
        dispatch(hideAlert());
        setLoading(false);
      }, 2500);
      return;
    }

    if (showInputFile && img === "") {
      dispatch(
        showAlert({
          color: "failure",
          message: "Select an image or use the current image",
        })
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
      const data = await updateArticle(articleId, formData);

      if (data.status !== 200) throw data;
      if (data.status === 200) {
        dispatch(showAlert({ color: "success", message: "Article updated" }));
        setTimeout(() => {
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
      {loadingGlobal ? (
        <SpinnerR />
      ) : currentArticle ? (
        <AlertR
          colorAlert="failure"
          messageAlert="This article does not exist or you are not the owner"
        />
      ) : (
        <>
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
            {showInputFile ? (
              <div
                id="fileUpload"
                className="flex items-center justify-between gap-x-3"
              >
                <FileInput
                  id="file"
                  name="img"
                  required={true}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    setShowInputFile(false);
                  }}
                >
                  Use current image
                </Button>
              </div>
            ) : (
              <div className=" flex items-center gap-x-4 ">
                <Button
                  onClick={() => {
                    setShowInputFile(true);
                  }}
                >
                  Change Image
                </Button>
                <span className="text-white">Current Img: {nameImg}</span>
              </div>
            )}
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
                Update Article
              </Button>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditArticle;
