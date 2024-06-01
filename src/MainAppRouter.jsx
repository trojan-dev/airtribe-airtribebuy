import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./container/AppLayout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import PrivateRoute from "../PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" />,
  },
  {
    path: "/products",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":productId",
        element: <ProductDetailsPage />,
      },
    ],
  },
  {
    path: "/cart",
    element: (
      <PrivateRoute>
        <CartPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <PrivateRoute>
        <h1>Checkout page</h1>
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <p>This route is not us! 😬</p>
      </>
    ),
  },
]);

export default function MainAppRouter() {
  return <RouterProvider router={router} />;
}
