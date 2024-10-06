const NotFound = () => {
  return (
    <div
      className="min-vh-100"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Không tìm thấy trang !</h2>
      <img
        src="imgs/notFound.gif"
        style={{
          border: "10px solid #42a5f6",
          borderRadius: "20px",
        }}
        alt="404 Not Found"
      />
    </div>
  );
};

export default NotFound;
