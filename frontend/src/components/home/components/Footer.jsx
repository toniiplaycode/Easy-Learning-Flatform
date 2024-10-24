const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-6">
            <ul className="footer-links">
              <li>
                <a href="#">Easy Learning Business</a>
              </li>
              <li>
                <a href="#">Giảng dạy trên Easy Learning</a>
              </li>
              <li>
                <a href="#">Tải ứng dụng</a>
              </li>
              <li>
                <a href="#">Giới thiệu</a>
              </li>
              <li>
                <a href="#">Hãy liên hệ với chúng tôi</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-6">
            <ul className="footer-links">
              <li>
                <a href="#">Nghề nghiệp</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Trợ giúp và Hỗ trợ</a>
              </li>
              <li>
                <a href="#">Đơn vị liên kết</a>
              </li>
              <li>
                <a href="#">Nhà đầu tư</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-6">
            <ul className="footer-links">
              <li>
                <a href="#">Điều khoản</a>
              </li>
              <li>
                <a href="#">Chính sách về quyền riêng tư</a>
              </li>
              <li>
                <a href="#">Cài đặt cookie</a>
              </li>
              <li>
                <a href="#">Sơ đồ trang web</a>
              </li>
              <li>
                <a href="#">Tuyên bố về khả năng tiếp cận</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 col-6">
            <ul className="footer-links">
              <li>
                <a href="#">Công nghệ thông tin</a>
              </li>
              <li>
                <a href="#">Thiết kế đồ hoạ</a>
              </li>
              <li>
                <a href="#">Ngoại ngữ</a>
              </li>
              <li>
                <a href="#">Tin học văn phòng</a>
              </li>
              <li>
                <a href="#">Kinh tế và tài chính</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          {/* Language and Logo Section */}
          <div className="footer-logo col-6">
            <img src="/imgs/logo.png" />
          </div>
          <div className="footer-copyright col-6">
            &copy; 2024 Easy Learning, Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
