import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

function ListPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/tours");
        setTours(data);
      } catch (error) {
        toast.error("Không thể tải:", error);
      }
    };
    getTours();
  }, []);
  
  const handleDelete = async (id) => {
    if (!confirm("bạn cóc chắc chắn muốn xóa k")) return;
    try {
      await axios.delete(`http://localhost:3001/tours/${id}`);
      setTours(tours.filter((tour) => tour.id !== id));
    } catch (error) {
      toast.error("Không thể tải:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tours</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Tên Tour</th>
              <th className="px-4 py-2 border">Giá</th>
              <th className="px-4 py-2 border">Thời gian</th>

              {/* 🆕 THÊM CÁC TRƯỜNG DỮ LIỆU NGAY TẠI ĐÂY */}
              <th className="px-4 py-2 border">Địa điểm</th>
              <th className="px-4 py-2 border">Số chỗ</th>
              <th className="px-4 py-2 border">Hình ảnh</th>
              <th className="px-4 py-2 border">Mô tả</th>

              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{tour.id}</td>
                <td className="px-4 py-2 border font-medium">{tour.name}</td>

                <td className="px-4 py-2 border">
                  {tour.price?.toLocaleString("vi-VN")} VNĐ
                </td>

                <td className="px-4 py-2 border">{tour.duration}</td>

                {/* 🆕 THÊM DỮ LIỆU */}
                <td className="px-4 py-2 border">{tour.location}</td>

                <td className="px-4 py-2 border">{tour.slots}</td>

                <td className="px-4 py-2 border">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-2 border text-sm">
                  {tour.description?.slice(0, 40)}...
                </td>

                <td className="px-4 py-2 border space-x-2">
                  <Link
                    to={`/edit/${tour.id}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Sửa
                  </Link>

                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}

            {tours.length === 0 && (
              <tr>
                <td colSpan="10" className="px-4 py-4 text-center text-gray-500">
                  Không có tour nào trong danh sách.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
