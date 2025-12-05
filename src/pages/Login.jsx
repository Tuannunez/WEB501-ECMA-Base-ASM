import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_USERS = "http://localhost:3000/users";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      toast.error("Vui lòng nhập tên đăng nhập");
      return;
    }
    if (!form.password) {
      toast.error("Vui lòng nhập mật khẩu");
      return;
    }

    try {
      const res = await fetch(API_USERS);
      const users = await res.json();

      const found = users.find(
        (u) => u.username === form.username && u.password === form.password
      );

      if (!found) return toast.error("Sai tài khoản hoặc mật khẩu");

      localStorage.setItem("user", JSON.stringify(found));
      toast.success("Đăng nhập thành công!");
      navigate("/list");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow border rounded">
      <h2 className="text-3xl font-bold mb-4 text-center">Đăng nhập</h2>
      <form onSubmit={login} className="space-y-4">
        <input 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })} 
        />

        <input 
          type="password" 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} 
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Đăng nhập</button>
      </form>
    </div>
  );
}