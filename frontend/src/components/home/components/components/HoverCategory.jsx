import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const HoverCategory = ({ right }) => {
  const categories = useSelector((state) => state.apiCategory.categories);

  return (
    <>
      <div className={`header-container-hover ${right && "right"}`}>
        {categories?.map((item, index) => (
          <div class="header-hover-item">
            {item.name} <FontAwesomeIcon icon={faAngleRight} />
          </div>
        ))}
        <div class="header-hover-item">
          Tất cả thể loại <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </>
  );
};

export default HoverCategory;
