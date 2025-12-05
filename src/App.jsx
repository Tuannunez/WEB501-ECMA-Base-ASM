import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import pages
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ListPage from "./pages/List";
import AddPage from "./pages/Add";
import EditPage from "./pages/Edit";

// Import bảo vệ route
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">Trang chủ</Link>
            <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
            <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
            <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4">

        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
              <p className="text-lg text-gray-600">Ứng dụng quản lý dữ liệu</p>
            </div>
          } />

          {/* AUTH */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* CRUD */}
          <Route path="/list" element={<ListPage />} />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPage />
              </ProtectedRoute>
            }
          />
        </Routes>

      </div>

      <Toaster />
    </>
  );
}
