const fs = require('fs').promises;
const path = require('path');
const { REPO_FOLDER_NAME } = require("../config/storage-config");

async function addRepo(filePath) {
    const repoPath = path.resolve(process.cwd(), REPO_FOLDER_NAME);
    const stagingPath = path.join(repoPath, "staging");

    try{
        await fs.mkdir(stagingPath, { recursive: true });
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`File "${fileName}" added to staging area successfully.`);
    } catch (err) {
        console.error("Error adding file to staging area:", err);
    }
}

module.exports = { addRepo };