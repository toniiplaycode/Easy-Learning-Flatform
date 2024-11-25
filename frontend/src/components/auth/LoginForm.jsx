import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../reducers/apiLoginLogout";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CheckEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);

  useEffect(() => {
    if (Object.keys(inforUser).length > 0) {
      navigate("/");
    }
  }, [inforUser, navigate]);

  const statusPostLogin = useSelector(
    (state) => state.apiLoginLogout.statusPostLogin
  );

  useEffect(() => {
    if (statusPostLogin === "failed") {
      toast.error("Email hoặc password sai !");
      setIsLoading(false);
    }

    if (statusPostLogin === "loading") {
      setIsLoading(true);
    }

    if (statusPostLogin === "succeeded") {
      toast.success("Đăng nhập thành công !");
      setIsLoading(false);
      navigate("/");
    }
  }, [statusPostLogin, navigate]);

  const handleCheck = () => {
    let check = true;
    if (email.trim().length === 0) {
      setCheckEmail(true);
      check = false;
    }
    if (password.trim().length === 0) {
      setCheckPassword(true);
      check = false;
    }
    return check;
  };

  // Google Login Integration
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const userData = await res.json();

        // Dispatch Google user info to your backend or Redux
        dispatch(
          postLogin({
            email: userData.email, // Use Google email
            password: "default_password", // Handle Google login password on backend
          })
        );

        toast.success("Đăng nhập bằng Google thành công!");
        navigate("/");
      } catch (error) {
        console.error("Google Login Error:", error);
        toast.error("Đăng nhập bằng Google thất bại!");
      }
    },
    onError: () => toast.error("Đăng nhập bằng Google thất bại!"),
  });

  return (
    <div className="container mt-5 min-vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Đăng nhập</h2>

          {/* Google Login Button */}
          <button
            className="btn btn-outline-primary w-100 mb-3"
            onClick={googleLogin}
          >
            <img
              src="/imgs/google.png"
              style={{ width: "25px", display: "inline-block" }}
            />{" "}
            Đăng nhập bằng Google
          </button>

          <p className="text-center">Hoặc</p>

          {/* Manual Login Form */}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setCheckEmail(null);
                }}
              />
              {CheckEmail && <p className="error-auth">Email không để trống</p>}
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

            <p className="mt-3 text-center text-muted">
              Đăng nhập để chúng tôi có thể theo dõi quá trình học của bạn!
            </p>

            <Button
              isLoading={isLoading}
              type="submit"
              className="btn btn-primary w-100"
              loadingText="Đăng nhập"
              colorScheme="#007bff"
              onClick={() => {
                if (handleCheck()) {
                  dispatch(postLogin({ email, password }));
                }
              }}
            >
              Đăng nhập
            </Button>
          </div>

          <p className="mt-4 text-center">
            Bạn chưa có tài khoản?{" "}
            <Link to="/signup" className="text-primary">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
