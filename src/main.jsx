import React from "react";
import ReactDOM from "react-dom/client";
import "./style/global.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import UserPage from "./pages/user.jsx";
import BookPage from "./pages/book.jsx";
import ToDoApp from "./components/learn/todoApp.jsx";
import ErrorPage from "./pages/error.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import PrivateRoute from "./pages/private.route.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ToDoApp />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/books",
        element: (
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);
