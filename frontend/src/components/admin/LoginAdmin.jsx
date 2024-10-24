import React, { useState } from "react";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Login: ", { email, password });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src="/imgs/logo.png" />
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Nhập email quản lý"
          />
        </div>
        <div className="input-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu quản lý"
          />
        </div>
        <button type="submit" className="login-button">
          Đăng nhập quản lý
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
