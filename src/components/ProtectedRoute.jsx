import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Kiểm tra user từ localStorage
  const user = localStorage.getItem("user");
  
  // Nếu chưa đăng nhập, redirect đến /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
