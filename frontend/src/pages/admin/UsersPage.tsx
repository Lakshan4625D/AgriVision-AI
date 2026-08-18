import { useEffect, useMemo, useState } from "react";
import { UsersRound } from "lucide-react";

import UserStats from "../../components/users/UserStats";
import UserFilters from "../../components/users/UserFilters";
import UserTable from "../../components/users/UserTable";
import UserSkeleton from "../../components/users/UserSkeleton";

import { getUsers } from "../../api/users";

import type { UserWithRole } from "../../types/users";

export default function UsersPage() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      try {
        setLoading(true);

        const data = await getUsers();

        if (!mounted) {
          return;
        }

        setUsers(data);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Search + role filtering
   */
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        searchValue === "" ||
        user.full_name
          .toLowerCase()
          .includes(searchValue) ||
        user.email
          .toLowerCase()
          .includes(searchValue);

      const roleName =
        user.role?.name?.toLowerCase() ?? "";

      const matchesRole =
        role === "all" ||
        roleName === role.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  /*
   * Dashboard statistics
   *
   * There is currently no "active" column in the
   * backend User model, so all existing users are
   * treated as active for display purposes.
   */
  const totalUsers = users.length;

  const activeUsers = users.length;

  const adminUsers = users.filter(
    (user) =>
      user.role?.name?.toLowerCase() === "admin"
  ).length;

  const recentUsers = users.filter((user) => {
    if (!user.created_at) {
      return false;
    }

    const createdAt = new Date(user.created_at);

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 7
    );

    return createdAt >= sevenDaysAgo;
  }).length;

  if (loading) {
    return <UserSkeleton />;
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <UsersRound size={23} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Users
          </h1>

        </div>

        <p className="mt-2 text-slate-500">
          Manage and monitor AgriVision AI users.
        </p>
      </div>

      {/* Statistics */}

      <UserStats
        total={totalUsers}
        active={activeUsers}
        admins={adminUsers}
        recent={recentUsers}
      />

      {/* Filters */}

      <UserFilters
        search={search}
        role={role}
        onSearchChange={setSearch}
        onRoleChange={setRole}
      />

      {/* User Table */}

      <UserTable
        users={filteredUsers}
      />

    </div>
  );
}