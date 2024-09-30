import userRouter from "./userRouter.js";

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
};

export default initRoutes;
