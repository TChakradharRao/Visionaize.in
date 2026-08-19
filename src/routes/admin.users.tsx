/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, getCurrentUserRole, decodeJwt, getAccessToken } from "@/lib/api";
import type { User } from "@/lib/api";

function requireAdmin() {
  return getCurrentUserRole() === "admin";
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<User["role"]>("viewer");
  const [saving, setSaving] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editEmail, setEditEmail] = useState("");
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editRole, setEditRole] = useState<User["role"]>("viewer");

  useEffect(() => {
    const token = getAccessToken() || (typeof window !== 'undefined' ? window.localStorage.getItem('visionaize_access_token') : null);
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    if (!requireAdmin()) {
      window.location.href = "/admin/enquiries";
      return;
    }

    async function loadUsers() {
      setLoading(true);
      try {
        const res = await api.admin.users();
        setUsers(res.items || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message.includes("401") || message.includes("403") ? "Unauthorized" : "Unable to load users");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const currentUser = useMemo(() => {
    const token = getAccessToken();
    return token ? decodeJwt<{ sub: string }>(token) : null;
  }, []);

  async function addUser() {
    if (!email || !password) {
      return setError("Email and password are required for new users.");
    }

    const optimisticUser: User = {
      id: `temp-${Date.now()}`,
      email,
      role,
      display_name: displayName || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as User;

    setSaving(true);
    setError(null);
    setUsers((prev) => [optimisticUser, ...prev]);

    try {
      const res = await api.admin.createUser({ email, password, role, displayName: displayName || null });
      const createdUser = (res.item || optimisticUser) as User;
      setUsers((prev) => {
        const withoutOptimistic = prev.filter((user) => user.id !== optimisticUser.id);
        return [createdUser, ...withoutOptimistic];
      });
      setEmail("");
      setPassword("");
      setDisplayName("");
      setRole("viewer");
    } catch (err) {
      setUsers((prev) => prev.filter((user) => user.id !== optimisticUser.id));
      setError(err instanceof Error ? err.message : "Unable to create user");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(user: User) {
    setEditingUserId(user.id);
    setEditEmail(user.email || "");
    setEditDisplayName(user.display_name || "");
    setEditRole(user.role);
  }

  async function saveEdit(id: string) {
    if (!editEmail.trim()) {
      setError("Email is required.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await api.admin.updateUser(id, {
        role: editRole,
        displayName: editDisplayName || null,
      });
      setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...res.item } : user)));
      setEditingUserId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update user");
    } finally {
      setSaving(false);
    }
  }

  async function updateRole(id: string, nextRole: User["role"]) {
    setSaving(true);
    setError(null);
    try {
      const res = await api.admin.updateUser(id, { role: nextRole });
      setUsers((prev) => prev.map((user) => (user.id === id ? res.item : user)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update user");
    } finally {
      setSaving(false);
    }
  }

  async function deleteUser(id: string) {
    if (!window.confirm("Delete this user?")) return;
    setSaving(true);
    setError(null);
    try {
      await api.admin.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete user");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout title="User Management">
      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        <div className="bg-white border rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New User</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl border px-4 py-3 shadow-sm" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded-xl border px-4 py-3 shadow-sm" />
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name" className="rounded-xl border px-4 py-3 shadow-sm" />
            <select value={role} onChange={(e) => setRole(e.target.value as User["role"])} className="rounded-xl border px-4 py-3 shadow-sm">
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="mt-4">
            <button onClick={addUser} disabled={saving} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#92C122] to-[#0A78B9] text-white shadow-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? 'Saving…' : 'Create user'}
            </button>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-lg overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Users</h3>
          {loading ? (
            <div className="text-gray-500">Loading users...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-gray-600 bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    {editingUserId === user.id ? (
                      <>
                        <td className="px-4 py-3">
                          <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full rounded-xl border px-3 py-2" />
                        </td>
                        <td className="px-4 py-3">
                          <input value={editDisplayName} onChange={(e) => setEditDisplayName(e.target.value)} className="w-full rounded-xl border px-3 py-2" />
                        </td>
                        <td className="px-4 py-3">
                          <select value={editRole} onChange={(e) => setEditRole(e.target.value as User["role"])} className="rounded-xl border px-3 py-2">
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(user.created_at)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(user.updated_at)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => saveEdit(user.id)} disabled={saving} className="rounded-xl bg-[#0A78B9] px-3 py-2 text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed">Save</button>
                            <button onClick={() => setEditingUserId(null)} className="rounded-xl border px-3 py-2 text-gray-700 cursor-pointer">Cancel</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-gray-700">{user.email}</td>
                        <td className="px-4 py-3 text-gray-700">{user.display_name || '—'}</td>
                        <td className="px-4 py-3">
                          <select value={user.role} onChange={(e) => updateRole(user.id, e.target.value as User["role"])} className="rounded-xl border px-3 py-2">
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(user.created_at)}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(user.updated_at)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              disabled={currentUser?.sub === user.id || saving}
                              onClick={() => startEdit(user)}
                              className="rounded-xl border border-[#0A78B9] px-3 py-2 text-[#0A78B9] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              Edit
                            </button>
                            <button
                              disabled={currentUser?.sub === user.id || saving}
                              onClick={() => deleteUser(user.id)}
                              className="rounded-xl bg-red-600 px-3 py-2 text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {users.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "User Management" }] }),
  component: UserManagement,
});