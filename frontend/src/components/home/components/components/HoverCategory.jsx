import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HoverCategory = ({ right }) => {
  return (
    <>
      <div className={`header-container-hover ${right && "right"}`}>
        <div class="header-hover-item">
          Phát triển <FontAwesomeIcon icon={faAngleRight} />
        </div>
        <div class="header-hover-item">
          Kinh doanh <FontAwesomeIcon icon={faAngleRight} />
        </div>
        <div class="header-hover-item">Tài chính & Kế toán</div>
        <div class="header-hover-item">CNTT & Phần mềm</div>
        <div class="header-hover-item">Năng suất văn phòng</div>
        <div class="header-hover-item">Phát triển cá nhân</div>
        <div class="header-hover-item">Thiết kế</div>
        <div class="header-hover-item">Marketing</div>
        <div class="header-hover-item">Sức khỏe & Thể dục</div>
        <div class="header-hover-item">Âm nhạc</div>
      </div>
    </>
  );
};

export default HoverCategory;
