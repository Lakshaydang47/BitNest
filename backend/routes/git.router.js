const express = require("express");
const gitController = require("../controllers/gitWebController");

const gitRouter = express.Router();

gitRouter.post("/git/init/:repoId", gitController.gitInit);
gitRouter.post("/git/add/:repoId", gitController.gitAdd);
gitRouter.post("/git/commit/:repoId", gitController.gitCommit);
gitRouter.post("/git/push/:repoId", gitController.gitPush);
gitRouter.post("/git/pull/:repoId", gitController.gitPull);
gitRouter.post("/git/revert/:repoId", gitController.gitRevert);
gitRouter.get("/git/status/:repoId", gitController.gitStatus);

module.exports = gitRouter;
