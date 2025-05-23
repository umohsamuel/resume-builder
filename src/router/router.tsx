import { createBrowserRouter } from "react-router";
import AppLayout from "./layout";
import AuthLayout from "./routes/auth/layout";
import Signin from "./routes/auth/signin/page";
import Home from "./routes/dashboard/home/page";
import PreviewResume from "./routes/dashboard/preview/page";
import Signup from "./routes/auth/signup/page";
import DashboardLayout from "./routes/dashboard/layout";

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        Component: AuthLayout,
        children: [
          {
            path: "/login/*",
            element: <Signin />,
          },
          {
            path: "/signup/*",
            element: <Signup />,
          },
        ],
      },
      {
        Component: DashboardLayout,
        children: [
          {
            index: true,
            path: "/",
            element: <Home />,
          },
          {
            path: "/preview",
            element: <PreviewResume />,
          },
        ],
      },
    ],
  },
]);
