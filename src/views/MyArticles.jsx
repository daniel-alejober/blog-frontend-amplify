import React, { useState, useEffect, lazy, Suspense } from "react";
import { getAllMyArticles } from "../request/articles";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../redux/alertSlice";
import { saveArticles } from "../redux/articlesSlice";
import { useNavigate } from "react-router-dom";

const LazyCard = lazy(() => import("../components/Card"));

const MyArticles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, color, message } = useSelector((state) => state.alert);
  const { articles } = useSelector((state) => state.articles);
  const [loading, setLoading] = useState(false);
  const owner = true;

  useEffect(() => {
    const getAllArticlesByUser = async () => {
      try {
        setLoading(true);
        const data = await getAllMyArticles();
        if (data.status === 200) {
          const articles = data.data.articles;
          dispatch(saveArticles(articles));
          setLoading(false);
        } else throw data;
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
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };
    getAllArticlesByUser();
  }, []);

  return (
    <div className="max-w-[80%] mx-auto my-16">
      {loading ? (
        <SpinnerR />
      ) : show ? (
        <AlertR colorAlert={color} messageAlert={message} />
      ) : articles.length === 0 ? (
        <AlertR
          colorAlert="info"
          messageAlert="You still have no articles at this moment"
        />
      ) : (
        <div className="flex gap-y-6 flex-wrap mx-auto md:items-center md:justify-evenly">
          {articles.map((arti) => (
            <Suspense key={arti.articleId} fallback={<SpinnerR />}>
              <LazyCard article={arti} owner={owner} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArticles;
