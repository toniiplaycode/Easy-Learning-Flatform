import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import courseRouter from "./courseRouter.js";
import sectionRouter from "./sectionRouter.js";
import lectureRouter from "./lectureRouter.js";
import reviewRouter from "./reviewRouter.js";
import enrollmentRouter from "./enrollmentRouter.js";
import paymentRouter from "./paymentRouter.js";
import certificateRouter from "./certificateRouter.js";
import cartRouter from "./cartRouter.js";
import couponRouter from "./couponRouter.js";

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/section", sectionRouter);
  app.use("/api/lecture", lectureRouter);
  app.use("/api/review", reviewRouter);
  app.use("/api/enrollment", enrollmentRouter);
  app.use("/api/payment", paymentRouter);
  app.use("/api/certificate", certificateRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/coupon", couponRouter);
};

export default initRoutes;
