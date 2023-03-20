import React, { useState, useEffect, lazy, Suspense } from "react";
import { getAllArticles } from "../request/articles";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../redux/alertSlice";

const LazyCard = lazy(() => import("../components/Card"));

const Home = () => {
  const dispatch = useDispatch();
  const { show, color, message } = useSelector((state) => state.alert);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allArticles = async () => {
      setLoading(true);
      try {
        const data = await getAllArticles();
        if (data.status === 200) {
          const articlesData = data.data;

          if (articlesData.success) setArticles(articlesData.articles);
          setLoading(false);
        } else throw data;
      } catch (error) {
        const errorMsg = error.data.message;
        if (errorMsg) {
          dispatch(showAlert({ color: "failure", message: errorMsg }));
          setLoading(false);
          return;
        }
      } finally {
        setLoading(false);
      }
    };
    allArticles();
  }, []);

  return (
    <div className="max-w-[80%] mx-auto my-16 ">
      {loading ? (
        <SpinnerR />
      ) : show ? (
        <AlertR colorAlert={color} messageAlert={message} />
      ) : articles.length === 0 ? (
        <AlertR colorAlert="info" messageAlert="No articles at this moment" />
      ) : (
        <div className="flex gap-y-6 flex-wrap mx-auto md:items-center md:justify-evenly">
          {articles.map((arti) => (
            <Suspense key={arti.articleId} fallback={<SpinnerR />}>
              <LazyCard article={arti} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
