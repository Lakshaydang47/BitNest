const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { REPO_FOLDER_NAME } = require("../config/storage-config");

async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), REPO_FOLDER_NAME);
    const stagedPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");
    try {
        const commitID = uuidv4();
        const commitDir = path.join(commitPath, commitID);
        await fs.mkdir(commitDir, { recursive: true });

        const files = await fs.readdir(stagedPath);

        if (files.length === 0) {
            console.log("No changes staged for commit. Use 'add' first.");
            return;
        }
        
        for (const file of files) {
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDir, file));
        }

        await fs.writeFile(
            path.join(commitDir, "commit.json"),
            JSON.stringify({
                message,
                date:new Date().toISOString(),

            })
        );

        for (const file of files) {
            await fs.unlink(path.join(stagedPath, file));
        }

        console.log(`Commit ${commitID} created successfully with message: "${message}"`);
    } catch (err) {
        console.error("Error committing changes:", err);
    }
}
module.exports = { commitRepo };