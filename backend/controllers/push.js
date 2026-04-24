const fs = require("fs").promises;
const path = require("path");
const mongoose = require("mongoose"); // Added mongoose
const dotenv = require('dotenv');
const Content = require("../models/contentModel");
const Repository = require("../models/repoModel");
const { LOCAL_REMOTE_PATH, REPO_FOLDER_NAME } = require("../config/storage-config");
dotenv.config();

async function pushRepo(repoId) {
    // 1. Ensure Database Connection
    // If you have a .env file, use process.env.MONGO_URI
    const MONGO_URI = process.env.MONGO_DB; 

    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGO_URI);
            console.log("Connected to MongoDB for sync...");
        }

        const repoPath = path.resolve(process.cwd(), REPO_FOLDER_NAME);
        const commitsPath = path.join(repoPath, "commits");

        // 2. Ensure remote path exists
        await fs.mkdir(LOCAL_REMOTE_PATH, { recursive: true });
        const commitDirs = await fs.readdir(commitsPath);
        
        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const metadataPath = path.join(commitPath, "commit.json");

            // 3. Read the local commit.json (Check if exists first)
            try {
                await fs.access(metadataPath);
            } catch (err) {
                console.warn(`Skipping invalid commit directory (missing commit.json): ${commitDir}`);
                continue;
            }

            const metadataContent = await fs.readFile(metadataPath, "utf-8");
            const metadata = JSON.parse(metadataContent);

            // 4. Database Sync
            let contentDoc = await Content.findOne({ commitId: metadata.commitID });

            if (!contentDoc) {
                contentDoc = new Content({
                    commitId: metadata.commitID,
                    message: metadata.message,
                    date: metadata.date,
                    files: metadata.files 
                });
                await contentDoc.save();

                await Repository.findByIdAndUpdate(repoId, {
                    $addToSet: { content: contentDoc._id }
                });
            } else {
                contentDoc.files = metadata.files;
                contentDoc.message = metadata.message;
                await contentDoc.save();
            }

            // 5. Physical File Transfer
            const destCommitDir = path.join(LOCAL_REMOTE_PATH, "commits", commitDir);
            await fs.mkdir(destCommitDir, { recursive: true });
            
            const files = await fs.readdir(commitPath);
            for (const file of files) {
                const sourcePath = path.join(commitPath, file);
                const destPath = path.join(destCommitDir, file);
                await fs.copyFile(sourcePath, destPath);
            }
        }

        // 6. Clean up local staging area
        const stagingPath = path.join(repoPath, "staging");
        await fs.rm(stagingPath, { recursive: true, force: true });
        
        console.log("Push complete: Files moved and Database synced.");

    } catch (err) {
        console.error("Error during push:", err);
        throw err;
    }
}

module.exports = { pushRepo };