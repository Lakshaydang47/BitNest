const express = require("express");
const contentController = require("../controllers/contentController");

const contentRouter = express.Router();

contentRouter.get("/content/all", contentController.getAllContent);
contentRouter.post("/content/create", contentController.createContent);
contentRouter.get("/content/:commitId", contentController.getContentByCommitId);
contentRouter.put("/content/update/:commitId", contentController.updateContent);
contentRouter.delete("/content/delete/:commitId", contentController.deleteContent);

module.exports = contentRouter;