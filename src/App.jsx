import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUp } from "./views";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
