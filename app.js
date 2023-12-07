const express = require("express");
const bookRouter = require("./routes/bookRoutes");
const proposalRouter = require("./routes/proposalRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const finDeJournee = require("./services/daily-process");
const cron = require("node-cron");

const app = express();

app.use(express.json());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/proposals", proposalRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/forceUpdate", finDeJournee);

console.log(process.env.NODE_ENV);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// cron.schedule("0 0 * * *", () => {
//   finDeJournee();
// });

module.exports = app;
