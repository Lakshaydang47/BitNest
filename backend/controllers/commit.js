const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { REPO_FOLDER_NAME } = require("../config/storage-config");

async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), REPO_FOLDER_NAME);
    const stagedPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");
    
    try {
        let files = [];
        try {
            files = await fs.readdir(stagedPath);
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log("No changes staged for commit. Use 'add' first.");
                return;
            } else {
                throw err;
            }
        }

        if (files.length === 0) {
            console.log("No changes staged for commit. Use 'add' first.");
            return;
        }

        const commitID = uuidv4();
        const commitDir = path.join(commitPath, commitID);
        await fs.mkdir(commitDir, { recursive: true });

        // 1. Copy files to the new commit directory
        for (const file of files) {
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDir, file)
            );
        }

        // 2. Write commit.json including the list of file names
        await fs.writeFile(
            path.join(commitDir, "commit.json"),
            JSON.stringify({
                commitID,
                message,
                date: new Date().toISOString(),
                files: files // <--- Adding the array of filenames here
            }, null, 2) // Added formatting for better readability
        );

        // 3. Clear the staging area
        for (const file of files) {
            await fs.unlink(path.join(stagedPath, file));
        }

        console.log(`Commit ${commitID} created successfully with message: "${message}"`);
        
        // Return the commitID so your controller can save it to MongoDB
        return commitID; 

    } catch (err) {
        console.error("Error committing changes:", err);
        throw err; // Throwing so the caller knows it failed
    }
}

module.exports = { commitRepo };