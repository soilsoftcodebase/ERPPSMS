import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import {
  Users,
  Factory,
  FileText,
  UserCog,
  CreditCard,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Menu,
  Bell,
  User,
  LogOut,
  X,
  Check,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Moon,
  Sun,
  Landmark,
} from "lucide-react";

import { alerts } from "../lib/data";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "alert" | "info" | "success";
  timestamp: string;
  read: boolean;
}

function NotificationPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
}: {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 transition-transform transform duration-300 scale-95 hover:scale-100">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold dark:text-white">Notifications</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={onClearAll}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Clear All
          </button>
          <button onClick={onClose}>
            <X
              size={20}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No new notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300 transform hover:scale-105 ${
                !notification.read ? "bg-blue-50 dark:bg-blue-900" : ""
              }`}
            >
              <div className="flex justify-between">
                <h4 className="font-medium dark:text-white">
                  {notification.title}
                </h4>
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className={`${
                    notification.read
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400"
                  }`}
                >
                  <Check size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Sidebar({
  isCollapsed,
  onToggle,
  isMobile,
  isOpen,
  onClose,
}: {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}) {
  const location = useLocation();

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/" },
    { icon: Users, label: "Workers Management", path: "/labor" },
    { icon: Factory, label: "HRM", path: "/factories" },
    { icon: FileText, label: "CRM", path: "/reports" },
    { icon: Landmark, label: "Finance", path: "/finance" },
    { icon: UserCog, label: "Compliance", path: "/users" },

    { icon: CreditCard, label: "Reports & Analytics", path: "/payments" },
    {
      icon: AlertTriangle,
      label: "Settings & User Management",
      path: "/alerts",
    },
    { icon: DollarSign, label: "Integration", path: "/wages" },
    { icon: Calendar, label: "Leave Approvals", path: "/leave-approvals" },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onClose}
        />
      )}

      <div
        className={`
          bg-indigo-900 dark:bg-gray-900  text-white h-screen fixed left-0 top-0 z-30
          transition-all duration-300
          ${
            isMobile
              ? `${isOpen ? "translate-x-0" : "-translate-x-full"} w-64`
              : `${isCollapsed ? "w-20" : "w-64"}`
          }
        `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8 ">
            {(!isCollapsed || isMobile) && (
              <h1 className="text-2xl font-bold text-yellow-400 ml-5 mt-2">
                ERP PSMS
              </h1>
            )}
            <button
              onClick={isMobile ? onClose : onToggle}
              className={`p-2 hover:bg-indigo-800 dark:hover:bg-gray-800 rounded-lg transition-transform ${
                isCollapsed && !isMobile ? "ml-1" : "ml-auto"
              }`}
            >
              {isMobile ? (
                <X size={20} />
              ) : isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>
          <nav>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center space-x-3 p-3 rounded-lg mb-1 transition-transform hover:scale-105 ${
                  location.pathname === item.path
                    ? "bg-yellow-400 text-gray-900"
                    : "hover:bg-indigo-800 dark:hover:bg-gray-800"
                }`}
                title={isCollapsed && !isMobile ? item.label : undefined}
              >
                <item.icon size={20} />
                {(!isCollapsed || isMobile) && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

function Header({
  isCollapsed,
  isMobile,
  onMenuClick,
}: {
  isCollapsed: boolean;
  isMobile: boolean;
  onMenuClick: () => void;
}) {
  const { user, logout } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return alerts.map((alert) => ({
      id: alert.id,
      title: alert.type,
      message: alert.message,
      type:
        alert.severity === "high"
          ? "alert"
          : alert.severity === "medium"
          ? "info"
          : "success",
      timestamp: alert.createdAt,
      read: alert.status !== "new",
    }));
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
    setIsNotificationOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <header
      className={`
        h-16 bg-yellow-400 dark:bg-gray-800 text-gray-900 dark:text-white fixed top-0 right-0 z-10
        transition-all duration-300 shadow-md
        ${isMobile ? "left-0" : isCollapsed ? "left-20" : "left-64"}
      `}
    >
      <div className="flex items-center justify-between h-full px-6">
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-yellow-300 dark:hover:bg-gray-700 rounded-lg"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="flex items-center space-x-4 ml-auto">
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 hover:bg-yellow-300 dark:hover:bg-gray-700 rounded-lg relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <NotificationPanel
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAll}
            />
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-yellow-300 dark:hover:bg-gray-700 rounded-lg"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {/* const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); */}
          <div className="flex items-center space-x-2 relative">
            <span className="text-sm font-medium hidden sm:inline">
              {user?.name}
            </span>
            <button
              className="p-2 hover:bg-yellow-300 dark:hover:bg-gray-700 rounded-full"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <div className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full">
                <User size={20} className="text-gray-700 dark:text-gray-300" />
              </div>
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 top-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <button
                    className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => {
                      // Navigate to profile
                      setIsUserDropdownOpen(false);
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => {
                      // Navigate to settings
                      setIsUserDropdownOpen(false);
                    }}
                  >
                    Settings
                  </button>
                  <button
                    className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => {
                      logout();
                      setIsUserDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              className="p-2 hover:bg-yellow-300 dark:hover:bg-gray-700 rounded-lg"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <Header
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
      <main
        className={`
          pt-16 transition-all duration-300
          ${isMobile ? "ml-0" : isCollapsed ? "ml-20" : "ml-64"}
        `}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
