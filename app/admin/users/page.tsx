// app/admin/users/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Loader2,
  Search,
  Trash2,
  Lock,
  Unlock,
} from "lucide-react";

interface Address {
  address?: string;
  city?: string;
  country?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  user: string;
  address: Address | null;
  lockoutEnd: string | null; 
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [lockingId, setLockingId] = useState<string | null>(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get<User[]>("/admin/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err: any) {
      toast.error("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search functionality
  useEffect(() => {
    const term = search.toLowerCase();
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.phoneNumber?.includes(term)
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  // Delete User
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      await axios.delete(`/admin/delete-user/${id}`);
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  // Toggle Login Lock
  const toggleLock = async (id: string, shouldLock: boolean) => {
    setLockingId(id);
    try {
      const endpoint = shouldLock ? "/admin/disable-login" : "/admin/enable-login";
      await axios.post(
        endpoint,
        JSON.stringify(id),
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(shouldLock ? "Login disabled" : "Login enabled");
      fetchUsers(); // refresh list
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setLockingId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600 mt-1">{filteredUsers.length} users</p>
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name || "—"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber || "—"}</TableCell>

                    {/* Role Badge */}
                    <TableCell>
                      <Badge variant={user.user === "admin" ? "default" : "secondary"}>
                        {user.user || "creator"}
                      </Badge>
                    </TableCell>

                    {/* Location */}
                    <TableCell>
                      {user.address
                        ? [user.address.city, user.address.country].filter(Boolean).join(", ") || "—"
                        : "—"}
                    </TableCell>

                    {/* Status Badge - Fixed for Build */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.lockoutEnd
                            ? "text-red-700 border-red-300 bg-red-50"
                            : "text-green-700 border-green-300 bg-green-50"
                        }
                      >
                        {user.lockoutEnd ? "Locked" : "Active"}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right space-x-1">
                      {/* Lock / Unlock */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleLock(user.id, !user.lockoutEnd)}
                        disabled={lockingId === user.id}
                      >
                        {lockingId === user.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : user.lockoutEnd ? (
                          <Unlock className="w-4 h-4" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </Button>

                      {/* Delete */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingId === user.id}
                      >
                        {deletingId === user.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}