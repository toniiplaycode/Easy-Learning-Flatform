const HoverCourse = ({ right }) => {
  return (
    <>
      <div className={`header-container-hover ${right && "right"}`}>
        <div className="header-hover-item">Khóa học</div>
      </div>
    </>
  );
};

export default HoverCourse;
