const ProgressBar = ({ completedLessons, totalLessons }) => {
  const percentage = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress-bar__fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-text">
        Hoàn thành {percentage}% ({completedLessons}/{totalLessons} bài học)
      </div>
    </div>
  );
};

export default ProgressBar;
