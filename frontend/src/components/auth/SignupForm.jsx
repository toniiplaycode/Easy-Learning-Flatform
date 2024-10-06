import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap CSS
import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <div className="container mt-5 min-vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Đăng ký và bắt đầu học</h2>

          <div>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Tên đầy đủ
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Tên đầy đủ"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mật khẩu"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Xác nhận Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mật khẩu"
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="offersCheck"
              />
              <label className="form-check-label" htmlFor="offersCheck">
                Gửi cho tôi các ưu đãi đặc biệt, đề xuất cá nhân hóa và bí quyết
                học tập.
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Đăng ký
            </button>

            <p className="mt-3 text-center text-muted">
              Bằng việc đăng ký, bạn đồng ý với{" "}
              <a href="#" className="text-decoration-none">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-decoration-none">
                Chính sách về quyền riêng tư
              </a>
              .
            </p>

            <p className="mt-4 text-center">
              Bạn đã có tài khoản chưa?{" "}
              <Link to="/login" className="text-primary">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
