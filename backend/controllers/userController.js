const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
var ObjectId = require("mongodb").ObjectId;
const User = require("../models/userModel");
const Repository = require("../models/repoModel");

const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_DB;

let client;

async function connectClient() {
    try {
        if (!client) {
            // No options needed here anymore for modern drivers
            client = new MongoClient(uri);
            await client.connect();
            console.log("Connected to MongoDB");
        }
        return client;
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
    }
}

async function signup(req, res) {
    const { username, password, email } = req.body;
    try {
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exist!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            password: hashedPassword,
            email,
            repositories: [],
            followedUsers: [],
            starRepos: []
        }

        const result = await usersCollection.insertOne(newUser);

        const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECREAT_KEY, { expiresIn: "1h" });
        res.json({token, userId: result.insertedId});
    }catch(err) {
        console.error("error during signup: ", err.message);
        res.status(500).send("Server error");
    }

    
};

async function login(req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECREAT_KEY, { expiresIn: "1h" });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error during login : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function getAllUsers (req, res) {
    try{
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find({}).toArray();
    res.json(users);

    }catch(err){
        console.error("Error during login : ", err.message);
        res.status(500).send("Server error!");
    }
}


async function getUserProfile(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(currentID),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Ensure fields exist
    user.followers = user.followers || [];
    user.followedUsers = user.followedUsers || [];

    res.send(user);
  } catch (err) {
    console.error("Error during fetching : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    let updateFields = { email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
      {
        _id: new ObjectId(currentID),
      },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.send(result.value);
  } catch (err) {
    console.error("Error during updating : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function deleteUserProfile(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentID),
    });

    if (result.deleteCount == 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User Profile Deleted!" });
  } catch (err) {
    console.error("Error during updating : ", err.message);
    res.status(500).send("Server error!");
  }
}

// --- STAR REPOSITORY ---
async function toggleStarRepo(req, res) {
  const { userId } = req.body;
  const { repoId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const isStarred = user.starRepos.some(id => id.toString() === repoId);

    if (isStarred) {
      // Unstar
      await User.findByIdAndUpdate(userId, { $pull: { starRepos: repoId } });
      await Repository.findByIdAndUpdate(repoId, { $inc: { stars: -1 } });
      res.json({ message: "Repository unstarred.", starred: false });
    } else {
      // Star
      await User.findByIdAndUpdate(userId, { $addToSet: { starRepos: repoId } });
      await Repository.findByIdAndUpdate(repoId, { $inc: { stars: 1 } });
      res.json({ message: "Repository starred!", starred: true });
    }
  } catch (err) {
    console.error("Error toggling star:", err.message);
    res.status(500).send("Server error");
  }
}

async function getStarredRepos(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate({
      path: 'starRepos',
      populate: { path: 'owner' } // Also populate owner for detail display
    });
    
    if (!user) return res.status(404).json({ message: "User not found!" });

    res.json({ starredRepositories: user.starRepos || [] });
  } catch (err) {
    console.error("Error fetching starred repos:", err.message);
    res.status(500).send("Server error");
  }
}

// --- ACTIVITY HEATMAP ---
async function getActivityHeatmap(req, res) {
  const { userId } = req.params;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const contentsCollection = db.collection("contents");

    // Find all commits authored by this user
    const commits = await contentsCollection.find({
      author: new ObjectId(userId)
    }).toArray();

    // Also find commits linked from repos owned by this user
    const reposCollection = db.collection("repositories");
    const userRepos = await reposCollection.find({
      owner: new ObjectId(userId)
    }).toArray();

    // Gather all content IDs from user's repos
    const repoContentIds = [];
    userRepos.forEach(repo => {
      if (repo.content && Array.isArray(repo.content)) {
        repo.content.forEach(id => repoContentIds.push(new ObjectId(id)));
      }
    });

    // Fetch those contents too
    let repoCommits = [];
    if (repoContentIds.length > 0) {
      repoCommits = await contentsCollection.find({
        _id: { $in: repoContentIds }
      }).toArray();
    }

    // Merge and deduplicate
    const allCommitsMap = new Map();
    [...commits, ...repoCommits].forEach(c => {
      allCommitsMap.set(c._id.toString(), c);
    });

    // Group by date (YYYY-MM-DD)
    const dateCountMap = {};
    allCommitsMap.forEach((commit) => {
      let dateStr;
      if (commit.date) {
        dateStr = commit.date.split("T")[0];
      } else if (commit.createdAt) {
        dateStr = new Date(commit.createdAt).toISOString().split("T")[0];
      } else {
        return;
      }
      dateCountMap[dateStr] = (dateCountMap[dateStr] || 0) + 1;
    });

    // Convert to array
    const activity = Object.entries(dateCountMap).map(([date, count]) => ({
      date,
      count
    }));

    res.json({ activity, totalContributions: allCommitsMap.size });
  } catch (err) {
    console.error("Error fetching activity:", err.message);
    res.status(500).send("Server error");
  }
}

// --- USER FOLLOW SYSTEM ---
async function followUser(req, res) {
  const { userId, targetId } = req.body;
  if (userId === targetId) return res.status(400).json({ error: "Cannot follow yourself." });

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    const targetUser = await usersCollection.findOne({ _id: new ObjectId(targetId) });

    if (!user || !targetUser) return res.status(404).json({ error: "User not found." });

    // Add to followedUsers (following)
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { followedUsers: new ObjectId(targetId) } }
    );

    // Add to followers
    await usersCollection.updateOne(
      { _id: new ObjectId(targetId) },
      { $addToSet: { followers: new ObjectId(userId) } }
    );

    res.json({ message: "User followed successfully!", status: "following" });
  } catch (err) {
    console.error("Error following user:", err.message);
    res.status(500).send("Server error");
  }
}

async function unfollowUser(req, res) {
  const { userId, targetId } = req.body;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    // Remove from followedUsers
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { followedUsers: new ObjectId(targetId) } }
    );

    // Remove from followers
    await usersCollection.updateOne(
      { _id: new ObjectId(targetId) },
      { $pull: { followers: new ObjectId(userId) } }
    );

    res.json({ message: "User unfollowed successfully!", status: "not_following" });
  } catch (err) {
    console.error("Error unfollowing user:", err.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    toggleStarRepo,
    getStarredRepos,
    getActivityHeatmap,
    followUser,
    unfollowUser,
};
