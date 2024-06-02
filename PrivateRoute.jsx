import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("airtribebuy-cart");
  // eslint-disable-next-line react/prop-types
  return token ? <>{props.children}</> : <Navigate to="/products" />;
};

export default PrivateRoute;
