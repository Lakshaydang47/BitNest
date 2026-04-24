const Content = require('../models/contentModel'); // Adjust the path based on your folder structure

// Create new content (e.g., a new commit)
async function createContent(req, res) {
    const { commitId, message, date, files } = req.body;

    try {
        // Check if content with the same commitId already exists
        const existingContent = await Content.findOne({ commitId });
        if (existingContent) {
            return res.status(400).json({ message: "Content with this commitId already exists!" });
        }

        const newContent = new Content({
            commitId,
            message,
            date: date || new Date().toISOString(), // Default to current time if not provided
            files: files || []
        });

        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (err) {
        console.error("Error creating content: ", err.message);
        res.status(500).send("Server error");
    }
}

// Get all content
async function getAllContent(req, res) {
    try {
        const contents = await Content.find({});
        res.json(contents);
    } catch (err) {
        console.error("Error fetching contents: ", err.message);
        res.status(500).send("Server error");
    }
}

// Get specific content by commitId
async function getContentByCommitId(req, res) {
    const { commitId } = req.params;

    try {
        const content = await Content.findOne({ commitId });

        if (!content) {
            return res.status(404).json({ message: "Content not found!" });
        }

        res.json(content);
    } catch (err) {
        console.error("Error fetching content: ", err.message);
        res.status(500).send("Server error");
    }
}

// Update content message or files by commitId
async function updateContent(req, res) {
    const { commitId } = req.params;
    const { message, files } = req.body;

    try {
        let updateFields = {};
        if (message) updateFields.message = message;
        if (files) updateFields.files = files;

        const updatedContent = await Content.findOneAndUpdate(
            { commitId },
            { $set: updateFields },
            { new: true } // Mongoose equivalent of returnDocument: "after"
        );

        if (!updatedContent) {
            return res.status(404).json({ message: "Content not found!" });
        }

        res.json(updatedContent);
    } catch (err) {
        console.error("Error updating content: ", err.message);
        res.status(500).send("Server error");
    }
}

// Delete content by commitId
async function deleteContent(req, res) {
    const { commitId } = req.params;

    try {
        const result = await Content.findOneAndDelete({ commitId });

        if (!result) {
            return res.status(404).json({ message: "Content not found!" });
        }

        res.json({ message: "Content deleted successfully!" });
    } catch (err) {
        console.error("Error deleting content: ", err.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
    createContent,
    getAllContent,
    getContentByCommitId,
    updateContent,
    deleteContent,
};