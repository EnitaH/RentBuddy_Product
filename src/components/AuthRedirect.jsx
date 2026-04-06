import { Navigate } from "react-router-dom";

export default function AuthRedirect({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const savedUser = localStorage.getItem("user");

  if (isLoggedIn && savedUser) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}