const fs = require("fs").promises;
const path = require("path");
const { LOCAL_REMOTE_PATH, REPO_FOLDER_NAME } = require("../config/storage-config");

async function initRepo() {
    const repoPath = path.resolve(process.cwd(), REPO_FOLDER_NAME);
    const commitsPath = path.join(repoPath, "commits");

    try {

        try {
            await fs.access(repoPath);
            console.log("⚠️  BitNest: Repository is already initialized in this directory.");
            return; 
        } catch (error) {
            // If access fails, the folder doesn't exist (ENOENT), so we can proceed
        }
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });
        const config = {
            storagePath: LOCAL_REMOTE_PATH,
            initializedAt: new Date().toISOString(),
        };

        await fs.writeFile(
            path.join(repoPath, "config.json"), 
            JSON.stringify(config, null, 2)
        );
        console.log("Repository initialized successfully.");

    } catch (err) {
        console.error("Error initializing repository:", err);
    }
}

module.exports = { initRepo };