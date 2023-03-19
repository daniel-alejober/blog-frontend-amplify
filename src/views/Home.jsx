import React, { useState, useEffect, lazy, Suspense } from "react";
import { getAllArticles } from "../request/articles";
import AlertR from "../components/Alert";
import SpinnerR from "../components/Spinner";

const LazyCard = lazy(() => import("../components/Card"));

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertFlag, setAlertFlag] = useState(false);
  const [dataAlert, setDataAlert] = useState({
    colorAlert: "",
    messageAlert: "",
  });

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
          setAlertFlag(true);
          setDataAlert({
            colorAlert: "failure",
            messageAlert: errorMsg,
          });
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
      ) : alertFlag ? (
        <AlertR
          colorAlert={dataAlert.colorAlert}
          messageAlert={dataAlert.messageAlert}
        />
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
