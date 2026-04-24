import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  User, Mail, BookMarked, Users, Star,
  LogOut, Edit2, Trash2, Check, X, AlertTriangle, ShieldAlert
} from 'lucide-react';
import axios from 'axios';
import Navbar from "../navbar";
import HeatMap from "./Heatmap"; // <-- 1. Imported your HeatMap component

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = id || localStorage.getItem("userId");

  // State
  const [userData, setUserData] = useState(null);
  const [repoCount, setRepoCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', email: '' });

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  // Star/Follow State
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // Fetch User Profile & Repo Count
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);

        // Fetch User Profile
        const userRes = await axios.get(`https://backend-szu2.onrender.com/userProfile/${userId}`);
        const user = userRes.data;
        setUserData(user);
        setEditForm({ username: user.username, email: user.email });

        // Fetch Live Repository Count
        const repoRes = await axios.get(`https://backend-szu2.onrender.com/repo/user/${userId}`);
        setRepoCount(repoRes.data.length);

        // Check if current user is following this profile
        const currentId = localStorage.getItem("userId");
        if (currentId && currentId !== userId) {
          const meRes = await axios.get(`https://backend-szu2.onrender.com/userProfile/${currentId}`);
          setIsFollowing(meRes.data.followedUsers?.some(id => id.toString() == userId.toString()));
        }

      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.error || "Could not load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, navigate]);

  const handleFollow = async () => {
    const currentId = localStorage.getItem("userId");
    try {
      setFollowLoading(true);
      const endpoint = isFollowing ? "unfollow" : "follow";
      await axios.post(`https://backend-szu2.onrender.com/${endpoint}`, { userId: currentId, targetId: userId });
      setIsFollowing(!isFollowing);
      // Update follow count locally
      setUserData(prev => ({
        ...prev,
        followers: isFollowing
          ? prev.followers.filter(id => id !== currentId)
          : [...(prev.followers || []), currentId]
      }));
    } catch (e) {
      alert("Failed to update follow status.");
    } finally {
      setFollowLoading(false);
    }
  };

  // Handle Profile Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      await axios.put(`https://backend-szu2.onrender.com/updateProfile/${userId}`, editForm);
      setUserData(prev => ({ ...prev, username: editForm.username, email: editForm.email }));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(err.response?.data?.error || "Failed to update profile.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    if (deleteInput !== userData?.username) return;

    try {
      setActionLoading(true);
      await axios.delete(`https://backend-szu2.onrender.com/deleteProfile/${userId}`);
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      console.error("Error deleting profile:", err);
      alert("Failed to delete account.");
      setActionLoading(false);
      setShowDeleteModal(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate('/login');
  };

  // --- Skeletons and Error States ---
  if (loading) return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-slate-200 rounded-full"></div>
          <div className="space-y-3 flex-1">
            <div className="h-8 w-1/3 bg-slate-200 rounded"></div>
            <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
          </div>
        </div>
        <div className="h-40 bg-slate-200 rounded-2xl w-full mb-6"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 shadow-sm text-base">
        <ShieldAlert size={20} />
        <span className="font-medium">{error}</span>
      </div>
      <Link to="/dashboard" className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">
        &larr; Return to Dashboard
      </Link>
    </div>
  );

  const isOwnProfile = userId === localStorage.getItem("userId");

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold text-slate-900">Delete Account</h3>
            </div>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              This action is <span className="font-bold text-red-600">permanent and cannot be undone</span>.
              All your repositories, stars, and data will be erased.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Type <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-red-600 select-all">{userData?.username}</span> to confirm.
              </label>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-base focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-shadow font-mono"
                placeholder={userData?.username}
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteInput(""); }}
                disabled={actionLoading}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteInput !== userData?.username || actionLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {actionLoading ? 'Deleting...' : 'Permanently Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10"></div>

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            <div className="flex items-center gap-6 w-full">
              {/* Avatar Placeholder */}
              <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-white shadow-md flex items-center justify-center text-indigo-600 text-4xl font-bold uppercase shrink-0">
                {userData?.username?.charAt(0) || 'U'}
              </div>

              {/* User Info & Edit Form */}
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleUpdate} className="max-w-md space-y-4 animate-in fade-in duration-200 bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Username</label>
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        className="w-full text-lg font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button type="submit" disabled={actionLoading} className="flex items-center gap-1.5 text-xs font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50">
                        <Check size={14} /> {actionLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button type="button" onClick={() => { setIsEditing(false); setEditForm({ username: userData.username, email: userData.email }); }} className="flex items-center gap-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-md hover:bg-slate-50 transition-colors">
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{userData?.username}</h1>
                    <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
                      <Mail size={16} className="text-slate-400" />
                      {userData?.email}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Actions */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              {!isOwnProfile && (
                <button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm w-full sm:w-auto ${isFollowing ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  {followLoading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
              {isOwnProfile && !isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm w-full sm:w-auto"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm w-full sm:w-auto"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-900/5 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <BookMarked size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Repositories</p>
              <h3 className="text-2xl font-bold text-slate-900">{repoCount}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-900/5 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
              <Star size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Starred</p>
              <h3 className="text-2xl font-bold text-slate-900">{userData?.starRepos?.length || 0}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-900/5 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Followers</p>
              <h3 className="text-2xl font-bold text-slate-900">{userData?.followers?.length || 0}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-900/5 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Following</p>
              <h3 className="text-2xl font-bold text-slate-900">{userData?.followedUsers?.length || 0}</h3>
            </div>
          </div>
        </div>

        {/* --- 2. Added HeatMap Section Here --- */}
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-900/5 p-6 mb-10 overflow-hidden">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Activity Map</h3>
          <div className="overflow-x-auto pb-2">
            <HeatMap userId={userId} />
          </div>
        </div>

        {/* Danger Zone */}
        {isOwnProfile && (
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-red-100 overflow-hidden">
            <div className="bg-red-50/50 px-6 py-4 border-b border-red-100 flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" />
              <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider">Danger Zone</h3>
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-semibold text-slate-900">Delete Account</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-xl">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="shrink-0 px-4 py-2 border border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete Account
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}