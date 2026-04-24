import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2, ShieldAlert } from "lucide-react";

const RepoSettings = ({ repo, onUpdate }) => {
  const navigate = useNavigate();

  const handleToggle = async () => {
    try {
      await axios.patch(`https://backend-szu2.onrender.com/repo/toggle/${repo._id}`);
      onUpdate();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this repository? This cannot be undone.")) {
      try {
        await axios.delete(`https://backend-szu2.onrender.com/repo/delete/${repo._id}`);
        navigate("/dashboard");
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className="vstack gap-4">
      {/* Visibility Section */}
      <div className="p-4 bg-white border rounded-3 d-flex justify-content-between align-items-center shadow-sm">
        <div>
          <h6 className="fw-bold mb-1 text-dark">Change Visibility</h6>
          <p className="text-muted small mb-0">Currently {repo.visibility ? "Public" : "Private"}</p>
        </div>
        <button className="btn btn-outline-dark fw-bold btn-sm px-4" onClick={handleToggle}>
          Switch to {repo.visibility ? "Private" : "Public"}
        </button>
      </div>

      {/* Danger Zone */}
      <div className="p-4 border border-danger rounded-3 bg-white shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold text-danger mb-1">Delete Repository</h6>
            <p className="text-muted small mb-0">Once deleted, your Bitnest data is gone forever.</p>
          </div>
          <button className="btn btn-danger fw-bold btn-sm px-4 d-flex align-items-center gap-2" onClick={handleDelete}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepoSettings;