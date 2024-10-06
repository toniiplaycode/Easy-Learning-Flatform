import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="container mt-5 min-vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Đăng nhập</h2>

          <div>
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

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="offersCheck"
              />
              <label className="form-check-label" htmlFor="offersCheck">
                Lưu tài khoản
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Đăng nhập
            </button>

            <p className="mt-4 text-center">
              Bạn chưa có tài khoản?{" "}
              <Link to="/signup" className="text-primary">
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
