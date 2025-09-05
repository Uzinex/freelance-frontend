import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import Logout from "./pages/Logout";
import ProjectsList from "./pages/projects/ProjectsList";
import ProjectDetail from "./pages/projects/ProjectDetail";
import CreateProject from "./pages/projects/CreateProject";
import PrivateRoute from "./components/PrivateRoute";

import Wallet from "./pages/payments/Wallet";
import Transactions from "./pages/payments/Transactions";
import Transfer from "./pages/payments/Transfer";
import Deposit from "./pages/payments/Deposit";
import Withdraw from "./pages/payments/Withdraw";

import ChatList from "./pages/chat/ChatList";
import ChatRoom from "./pages/chat/ChatRoom";

import NotificationsList from "./components/NotificationsList";

import UsersAdmin from "./pages/admin/UsersAdmin";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import BidsAdmin from "./pages/admin/BidsAdmin";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";
import TransactionsAdmin from "./pages/admin/TransactionsAdmin";

import { useNotificationsStore } from "./store/notificationsStore";
import { useAuthStore } from "./store/authStore";
import { WS_BASE } from "./config"; // 🔹 добавлен конфиг

export default function App() {
  const notifications = useNotificationsStore((state) => state.notifications);
  const addNotification = useNotificationsStore((state) => state.addNotification);
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token) return;
    const socket = new WebSocket(`${WS_BASE}/ws/notifications/`);
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        addNotification({
          id: data.id,
          type: data.type,
          title: data.title,
          message: data.message,
          isRead: data.is_read,
          createdAt: data.created_at,
        });
      } catch {
        // ignore parse errors
      }
    };
    return () => {
      socket.close();
    };
  }, [token, addNotification]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <BrowserRouter>
      <nav className="p-4 flex justify-between bg-gray-100">
        <Link to="/" className="font-bold">
          Freelance Codex
        </Link>
        <Link to="/notifications" className="relative">
          <span role="img" aria-label="notifications">
            🔔
          </span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
              {unreadCount}
            </span>
          )}
        </Link>
      </nav>

      <Routes>
        {/* 🔹 корневой маршрут */}
        <Route path="/" element={<ProjectsList />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPasswordRequest />} />
        <Route path="/reset-password/confirm" element={<ResetPasswordConfirm />} />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />

        {/* Wallet */}
        <Route
          path="/wallet"
          element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          }
        />
        <Route
          path="/wallet/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
        <Route
          path="/wallet/deposit"
          element={
            <PrivateRoute>
              <Deposit />
            </PrivateRoute>
          }
        />
        <Route
          path="/wallet/withdraw"
          element={
            <PrivateRoute>
              <Withdraw />
            </PrivateRoute>
          }
        />
        <Route
          path="/wallet/transfer"
          element={
            <PrivateRoute>
              <Transfer />
            </PrivateRoute>
          }
        />

        {/* Chat */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatList />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:roomId"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsList />} />
        <Route
          path="/projects/new"
          element={
            <PrivateRoute>
              <CreateProject />
            </PrivateRoute>
          }
        />
        <Route path="/projects/:id" element={<ProjectDetail />} />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <NotificationsList />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <UsersAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <PrivateRoute>
              <ProjectsAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/bids"
          element={
            <PrivateRoute>
              <BidsAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <PrivateRoute>
              <ReviewsAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <PrivateRoute>
              <TransactionsAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
