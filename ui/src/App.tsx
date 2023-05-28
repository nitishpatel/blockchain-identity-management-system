import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthRequired from "./components/AuthRequired";
import AdminLayout from "./layout/AdminLayout";

function App() {
  return useRoutes([
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "/",
          element: (
            <AuthRequired>
              <Home />
            </AuthRequired>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);
}

export default App;
