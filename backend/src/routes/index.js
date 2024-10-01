import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import courseRouter from "./courseRouter.js";
import sectionRouter from "./sectionRouter.js";

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/section", sectionRouter);
};

export default initRoutes;
