const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/userProfile/:id", userController.getUserProfile);
userRouter.put("/updateProfile/:id", userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", userController.deleteUserProfile);

// Star repos
userRouter.post("/star/:repoId", userController.toggleStarRepo);
userRouter.get("/starred/:userId", userController.getStarredRepos);

// Activity heatmap
userRouter.get("/activity/:userId", userController.getActivityHeatmap);

// User Follow System
userRouter.post("/follow", userController.followUser);
userRouter.post("/unfollow", userController.unfollowUser);

module.exports = userRouter;