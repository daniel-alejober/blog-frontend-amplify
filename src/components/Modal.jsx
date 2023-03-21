import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert, showAlert } from "../redux/alertSlice";
import { saveArticles } from "../redux/articlesSlice";
import { deleteArticle } from "../request/articles";
import SpinnerR from "./Spinner";

const ModalR = ({ showModal, setShowModal, articleId }) => {
  const dispatch = useDispatch();
  const { show, color, message } = useSelector((state) => state.alert);
  const { articles } = useSelector((state) => state.articles);
  const [loading, setLoading] = useState(false);

  const deleteArticleM = async () => {
    try {
      setLoading(true);
      const data = await deleteArticle(articleId);
      if (data.status === 200) {
        dispatch(showAlert({ color: "success", message: data.data.message }));
        const remainingArticles = articles.filter(
          (article) => article.articleId !== articleId
        );
        dispatch(saveArticles(remainingArticles));
        setTimeout(() => {
          dispatch(hideAlert());
          setLoading(false);
        }, 2500);
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
      }
    }
  };

  return (
    <>
      {show && <AlertR colorAlert={color} messageAlert={message} />}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Delete Article</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this article?
            </p>
          </div>
        </Modal.Body>
        {loading ? (
          <SpinnerR />
        ) : (
          <Modal.Footer className="flex justify-between">
            <Button
              onClick={deleteArticleM}
              className="bg-red-700 text-white hover:bg-red-900"
            >
              Delete
            </Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ModalR;
