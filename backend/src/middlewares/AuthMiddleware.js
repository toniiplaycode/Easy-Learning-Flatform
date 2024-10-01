import jwt from "jsonwebtoken";

// Middleware xác thực JWT
export var authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // JWT có thể ở dạng "Bearer TOKEN"

  if (!token) return res.sendStatus(401); // Nếu không có token, trả về Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token không hợp lệ, trả về Forbidden
    req.user = user; // Lưu thông tin người dùng vào req để dùng sau
    next(); // Tiếp tục nếu token hợp lệ
  });
};

// Middleware kiểm tra vai trò người dùng
export var authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
};
