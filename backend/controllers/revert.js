const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { LOCAL_REMOTE_PATH, REPO_FOLDER_NAME } = require("../config/storage-config");


const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {
    const repoPath = path.resolve(process.cwd(), REPO_FOLDER_NAME);
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDir = path.join(commitsPath, commitID);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for(const file of files) {
            await copyFile(path.join(commitDir, file), path.join(parentDir, file));

        }

        console.log(`Commit ${commitID} reverted successfully!`);
    }catch(err) {
        console.error("Unable to revert: ", err);
    }
}

module.exports = {revertRepo};