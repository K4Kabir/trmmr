import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./app-layout";
import Auth from "./pages/Auth";
import Landing from "./pages/landing";
import Dashboard from "./pages/Dashboard";
import AuthPage from "@/lib/auth-page";
import Redirect from "./pages/rediect";
import Link from "./pages/link";

function App() {
  let routes = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/dashboard",
          element: (
            <AuthPage>
              <Dashboard />
            </AuthPage>
          ),
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:id",
          element: <Link />,
        },
      ],
    },
    {
      path: "/:id",
      element: <Redirect />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
