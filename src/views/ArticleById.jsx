import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "../request/articles";
import { useDispatch, useSelector } from "react-redux";
import { showAlert, hideAlert } from "../redux/alertSlice";
import SpinnerR from "../components/Spinner";
import AlertR from "../components/Alert";
import Article from "../components/Article";

const ArticleById = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, color, message } = useSelector((state) => state.alert);
  const { articleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataArticle, setDataArticle] = useState({});

  useEffect(() => {
    const getArticle = async () => {
      setLoading(true);
      try {
        const data = await getArticleById(articleId);
        if (data.status === 200) {
          setDataArticle(data.data.article);
          setLoading(false);
        } else throw data;
      } catch (error) {
        const errorMsg = error.data.message;
        if (errorMsg) {
          dispatch(showAlert({ color: "failure", message: errorMsg }));
          setTimeout(() => {
            setLoading(false);
            dispatch(hideAlert());
          }, 3000);
          return navigate("/");
        }
      }
    };
    getArticle();
  }, []);

  return (
    <div className="max-w-[90%] mx-auto my-16 ">
      {loading ? (
        <SpinnerR />
      ) : show ? (
        <AlertR colorAlert={color} messageAlert={message} />
      ) : (
        <Article dataArticle={dataArticle} />
      )}
    </div>
  );
};

export default ArticleById;
