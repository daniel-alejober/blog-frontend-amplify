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

export { createArticle, getAllArticles };
