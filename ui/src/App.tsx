import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthRequired from "./components/AuthRequired";
import AdminLayout from "./layout/AdminLayout";
import EducationProofForm from "./pages/AddEducation";
import EmploymentProofForm from "./pages/AddEmployment";
import DashboardPage from "./pages/Dashboard";
import Approvals from "./pages/EducationApproval";
import EducationApprovals from "./pages/EducationApproval";
import EmploymentApprovals from "./pages/EmploymentApproval";

function App() {
  return useRoutes([
    {
      path: "/user",
      element: <AdminLayout />,
      children: [
        {
          path: "/user",
          element: (
            <AuthRequired>
              <DashboardPage />
            </AuthRequired>
          ),
        },
        {
          path: "/user/education-approvals",
          element: (
            <AuthRequired>
              <EducationApprovals />
            </AuthRequired>
          ),
        },
        {
          path: "/user/employment-approvals",
          element: (
            <AuthRequired>
              <EmploymentApprovals />
            </AuthRequired>
          ),
        },
        {
          path: "/user/add-education",
          element: (
            <AuthRequired>
              <EducationProofForm />
            </AuthRequired>
          ),
        },
        {
          path: "/user/add-employment",
          element: (
            <AuthRequired>
              <EmploymentProofForm />
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
          path: "/",
          element: <Home />,
        },
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
