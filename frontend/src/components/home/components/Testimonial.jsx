import React from "react";

const Testimonial = () => {
  const testimonials = [
    {
      quote:
        "Easy Learning được đánh giá là chương trình cấp chứng chỉ hoặc khóa học online phổ biến nhất về học cách viết code theo Khảo sát năm 2024.",
      author: {
        name: "Alvin Lim",
        title: "Đồng sáng lập kỹ thuật, CTO tại Dimensional",
        image: "imgs/profile.png",
      },
      link: "Xem các khóa học website",
    },
    {
      quote:
        "Easy Learning thực sự là yếu tố mang tính đột phá và là nền tảng dạy học tuyệt vời dành cho tôi khi chúng tôi đưa Dimensional vào cuộc sống.",
      author: {
        name: "Alvin Lim",
        title: "Đồng sáng lập kỹ thuật, CTO tại Dimensional",
        image: "imgs/profile1.png",
      },
      link: "Xem khóa học iOS & Swift này",
    },
    {
      quote:
        "Easy Learning cho bạn khả năng kiên trì. Những kiến thức và kỹ năng này đã giúp tôi tự phát triển bản thân và thăng tiến sự nghiệp.",
      author: {
        name: "William A. Wachlin",
        title: "Chuyên viên đối tác tại Amazon Web Services",
        image: "imgs/profile2.png",
      },
      link: "Xem khóa học AWS này",
    },
    {
      quote:
        "Với Easy Learning Business, các nhân viên đã có thể kết hợp các kỹ năng mềm về công nghệ lại với nhau... để thúc đẩy sự nghiệp của họ phát triển.",
      author: {
        name: "Ian Stevens",
        title: "Head Development, at Publicis Sapient",
        image: "imgs/profile3.png",
      },
      link: "Xem khóa học business này",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="col-xl-3 col-lg-6 col-12 d-flex">
            <div className="p-3 mb-3 shadow-sm w-100 border rounded">
              <p style={{ height: "130px" }}>“{testimonial.quote}”</p>
              {testimonial.author && (
                <div className="d-flex align-items-center mt-3">
                  <img
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />
                  <div>
                    <span className="fw-bold">{testimonial.author.name}</span>
                    <p className="text-muted">{testimonial.author.title}</p>
                  </div>
                </div>
              )}
              <a href="#" className="d-block mt-3 text-primary">
                {testimonial.link} &gt;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
