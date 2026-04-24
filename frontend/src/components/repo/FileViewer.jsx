import React from "react";
import { FileText, FileCode, HardDrive } from "lucide-react";

const FileViewer = ({ files }) => {
  return (
    <div className="card shadow-sm border-0 rounded-3">
      <div className="card-header bg-light border-bottom py-3 d-flex align-items-center gap-2">
        <HardDrive size={16} className="text-secondary" />
        <span className="small fw-bold text-dark text-uppercase tracking-wider">Disk Files</span>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {files.length > 0 ? (
            files.map((file, idx) => (
              <div key={idx} className="list-group-item d-flex align-items-center gap-3 py-3 px-4 border-bottom-0">
                {file.includes('.') ? <FileCode size={18} className="text-primary" /> : <FileText size={18} className="text-muted" />}
                <span className="font-monospace text-dark small">{file}</span>
              </div>
            ))
          ) : (
            <div className="p-5 text-center text-muted italic">No files found in this commit folder.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileViewer;