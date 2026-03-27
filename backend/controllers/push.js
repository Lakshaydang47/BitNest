const fs = require("fs").promises;
const path = require("path");
const { LOCAL_REMOTE_PATH, REPO_FOLDER_NAME } = require("../config/storage-config");

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), REPO_FOLDER_NAME);
    const commitsPath = path.join(repoPath, "commits");

    const stagingPath = path.join(repoPath, "staging");
    try {
        // 1. Ensure the destination (remote) folder exists
        await fs.mkdir(LOCAL_REMOTE_PATH, { recursive: true });

        const commitDirs = await fs.readdir(commitsPath);
        
        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);

            // 2. Create the specific commit directory in the destination
            const destinationCommitDir = path.join(LOCAL_REMOTE_PATH, "commits", commitDir);
            await fs.mkdir(destinationCommitDir, { recursive: true });

            for (const file of files) {
                const sourceFilePath = path.join(commitPath, file);
                const destFilePath = path.join(destinationCommitDir, file);

                // 3. Read from source and write to destination
                const fileContent = await fs.readFile(sourceFilePath);
                await fs.writeFile(destFilePath, fileContent);
                
                console.log(`Pushed: ${commitDir}/${file}`);
            }
        }

        await fs.rm(stagingPath, { recursive: true, force: true });
        console.log("Staging folder successfully cleared.");

        console.log(`All commits successfully pushed to: ${LOCAL_REMOTE_PATH}`);
    } catch (err) {
        console.error("Error pushing to local storage: ", err);
    }
}

module.exports = { pushRepo };