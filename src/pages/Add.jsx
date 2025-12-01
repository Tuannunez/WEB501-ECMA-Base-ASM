import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function AddPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [slots, setSlots] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/tours", {
        name,
        price: Number(price),
        category,
        duration,
        location,
        slots: Number(slots),
        image,
        description,
      });

      toast.success("Thêm tour thành công");

      // reset form
      setName("");
      setPrice("");
      setCategory("");
      setDuration("");
      setLocation("");
      setSlots("");
      setImage("");
      setDescription("");

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới Tour</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        <div>
          <label className="block font-medium mb-1">Tên Tour</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Giá</label>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            type="number"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Danh mục</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Chọn loại tour --</option>
            <option value="1">Tour nội địa</option>
            <option value="2">Tour ngoại quốc</option>
          </select>
        </div>

        {/* 🆕 THÊM CÁC TRƯỜNG DỮ LIỆU */}
        <div>
          <label className="block font-medium mb-1">Thời gian</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="text"
            placeholder="VD: 3 ngày 2 đêm"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Địa điểm</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="VD: Đà Nẵng"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Số chỗ</label>
          <input
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
            type="number"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Hình ảnh (URL)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPage;
