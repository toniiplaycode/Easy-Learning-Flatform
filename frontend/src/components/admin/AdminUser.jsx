import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../../reducers/apiLoginLogout";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/common";
import DeleteConfirm from "../instructor/components/DeleteConfirm";

const AdminUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterUser, setFilterUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [sortOrder, setSortOrder] = useState("earliest"); // Default sort order

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  const users = useSelector((state) => state.apiLoginLogout.users);

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.id !== inforUser.id);
    setFilterUser(filteredUsers);
  }, [users, inforUser]);

  // Function to filter and sort users based on search term, selected role, and sort order
  const handleFilter = () => {
    const filtered = users
      .filter((user) => user.id !== inforUser.id)
      .filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole =
          selectedRole === "" ||
          (selectedRole === "student" && user.role === "student") ||
          (selectedRole === "instructor" && user.role === "instructor");
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        if (sortOrder === "earliest") {
          return new Date(a.created_at) - new Date(b.created_at);
        } else {
          return new Date(b.created_at) - new Date(a.created_at);
        }
      });

    setFilterUser(filtered);
  };

  // Update filter results whenever search term, selected role, or sort order changes
  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedRole, sortOrder]);

  return (
    <div className="mange-list-page-container" style={{ marginTop: "80px" }}>
      <div
        className="search-filter-container"
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            flex: 1,
            background: "#ccffff",
            borderRadius: "10px",
          }}
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{ padding: "8px", borderRadius: "10px" }}
        >
          <option value="">Tất cả loại tài khoản</option>
          <option value="student">Học viên</option>
          <option value="instructor">Giảng viên</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: "8px", borderRadius: "10px" }}
        >
          <option value="earliest">Sắp xếp: Ngày tạo (Cũ nhất)</option>
          <option value="latest">Sắp xếp: Ngày tạo (Mới nhất)</option>
        </select>
      </div>

      <div className="mange-list">
        <div className="header" style={{ display: "flex" }}>
          <div className="header-item">Gmail</div>
          <div className="header-item">Tên tài khoản</div>
          <div className="header-item">Loại tài khoản</div>
          <div className="header-item" style={{ flex: 2 }}>
            Bio
          </div>
          <div className="header-item">Ngày tạo</div>
          <div className="header-item">Thao tác</div>
        </div>
        {filterUser?.length > 0 ? (
          filterUser.map((user) => (
            <div
              className="mange-item"
              style={{ display: "flex" }}
              key={user.id}
            >
              <div className="item">{user.email}</div>
              <div className="item">{user.name}</div>
              <div className="item">
                {user.role === "student" ? "Học viên" : "Giảng viên"}
              </div>
              <div className="item" style={{ flex: 2 }}>
                {user.bio ? user.bio : "..."}
              </div>
              <div className="item">{formatDate(user.created_at)}</div>
              <div className="item">
                <DeleteConfirm delete_user={user.id} />
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "20px", textAlign: "center" }}>
            Không có người dùng nào phù hợp.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUser;
