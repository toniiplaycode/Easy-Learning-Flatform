import { useState } from "react";

const MyCourse = () => {
  const [activeTab, setActiveTab] = useState(1); // Default active tab

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Set the active tab based on click
  };

  return (
    <div className="mycourse min-vh-100">
      <header className="mycourse__header" />

      <nav className="mycourse__tabs">
        <ul className="mycourse__tabs-list">
          <li
            className={`mycourse__tab ${
              activeTab === 1 ? "mycourse__tab--active" : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            Khóa học của tôi
          </li>
          <li
            className={`mycourse__tab ${
              activeTab === 2 ? "mycourse__tab--active" : ""
            }`}
            onClick={() => handleTabClick(2)}
          >
            Mong muốn
          </li>
          <li
            className={`mycourse__tab ${
              activeTab === 3 ? "mycourse__tab--active" : ""
            }`}
            onClick={() => handleTabClick(3)}
          >
            Giỏ hàng
          </li>
        </ul>
      </nav>

      {/* Course Cards Section */}
      <section className="mycourse__content">
        {/* Course 1 */}
        <div className="mycourse__card">
          <img src="imgs/logo.png" className="mycourse__card-img" />
          <div className="mycourse__card-info">
            <h3 className="mycourse__card-title">
              Web Design for Web Developers: Build Beautiful Websites
            </h3>
            <p className="mycourse__card-author">Jonas Schmedtmann</p>
            <div className="mycourse__progress-bar">
              <div
                className="mycourse__progress"
                style={{ width: "14%" }}
              ></div>
            </div>
            <p className="mycourse__progress-text">Hoàn thành 14%</p>
          </div>
        </div>

        {/* Course 2 */}
        <div className="mycourse__card">
          <img src="imgs/logo.png" className="mycourse__card-img" />
          <div className="mycourse__card-info">
            <h3 className="mycourse__card-title">
              Cách tạo một khóa học Udemy (Có phụ đề)
            </h3>
            <p className="mycourse__card-author">Udemy Instructor Team</p>
            <p className="mycourse__progress-text">BẮT ĐẦU KHÓA HỌC</p>
          </div>
        </div>

        {/* Course 2 */}
        <div className="mycourse__card">
          <img src="imgs/logo.png" className="mycourse__card-img" />
          <div className="mycourse__card-info">
            <h3 className="mycourse__card-title">
              Cách tạo một khóa học Udemy (Có phụ đề)
            </h3>
            <p className="mycourse__card-author">Udemy Instructor Team</p>
            <p className="mycourse__progress-text">BẮT ĐẦU KHÓA HỌC</p>
          </div>
        </div>

        {/* Course 2 */}
        <div className="mycourse__card">
          <img src="imgs/logo.png" className="mycourse__card-img" />
          <div className="mycourse__card-info">
            <h3 className="mycourse__card-title">
              Cách tạo một khóa học Udemy (Có phụ đề)
            </h3>
            <p className="mycourse__card-author">Udemy Instructor Team</p>
            <p className="mycourse__progress-text">BẮT ĐẦU KHÓA HỌC</p>
          </div>
        </div>

        {/* Course 2 */}
        <div className="mycourse__card">
          <img src="imgs/logo.png" className="mycourse__card-img" />
          <div className="mycourse__card-info">
            <h3 className="mycourse__card-title">
              Cách tạo một khóa học Udemy (Có phụ đề)
            </h3>
            <p className="mycourse__card-author">Udemy Instructor Team</p>
            <p className="mycourse__progress-text">BẮT ĐẦU KHÓA HỌC</p>
          </div>
        </div>

        {/* Course 2 */}
        <div className="mycourse__card">
          <img src="imgs/logo.png" className="mycourse__card-img" />
          <div className="mycourse__card-info">
            <h3 className="mycourse__card-title">
              Cách tạo một khóa học Udemy (Có phụ đề)
            </h3>
            <p className="mycourse__card-author">Udemy Instructor Team</p>
            <p className="mycourse__progress-text">BẮT ĐẦU KHÓA HỌC</p>
          </div>
        </div>

        {/* Course 2 */}
        <div className="mycourse__card">
          <img src="imgs/logo.png" className="mycourse__card-img" />
          <div className="mycourse__card-info">
            <h3 className="mycourse__card-title">
              Cách tạo một khóa học Udemy (Có phụ đề)
            </h3>
            <p className="mycourse__card-author">Udemy Instructor Team</p>
            <p className="mycourse__progress-text">BẮT ĐẦU KHÓA HỌC</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyCourse;
