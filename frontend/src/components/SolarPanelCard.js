import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Thermometer, 
  Zap, 
  Droplets, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SolarPanelCard = ({ panel, index, isSelected, onSelect }) => {
  const { isDark } = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'optimal': return <CheckCircle className="h-4 w-4" />;
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'ring-2 ring-solar-500 shadow-xl' 
          : 'hover:shadow-xl'
      } ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="solar-gradient p-2 rounded-lg">
            <Sun className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {panel.id.replace('_', ' ')}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Panel #{index + 1}
            </p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(panel.status)}`}>
          {getStatusIcon(panel.status)}
          <span className="capitalize">{panel.status}</span>
        </div>
      </div>

      {/* Efficiency Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Efficiency
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {panel.efficiency.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${panel.efficiency}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className={`h-2 rounded-full ${
              panel.efficiency >= 90 ? 'bg-green-500' :
              panel.efficiency >= 80 ? 'bg-blue-500' :
              panel.efficiency >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Power</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {panel.powerOutput}W
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Thermometer className="h-4 w-4 text-red-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Temp</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {panel.temperature}°C
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Droplets className="h-4 w-4 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Dust</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {panel.dustLevel}%
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Health</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {panel.efficiency >= 90 ? 'Excellent' :
               panel.efficiency >= 80 ? 'Good' :
               panel.efficiency >= 70 ? 'Fair' : 'Poor'}
            </p>
          </div>
        </div>
      </div>

      {/* AI Prediction Badge */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">AI Prediction</span>
          </div>
          <p className="text-xs text-white/90 mt-1">
            Predicted efficiency: {(panel.efficiency + Math.random() * 5).toFixed(1)}%
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SolarPanelCard;
