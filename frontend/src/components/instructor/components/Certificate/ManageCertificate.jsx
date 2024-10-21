const ManageCertificate = () => {
  return (
    <div className="certificate-container">
      <div className="certificate-content">
        <div className="certificate-header">
          <h1>CERTIFICATE</h1>
          <p>OF APPRECIATION</p>
        </div>
        <div className="certificate-body">
          <p className="present-text">THIS CERTIFICATE IS PRESENTED TO</p>
          <h2 className="recipient-name">Rufus Stewart</h2>
          <p>Has successfully completed the course</p>
          <p className="certificate-description">Khóa học lập trình cơ bản</p>
        </div>
        <div className="certificate-footer">
          <div>
            <img src="/imgs/logo.png" />
          </div>
          <div className="signatures">
            <p>Can Tho, 20/10/2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCertificate;
