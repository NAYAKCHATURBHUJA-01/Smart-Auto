import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sun,
  Settings,
  LogOut,
  Moon,
  Sun as SunIcon,
  LayoutDashboard,
  TrendingUp,
  Zap,
  Bot,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useData } from "../contexts/DataContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { alerts } = useData();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { path: "/efficiency", label: "Efficiency", icon: TrendingUp },
    { path: "/power", label: "Power", icon: Zap },
    { path: "/robot", label: "Robot", icon: Bot },
    { path: "/alerts", label: "Alerts", icon: AlertTriangle },
    { path: "/actions", label: "Actions", icon: Sparkles },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const criticalAlerts = alerts.filter(
    (alert) => alert.type === "critical"
  ).length;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } shadow-lg`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo - Fixed width */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg blur-sm opacity-50"></div>
              <div className="relative solar-gradient p-2 rounded-lg shadow-lg">
                <Sun className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-black text-gray-900 dark:text-white leading-normal align-middle">
                ☀️ Solar Optimizer
              </h1>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium leading-normal">
                AI-Driven Panel Management
              </p>
            </div>
          </div>

          {/* Navigation - Scrollable on smaller screens */}
          <div className="flex-1 flex items-center justify-center overflow-x-auto scrollbar-hide">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm whitespace-nowrap ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side - Fixed width */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Alerts indicator */}
            {criticalAlerts > 0 && (
              <div className="relative">
                <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {criticalAlerts}
                </span>
              </div>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* User menu */}
            <div className="hidden xl:flex items-center space-x-2">
              <div className="text-right">
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                  {user?.name}
                </p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">
                  {user?.role}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className={`flex items-center space-x-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                isDark
                  ? "text-gray-300 hover:text-white hover:bg-red-600"
                  : "text-gray-600 hover:text-white hover:bg-red-500"
              }`}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
