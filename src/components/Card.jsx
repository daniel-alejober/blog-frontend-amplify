import React from "react";
import { Card, Button } from "flowbite-react";
import shortenText from "../utils/shortText";
import cleanTextHtml from "../utils/cleanTextHtml";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import splitDate from "../utils/splitDate";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";

const CardR = ({ article }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-sm">
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {article?.title}
        </h5>
        <span>
          {splitDate(article?.createdAt)} {format(article?.createdAt)}
        </span>
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
          <svg
            className="ml-2 -mr-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Card>
    </div>
  );
};

export default CardR;
