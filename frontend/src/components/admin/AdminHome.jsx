import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../../reducers/apiLoginLogout";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/common";
import DeleteConfirm from "../instructor/components/DeleteConfirm";

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterUser, setFilterUser] = useState();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const inforUser = useSelector((state) => state.apiLoginLogout.inforUser);
  const users = useSelector((state) => state.apiLoginLogout.users);

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.id !== inforUser.id);
    setFilterUser(filteredUsers);
  }, [users]);

  return (
    <>
      <div className="header-pc">
        <div className="instructor-header container_header">
          <p onClick={() => navigate("/")}>Về trang chủ</p>
          <div className="header-hover">
            <img src="/imgs/user.png" />
          </div>
        </div>
      </div>
      <div className="mange-list-page-container" style={{ marginTop: "80px" }}>
        <div className="mange-list">
          <div className="header" style={{ display: "flex" }}>
            <div className="header-item" style={{ flex: 1 }}>
              Gmail
            </div>
            <div className="header-item" style={{ flex: 1 }}>
              Tên tài khoản
            </div>
            <div className="header-item" style={{ flex: 1 }}>
              Loại tài khoản
            </div>
            <div className="header-item" style={{ flex: 2 }}>
              Bio
            </div>
            <div className="header-item" style={{ flex: 1 }}>
              Ngày tạo
            </div>
            <div className="header-item" style={{ flex: 1 }}>
              Thao tác
            </div>
          </div>
          {filterUser?.length > 0 &&
            filterUser.map((user) => (
              <div
                className="mange-item"
                style={{ display: "flex" }}
                key={user.id}
              >
                <div className="item" style={{ flex: 1}}>
                  {user.email}
                </div>
                <div className="item" style={{ flex: 1 }}>
                  {user.name}
                </div>
                <div className="item" style={{ flex: 1 }}>
                  {user.role === "student" ? "Học viên" : "Giảng viên"}
                </div>
                <div className="item" style={{ flex: 2 }}>
                  {user.bio ? user.bio : "..."}
                </div>
                <div className="item" style={{ flex: 1 }}>
                  {formatDate(user.created_at)}
                </div>
                <div className="item" style={{ flex: 1 }}>
                  <DeleteConfirm delete_user={user.id} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
