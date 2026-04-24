const fs = require("fs").promises;
const path = require("path");
const { LOCAL_REMOTE_PATH, REPO_FOLDER_NAME } = require("../config/storage-config");

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(), REPO_FOLDER_NAME);
    const localCommitsPath = path.join(repoPath, "commits");

    try {
        await fs.access(LOCAL_REMOTE_PATH);

        const remoteCommits = await fs.readdir(LOCAL_REMOTE_PATH);

        for (const commitDir of remoteCommits) {
            const remoteCommitPath = path.join(LOCAL_REMOTE_PATH, commitDir);
            const stat = await fs.lstat(remoteCommitPath);

            if (stat.isDirectory()) {
                const destCommitPath = path.join(localCommitsPath, commitDir);
                await fs.mkdir(destCommitPath, { recursive: true });

                const files = await fs.readdir(remoteCommitPath);

                for (const file of files) {
                    const sourceFile = path.join(remoteCommitPath, file);
                    const destFile = path.join(destCommitPath, file);

                    const fileStat = await fs.lstat(sourceFile);
                    if (fileStat.isFile()) {
                        await fs.copyFile(sourceFile, destFile);
                    }
                }
            }
        }

        console.log("Successfully pulled all commits to .bitnestGit/commits");

    } catch (err) {
        console.error("Unable to pull repository: ", err);
    }
}

module.exports = { pullRepo };