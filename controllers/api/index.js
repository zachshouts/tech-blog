const router = require("express").Router();
const postRoutes = require("./post-routes");
const userRoutes = require("./user-routes");
const dashboardRoutes = require("./dashboard-routes");

router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;