import React, { useState } from "react";
import { Card, Button } from "flowbite-react";
import shortenText from "../utils/shortText";
import cleanTextHtml from "../utils/cleanTextHtml";
import { useNavigate } from "react-router-dom";
import splitDate from "../utils/splitDate";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  PencilSquareIcon,
  TrashIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import ModalR from "./Modal";

const CardR = ({ article, owner }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-sm">
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {article?.title}
        </h5>
        <span>{splitDate(article?.createdAt)} </span>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {cleanTextHtml(shortenText(article?.content))}
        </p>
        <div className="flex justify-evenly items-center">
          <div className="flex items-center gap-x-1">
            <span>{article.likes.length}</span>
            <HandThumbUpIcon className="h-6 w-6 text-black" />
          </div>
          <div className="flex items-center gap-x-1">
            <span>{article.dislikes.length}</span>
            <HandThumbDownIcon className="h-6 w-6 text-black" />
          </div>
        </div>
        <Button onClick={() => navigate(`/article/${article.articleId}`)}>
          Read more
          <BookOpenIcon className="h-5 w-5 text-white mx-2" />
        </Button>
        {owner && (
          <>
            <Button
              onClick={() => navigate(`/edit-article/${article.articleId}`)}
              className="bg-indigo-700 hover:bg-indigo-900"
            >
              Edit
              <PencilSquareIcon className="h-5 w-5 text-white mx-2" />
            </Button>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-red-700 hover:bg-red-900"
            >
              Delete
              <TrashIcon className="h-5 w-5 text-white mx-2" />
            </Button>
          </>
        )}
      </Card>

      <ModalR
        showModal={showModal}
        setShowModal={setShowModal}
        articleId={article.articleId}
      />
    </div>
  );
};

export default CardR;
