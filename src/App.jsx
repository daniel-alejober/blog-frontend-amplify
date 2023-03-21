import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUp,
  ProtectedRoutes,
  NewArticle,
  ArticleById,
  MyArticles,
  EditArticle,
} from "./views";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 min-h-screen pb-1">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/article/:articleId" element={<ArticleById />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/newarticle" element={<NewArticle />} />
            <Route path="/myarticles" element={<MyArticles />} />
            <Route path="/edit-article/:articleId" element={<EditArticle />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
