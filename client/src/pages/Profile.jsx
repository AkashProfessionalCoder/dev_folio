import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, updateProfile, logout } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ name, avatar });
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 text-2xl font-bold">Profile</h1>

        <form
          onSubmit={handleSave}
          className="space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-8"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2.5 text-gray-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Avatar URL
            </label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-brand-500"
              placeholder="https://..."
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-gray-700 px-6 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              Logout
            </button>
          </div>
        </form>

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-8">
          <h2 className="mb-2 text-sm font-semibold text-gray-300">
            Account Details
          </h2>
          <p className="text-sm text-gray-500">
            Member since {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
