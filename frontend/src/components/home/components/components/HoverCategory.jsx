import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HoverCategory = ({ right }) => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.apiCategory.categories);

  return (
    <>
      <div className={`header-container-hover ${right && "right"}`}>
        {categories?.map((item, index) => (
          <div
            class="header-hover-item"
            onClick={() => navigate(`/search?category_id=${item.id}`)}
          >
            {item.name} <FontAwesomeIcon icon={faAngleRight} />
          </div>
        ))}
        <div class="header-hover-item" onClick={() => navigate(`/search`)}>
          Tất cả thể loại <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </>
  );
};

export default HoverCategory;
