import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearStatusSignUp, postSignup } from "../../reducers/apiSignup";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkFullName, setCheckFullName] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const statusPostSignUp = useSelector(
    (state) => state.apiSignup.statusPostSignUp
  );

  useEffect(() => {
    if (statusPostSignUp === "loading") {
      setIsLoading(true);
    }

    if (statusPostSignUp === "email exist") {
      toast.error("Email đã tồn tại!");
      setIsLoading(false);
    }

    if (statusPostSignUp === "failed") {
      toast.error("Đăng ký thất bại!");
      setIsLoading(false);
    }

    if (statusPostSignUp === "succeeded") {
      toast.success("Đăng ký thành công!");
      setIsLoading(false);
      dispatch(clearStatusSignUp());
      navigate("/login");
    }
  }, [statusPostSignUp]);

  const handleCheck = () => {
    let isValid = true;

    if (fullName.trim().length === 0) {
      setCheckFullName(true);
      isValid = false;
    }
    if (email.trim().length === 0) {
      setCheckEmail(true);
      isValid = false;
    }
    if (password.trim().length === 0) {
      setCheckPassword(true);
      isValid = false;
    }
    if (confirmPassword !== password) {
      setCheckConfirmPassword(true);
      isValid = false;
    }
    return isValid;
  };

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
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setCheckFullName(null);
                }}
              />
              {checkFullName && (
                <p className="error-auth">Tên đầy đủ không được để trống</p>
              )}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setCheckEmail(null);
                }}
              />
              {checkEmail && <p className="error-auth">Email không để trống</p>}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setCheckPassword(null);
                }}
              />
              {checkPassword && (
                <p className="error-auth">Mật khẩu không để trống</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Xác nhận Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Mật khẩu"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setCheckConfirmPassword(null);
                }}
              />
              {checkConfirmPassword && (
                <p className="error-auth">Mật khẩu không khớp</p>
              )}
            </div>

            <p className="mt-3 text-center text-muted">
              Bằng việc đăng ký, bạn đã đồng ý với Điều khoản sử dụng và Chính
              sách.
            </p>

            <Button
              isLoading={isLoading}
              type="submit"
              className="btn btn-primary w-100"
              loadingText="Đang đăng ký"
              colorScheme="#007bff"
              onClick={() => {
                if (handleCheck()) {
                  dispatch(
                    postSignup({
                      name: fullName,
                      email,
                      password,
                      confirmPassword,
                    })
                  );
                }
              }}
            >
              Đăng ký
            </Button>
          </div>

          <p className="mt-4 text-center">
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="text-primary">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
