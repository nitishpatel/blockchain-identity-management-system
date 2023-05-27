import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/Login";

function App() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);
}

export default App;
