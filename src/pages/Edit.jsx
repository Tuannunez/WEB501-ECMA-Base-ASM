function Edit() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Cập nhật sản phẩm</h1>

      <form>
        <div>
          <label>Tên sản phẩm</label><br />
          <input type="text" placeholder="Nhập tên sản phẩm" />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Giá</label><br />
          <input type="number" placeholder="Nhập giá" />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Mô tả</label><br />
          <textarea placeholder="Nhập mô tả" rows="3"></textarea>
        </div>

        <button 
          type="submit"
          style={{ 
            marginTop: "15px",
            padding: "8px 16px",
            cursor: "pointer"
          }}
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default Edit;
