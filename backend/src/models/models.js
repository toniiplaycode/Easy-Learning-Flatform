import sequelize from "../config/connectDB.js"; // Đảm bảo đường dẫn đúng
import User from "./User.js";
import Course from "./Course.js";
import Category from "./Category.js";
import Section from "./Section.js";
import Lecture from "./Lecture.js";
import Review from "./Review.js";
import Enrollment from "./Enrollment.js";
import Payment from "./Payment.js";
import Certificate from "./Certificate.js";
import Wishlist from "./Wishlist.js";
import Coupon from "./Coupon.js";

// Thiết lập các mối quan hệ giữa các model
// User - Course (1 - N)
User.hasMany(Course, { foreignKey: "id" });
Course.belongsTo(User, { foreignKey: "instructor_id" });

// Category - Course (1 - N)
Category.hasMany(Course, { foreignKey: "id" });
Course.belongsTo(Category, { foreignKey: "category_id" });

// Course - Section (1 - N)
Course.hasMany(Section, { foreignKey: "id" });
Section.belongsTo(Course, { foreignKey: "course_id" });

// Section - Lecture (1 - N)
Section.hasMany(Lecture, { foreignKey: "section_id" });
Lecture.belongsTo(Section, { foreignKey: "section_id" });

// Course - Review (1 - N)
Course.hasMany(Review, { foreignKey: "course_id" });
Review.belongsTo(Course, { foreignKey: "course_id" });

// User - Enrollment (1 - N)
User.hasMany(Enrollment, { foreignKey: "user_id" });
Enrollment.belongsTo(User, { foreignKey: "user_id" });

// Course - Enrollment (1 - N)
Course.hasMany(Enrollment, { foreignKey: "course_id" });
Enrollment.belongsTo(Course, { foreignKey: "course_id" });

// User - Payment (1 - N)
User.hasMany(Payment, { foreignKey: "user_id" });
Payment.belongsTo(User, { foreignKey: "user_id" });

// Course - Payment (1 - N)
Course.hasMany(Payment, { foreignKey: "course_id" });
Payment.belongsTo(Course, { foreignKey: "course_id" });

// User - Certificate (1 - N)
User.hasMany(Certificate, { foreignKey: "user_id" });
Certificate.belongsTo(User, { foreignKey: "user_id" });

// Course - Certificate (1 - N)
Course.hasMany(Certificate, { foreignKey: "course_id" });
Certificate.belongsTo(Course, { foreignKey: "course_id" });

// User - Wishlist (1 - N)
User.hasMany(Wishlist, { foreignKey: "user_id" });
Wishlist.belongsTo(User, { foreignKey: "user_id" });

// Course - Wishlist (1 - N)
Course.hasMany(Wishlist, { foreignKey: "course_id" });
Wishlist.belongsTo(Course, { foreignKey: "course_id" });

// Course - Coupon (1 - N)
Course.hasMany(Coupon, { foreignKey: "course_id" });
Coupon.belongsTo(Course, { foreignKey: "course_id" });

// Đồng bộ hóa các model với cơ sở dữ liệu
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Đặt force: true để xóa bảng cũ mỗi lần khởi động, không nên làm trong môi trường production
    console.log("All models running !");
  } catch (error) {
    console.error("Unable to create tables:", error);
  }
};

syncDatabase();

export {
  User,
  Course,
  Category,
  Section,
  Lecture,
  Review,
  Enrollment,
  Payment,
  Certificate,
  Wishlist,
  Coupon,
  sequelize,
};
