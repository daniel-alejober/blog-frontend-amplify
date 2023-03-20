import React, { useState, useEffect } from "react";
import splitDate from "../utils/splitDate";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as LikeOutLine,
  HandThumbDownIcon as DisLikeOutLine,
} from "@heroicons/react/24/outline";
import ToastR from "./ToastR";
import { likeArticle, dislikeArticle } from "../request/articles";

const Article = ({ dataArticle }) => {
  if (Object.keys(dataArticle).length === 0) return;
  const itemLS = localStorage.getItem("persist:root");
  const usuario = JSON.parse(itemLS);
  const objectUser = JSON.parse(usuario.user);
  const dataUser = objectUser.user;
  let userId;
  if (dataUser !== null) userId = dataUser.userId;

  const [msgToast, setMsgToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    if (dataUser !== null) {
      const arrayLikes = dataArticle.likes;
      const arrayDisLikes = dataArticle.dislikes;
      const articleLiked = arrayLikes.includes(userId);
      const articleDisliked = arrayDisLikes.includes(userId);
      setLiked(articleLiked);
      setDisliked(articleDisliked);
    }
  }, []);

  const like = async () => {
    try {
      const data = await likeArticle(dataArticle.articleId);

      if (data.status === 200) {
        const arrayLikes = data.data.article.likes;
        const articleLiked = arrayLikes.includes(userId);
        setLiked(articleLiked);
        setDisliked(false);
      } else throw data;
    } catch (error) {
      if (!error.data.success) {
        setShowToast(true);
        setMsgToast(
          "Do you like this article? Autenthicate to be able to interact."
        );
        return;
      }
    }
  };
  const dislike = async () => {
    try {
      const data = await dislikeArticle(dataArticle.articleId);

      if (data.status === 200) {
        const arrayDisikes = data.data.article.dislikes;
        const articleDisliked = arrayDisikes.includes(userId);
        setLiked(false);
        setDisliked(articleDisliked);
      } else throw data;
    } catch (error) {
      if (!error.data.success) {
        setShowToast(true);
        setMsgToast(
          "Do you dislike this article? Autenthicate to be able to interact."
        );
        return;
      }
    }
  };

  return (
    <main className="pt-2 pb-8 lg:pt-2 lg:pb-10  dark:bg-gray-900 ">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article>
          <header className="mb-4 lg:mb-6 not-format">
            <address className=" mb-6 not-italic w-full ">
              <div className="mr-3 text-sm text-gray-900 dark:text-white flex items-center justify-between relative">
                {showToast && (
                  <ToastR messageToast={msgToast} setShowToast={setShowToast} />
                )}
                <div>
                  <p className=" text-2xl font-bold text-gray-500 dark:text-gray-400">
                    {dataArticle?.username}
                  </p>
                  <p className="text-base font-light  text-gray-500 dark:text-gray-400">
                    {splitDate(dataArticle?.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  {liked ? (
                    <HandThumbUpIcon className="h-6 w-6 text-red-700 cursor-pointer" />
                  ) : (
                    <LikeOutLine
                      className="h-6 w-6 text-red-700 cursor-pointer"
                      onClick={like}
                    />
                  )}
                  {disliked ? (
                    <HandThumbDownIcon className="h-6 w-6 text-red-700 cursor-pointer" />
                  ) : (
                    <DisLikeOutLine
                      className="h-6 w-6 text-red-700 cursor-pointer"
                      onClick={dislike}
                    />
                  )}
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white lg:mb-6 lg:text-4xl ">
              {dataArticle?.title}
            </h1>
          </header>
          <div
            className="text-white"
            dangerouslySetInnerHTML={{ __html: dataArticle?.content }}
          />
          <figure className="mt-5 flex items-center justify-center">
            <img src={dataArticle.url} alt={dataArticle?.title} />
          </figure>
        </article>
      </div>
    </main>
  );
};

export default Article;
