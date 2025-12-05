import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_PRODUCTS = "http://localhost:3001/products";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ name: "", price: "", image: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_PRODUCTS}/${id}`);
        if (!res.ok) throw new Error("Lỗi tải dữ liệu");
        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error(error);
        toast.error("Lỗi: " + error.message);
      } finally {
        setLoadingForm(false);
      }
    })();
  }, [id]);


  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Vui lòng nhập tên sản phẩm");
      return;
    }
    if (!form.price || form.price <= 0) {
      toast.error("Vui lòng nhập giá hợp lệ");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_PRODUCTS}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          price: Number(form.price),
          image: form.image || "",
          location: form.location || ""
        }),
      });
      if (!res.ok) throw new Error("Lỗi cập nhật sản phẩm");

      toast.success("Cập nhật thành công!");
      navigate("/list");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  if (loadingForm) return <p className="text-center text-gray-500">Đang tải...</p>;

  return (
    <div className="max-w-md mx-auto p-6 shadow border rounded">
      <h2 className="text-3xl font-bold mb-4 text-center">Sửa sản phẩm</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tên sản phẩm</label>
          <input 
            value={form.name} 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nhập tên sản phẩm"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Giá</label>
          <input 
            type="number"
            value={form.price} 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Nhập giá"
            min="0"
            step="0.01"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ảnh (URL)</label>
          <input 
            value={form.image} 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Nhập URL ảnh"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Khu vực</label>
          <input 
            value={form.location} 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Nhập khu vực"
            disabled={loading}
          />
        </div>

        <button 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
}