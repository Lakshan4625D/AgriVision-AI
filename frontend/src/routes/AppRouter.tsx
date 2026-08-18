import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import CropAnalysisPage from "../pages/analysis/CropAnalysisPage";
import HistoryPage from "../pages/history/HistoryPage";
import ReportsPage from "../pages/reports/ReportsPage";
import AnalyticsPage from "../pages/analytics/AnalyticsPage";
import AdminPage from "../pages/admin/AdminPage";
import UsersPage from "../pages/admin/UsersPage";
import SettingsPage from "../pages/settings/SettingsPage";
import HelpPage from "../pages/help/HelpPage";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            <Route
              path="/analysis"
              element={<CropAnalysisPage />}
            />

            <Route
              path="/history"
              element={<HistoryPage />}
            />

            <Route
              path="/reports"
              element={<ReportsPage />}
            />

            <Route
              path="/analytics"
              element={<AnalyticsPage />}
            />

            <Route
              path="/admin"
              element={<AdminPage />}
            />

            <Route
              path="/users"
              element={<UsersPage />}
            />

            <Route
              path="/settings"
              element={<SettingsPage />}
            />

            <Route
              path="/help"
              element={<HelpPage />}
            />
          </Route>
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}