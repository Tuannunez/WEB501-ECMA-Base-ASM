import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_PRODUCTS = "http://localhost:3001/products";

export default function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_PRODUCTS);
      if (!res.ok) throw new Error("Lỗi tải dữ liệu");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const removeItem = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;
    
    try {
      const res = await fetch(`${API_PRODUCTS}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Lỗi xóa sản phẩm");
      toast.success("Xóa thành công!");
      loadData();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi: " + error.message);
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Danh sách sản phẩm</h2>
        <Link to="/add" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          + Thêm mới
        </Link>
      </div>

      {loading && <p className="text-center text-gray-500">Đang tải...</p>}

      {!loading && data.length === 0 && (
        <p className="text-center text-gray-500">Không có sản phẩm nào</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow hover:shadow-lg transition">
            {item.image && <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded" />}
            <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
            <p className="text-lg font-bold text-green-600">Giá: {Number(item.price).toLocaleString()}đ</p>
            {item.location && <p className="text-gray-600">Khu vực: {item.location}</p>}

            <div className="flex gap-2 mt-4">
              <Link to={`/edit/${item.id}`} className="flex-1 text-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Sửa
              </Link>
              <button 
                onClick={() => removeItem(item.id)} 
                className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}