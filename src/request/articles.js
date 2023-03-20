import axiosClient from "../utils/axiosClient";

const createArticle = async (dataArtitle) => {
  try {
    const data = await axiosClient.post(
      "/articles/create-article",
      dataArtitle
    );
    return data;
  } catch (error) {
    const response = error.response;
    return response;
  }
};

const getAllArticles = async () => {
  try {
    const data = await axiosClient.get("/articles");
    return data;
  } catch (error) {
    const response = error.response;
    return response;
  }
};

const getArticleById = async (articleId) => {
  try {
    const data = await axiosClient.get(`/articles/get-article/${articleId}`);
    return data;
  } catch (error) {
    const response = error.response;
    return response;
  }
};

const likeArticle = async (articleId) => {
  try {
    const data = await axiosClient.put(`/articles/like/${articleId}`, null);
    return data;
  } catch (error) {
    const response = error.response;
    return response;
  }
};

const dislikeArticle = async (articleId) => {
  try {
    const data = await axiosClient.put(`/articles/dislike/${articleId}`, null);
    return data;
  } catch (error) {
    const response = error.response;
    return response;
  }
};

export {
  createArticle,
  getAllArticles,
  getArticleById,
  likeArticle,
  dislikeArticle,
};
