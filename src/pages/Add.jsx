import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_PRODUCTS = "http://localhost:3001/products";

export default function AddPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", price: "", image: "", location: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim()) {
      toast.error("Vui lòng nhập tên sản phẩm!");
      return;
    }
    if (!form.price || form.price <= 0) {
      toast.error("Vui lòng nhập giá hợp lệ!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          price: Number(form.price),
          image: form.image || "",
          location: form.location || ""
        }),
      });

      if (!response.ok) throw new Error("Lỗi khi thêm sản phẩm");

      toast.success("Thêm sản phẩm thành công!");
      navigate("/list");
    } catch (error) {
      console.error(error);
      toast.error("Không thể thêm sản phẩm: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 shadow border rounded">
      <h2 className="text-3xl font-bold mb-4 text-center">Thêm sản phẩm</h2>
      <form onSubmit={submit} className="space-y-4">
        <input 
          placeholder="Tên sản phẩm" 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={loading}
        />

        <input 
          placeholder="Giá" 
          type="number"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          min="0"
          step="0.01"
          disabled={loading}
        />

        <input 
          placeholder="Ảnh (URL)" 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          disabled={loading}
        />

        <input 
          placeholder="Khu vực" 
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          disabled={loading}
        />

        <button 
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Đang thêm..." : "Thêm mới"}
        </button>
      </form>
    </div>
  );
}