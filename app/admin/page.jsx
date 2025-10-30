"use client";
import { useState } from "react";
import { Upload, FileText, Users, Edit3, Eye } from "lucide-react";

export default function AdminDashboard() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [batches, setBatches] = useState(["Batch 1", "Batch 2", "Batch 3"]);
  const [newBatch, setNewBatch] = useState("");

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([...uploadedFiles, ...files.map((f) => f.name)]);
  };

  const handleAddBatch = () => {
    if (newBatch.trim()) {
      setBatches([...batches, newBatch]);
      setNewBatch("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-600">
            Manage entire Intelligent Revision Plan platform
          </p>
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
          onClick={() => alert("System data synced successfully!")}
        >
          Sync System Data
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <FileText className="mx-auto text-indigo-600 mb-2" />
          <p className="text-sm text-slate-500">Total Tests</p>
          <p className="text-2xl font-bold text-indigo-600">32</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Users className="mx-auto text-blue-600 mb-2" />
          <p className="text-sm text-slate-500">Students</p>
          <p className="text-2xl font-bold text-blue-600">128</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Users className="mx-auto text-emerald-600 mb-2" />
          <p className="text-sm text-slate-500">Teachers</p>
          <p className="text-2xl font-bold text-emerald-600">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <Edit3 className="mx-auto text-orange-500 mb-2" />
          <p className="text-sm text-slate-500">Counselors</p>
          <p className="text-2xl font-bold text-orange-500">5</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Upload size={18} className="text-indigo-600" /> Upload Question Papers / Answer Sheets
        </h3>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="border p-2 rounded w-full mb-3"
        />
        {uploadedFiles.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-slate-700 mb-1">
              Uploaded Files:
            </h4>
            <ul className="list-disc ml-6 text-slate-700 text-sm">
              {uploadedFiles.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Batch Management */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Users size={18} className="text-blue-600" /> Manage Batches
        </h3>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter new batch name..."
            value={newBatch}
            onChange={(e) => setNewBatch(e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <button
            onClick={handleAddBatch}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Add Batch
          </button>
        </div>
        <div className="mt-3">
          <ul className="list-disc ml-6 text-sm text-slate-700">
            {batches.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Access All Dashboards */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Eye size={18} className="text-indigo-600" /> Access All Dashboards
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          <a
            href="/teacher"
            className="bg-indigo-100 hover:bg-indigo-200 p-3 rounded text-center text-indigo-700 font-semibold"
          >
            Teacher Dashboard
          </a>
          <a
            href="/student"
            className="bg-green-100 hover:bg-green-200 p-3 rounded text-center text-green-700 font-semibold"
          >
            Student Dashboard
          </a>
          <a
            href="/parent"
            className="bg-blue-100 hover:bg-blue-200 p-3 rounded text-center text-blue-700 font-semibold"
          >
            Parent Dashboard
          </a>
          <a
            href="/counselor"
            className="bg-orange-100 hover:bg-orange-200 p-3 rounded text-center text-orange-700 font-semibold"
          >
            Counselor Dashboard
          </a>
        </div>
      </div>

      {/* System Control */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">System Control Center</h3>
        <p className="text-sm mb-3">
          Admin can modify, update, or remove any data from the IRP platform.
        </p>
        <button
          onClick={() => alert("Data backup created successfully!")}
          className="bg-white text-indigo-700 px-4 py-2 rounded font-semibold hover:bg-indigo-100"
        >
          Create Backup Now
        </button>
      </div>
    </div>
  );
}
