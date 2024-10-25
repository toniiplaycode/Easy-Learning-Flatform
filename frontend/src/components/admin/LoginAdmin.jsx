import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../reducers/apiLoginLogout";
import { Button } from "@chakra-ui/react";

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CheckEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const statusPostLogin = useSelector(
    (state) => state.apiLoginLogout.statusPostLogin
  );

  useEffect(() => {
    if (statusPostLogin == "failed") {
      toast.error("Email hoặc password sai !");
      setIsLoading(false);
    }

    if (statusPostLogin == "loading") {
      setIsLoading(true);
    }

    if (statusPostLogin == "succeeded") {
      toast.success("Đăng nhập thành công !");
      setIsLoading(false);
      navigate("/");
    }
  }, [statusPostLogin]);

  const handleCheck = () => {
    let check = true;
    if (email.trim().length == 0) {
      setCheckEmail(true);
      check = false;
    }
    if (password.trim().length == 0) {
      setCheckPassword(true);
      check = false;
    }
    return check;
  };

  return (
    <div className="login-container">
      <div className="login-form">
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
        <Button
          isLoading={isLoading}
          type="submit"
          className="btn btn-primary w-100"
          loadingText="Đăng nhập quản lý..."
          colorScheme="#007bff"
          onClick={() => {
            if (handleCheck()) {
              dispatch(postLogin({ email, password }));
            }
          }}
        >
          Đăng nhập quản lý
        </Button>
      </div>
    </div>
  );
};

export default LoginAdmin;
