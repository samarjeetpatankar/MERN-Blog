import React from "react";
import Home from "./Components/Home";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Articles from "./Components/Articles.jsx";
import ArticleDetail from "./Components/ArticleDetail.jsx";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import CreateBlogs from "./Components/CreateBlogs.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="" element={<Articles />} />
        <Route path="/ArticleDetail/:id" element={<ArticleDetail />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createblogs" element={<CreateBlogs />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
