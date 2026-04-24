const { v4: uuidv4 } = require("uuid");
const Repository = require("../models/repoModel");
const Content = require("../models/contentModel");

// POST /git/init/:repoId — Initialize repository
async function gitInit(req, res) {
  try {
    const repo = await Repository.findById(req.params.repoId);
    if (!repo) return res.status(404).json({ error: "Repository not found" });

    if (repo.initialized) {
      return res.json({ message: "Repository already initialized.", status: "exists" });
    }

    repo.initialized = true;
    repo.stagedFiles = [];
    await repo.save();

    res.json({ message: `Initialized empty BitNest repository '${repo.name}'.`, status: "success" });
  } catch (err) {
    console.error("git init error:", err);
    res.status(500).json({ error: "Init failed", details: err.message });
  }
}

// POST /git/add/:repoId — Stage files
// Body: { files: ["index.js", "app.css"] }
async function gitAdd(req, res) {
  try {
    const { files } = req.body;
    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: "Provide a 'files' array of file names to stage." });
    }

    const repo = await Repository.findById(req.params.repoId);
    if (!repo) return res.status(404).json({ error: "Repository not found" });

    // Merge new files into staging (avoid duplicates)
    const currentStaged = new Set(repo.stagedFiles || []);
    files.forEach(f => currentStaged.add(f.trim()));
    repo.stagedFiles = Array.from(currentStaged);
    await repo.save();

    res.json({
      message: `${files.length} file(s) added to staging area.`,
      stagedFiles: repo.stagedFiles,
      status: "success"
    });
  } catch (err) {
    console.error("git add error:", err);
    res.status(500).json({ error: "Add failed", details: err.message });
  }
}

// POST /git/commit/:repoId — Commit staged files
// Body: { message: "commit message" }
async function gitCommit(req, res) {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Commit message is required." });
    }

    const repo = await Repository.findById(req.params.repoId);
    if (!repo) return res.status(404).json({ error: "Repository not found" });

    if (!repo.stagedFiles || repo.stagedFiles.length === 0) {
      return res.status(400).json({ error: "No files staged for commit. Use 'add' first.", status: "empty" });
    }

    const commitId = uuidv4();
    const now = new Date();

    const newContent = new Content({
      commitId,
      message: message.trim(),
      date: now.toISOString(),
      files: [...repo.stagedFiles],
      author: repo.owner,
    });

    const savedContent = await newContent.save();

    // Link to repo and clear staging
    repo.content.push(savedContent._id);
    repo.stagedFiles = [];
    await repo.save();

    res.status(201).json({
      message: `[${commitId.substring(0, 8)}] ${message.trim()}`,
      commitId,
      filesCommitted: savedContent.files.length,
      status: "success"
    });
  } catch (err) {
    console.error("git commit error:", err);
    res.status(500).json({ error: "Commit failed", details: err.message });
  }
}

// POST /git/push/:repoId — Push commits (mark as synced)
async function gitPush(req, res) {
  try {
    const repo = await Repository.findById(req.params.repoId).populate("content");
    if (!repo) return res.status(404).json({ error: "Repository not found" });

    const commitCount = repo.content?.length || 0;

    if (commitCount === 0) {
      return res.json({ message: "Everything up-to-date. Nothing to push.", status: "uptodate" });
    }

    res.json({
      message: `Successfully pushed ${commitCount} commit(s) to remote 'origin/main'.`,
      commitCount,
      status: "success"
    });
  } catch (err) {
    console.error("git push error:", err);
    res.status(500).json({ error: "Push failed", details: err.message });
  }
}

// POST /git/pull/:repoId — Pull latest commits
async function gitPull(req, res) {
  try {
    const repo = await Repository.findById(req.params.repoId).populate("content");
    if (!repo) return res.status(404).json({ error: "Repository not found" });

    const commits = repo.content || [];

    if (commits.length === 0) {
      return res.json({ message: "Already up-to-date. No commits to pull.", commits: [], status: "uptodate" });
    }

    res.json({
      message: `Pulled ${commits.length} commit(s) from remote 'origin/main'.`,
      commits: commits.map(c => ({
        commitId: c.commitId,
        message: c.message,
        date: c.date,
        files: c.files
      })),
      status: "success"
    });
  } catch (err) {
    console.error("git pull error:", err);
    res.status(500).json({ error: "Pull failed", details: err.message });
  }
}

// POST /git/revert/:repoId — Revert to specific commit
// Body: { commitId: "uuid..." }
async function gitRevert(req, res) {
  try {
    const { commitId } = req.body;
    if (!commitId) {
      return res.status(400).json({ error: "Provide a 'commitId' to revert to." });
    }

    const repo = await Repository.findById(req.params.repoId).populate("content");
    if (!repo) return res.status(404).json({ error: "Repository not found" });

    // Find the target commit index
    const targetIdx = repo.content.findIndex(c => c.commitId === commitId);
    if (targetIdx === -1) {
      return res.status(404).json({ error: `Commit '${commitId}' not found in this repository.` });
    }

    // Keep only commits up to and including the target
    const keptCommits = repo.content.slice(0, targetIdx + 1);
    repo.content = keptCommits.map(c => c._id);
    await repo.save();

    res.json({
      message: `HEAD reverted to commit [${commitId.substring(0, 8)}]. ${repo.content.length} commit(s) remaining.`,
      status: "success"
    });
  } catch (err) {
    console.error("git revert error:", err);
    res.status(500).json({ error: "Revert failed", details: err.message });
  }
}

// GET /git/status/:repoId — Get staging status
async function gitStatus(req, res) {
  try {
    const repo = await Repository.findById(req.params.repoId);
    if (!repo) return res.status(404).json({ error: "Repository not found" });

    const staged = repo.stagedFiles || [];

    res.json({
      initialized: repo.initialized,
      stagedFiles: staged,
      stagedCount: staged.length,
      commitCount: repo.content?.length || 0,
      status: "success"
    });
  } catch (err) {
    console.error("git status error:", err);
    res.status(500).json({ error: "Status check failed", details: err.message });
  }
}

module.exports = {
  gitInit,
  gitAdd,
  gitCommit,
  gitPush,
  gitPull,
  gitRevert,
  gitStatus,
};
