import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, X, Clock, Bell } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useData } from "../contexts/DataContext";

const AlertsPanel = () => {
  const { isDark } = useTheme();
  const { alerts } = useData();

  const getAlertIcon = (type) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "critical":
        return "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800";
      case "warning":
        return "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "success":
        return "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800";
      case "info":
        return "border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800";
      default:
        return "border-gray-200 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-800";
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl shadow-lg ${
        isDark
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            System Alerts
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {alerts.length} active
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No active alerts</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            All systems operating normally
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {alerts.slice(0, 5).map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {alert.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(alert.timestamp)}
                    </span>
                  </div>
                </div>
                <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {alerts.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-solar-600 hover:text-solar-500 dark:text-solar-400 dark:hover:text-solar-300 font-medium">
            View all alerts ({alerts.length - 5} more)
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default AlertsPanel;
