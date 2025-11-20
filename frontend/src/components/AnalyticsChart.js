import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Zap, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';

const AnalyticsChart = () => {
  const { isDark } = useTheme();
  const { analytics } = useData();
  
  if (!analytics || !analytics.dailyTrends) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  const data = analytics.dailyTrends;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${
          isDark 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          <p className="font-medium">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'efficiency' ? '%' : entry.dataKey === 'dustLevel' ? '%' : 'W'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl shadow-lg ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="energy-gradient p-2 rounded-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Power Analytics
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Daily power generation trends
            </p>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#374151' : '#e5e7eb'} 
            />
            <XAxis 
              dataKey="time" 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="powerOutput" 
              stroke="#0ea5e9" 
              fill="url(#powerGradient)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>Power Generation</span>
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Peak Output</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {Math.max(...data.map(d => d.powerOutput)).toFixed(0)}W
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Average</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {Math.round(data.reduce((sum, d) => sum + d.powerOutput, 0) / data.length)}W
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Today</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {Math.round(data.reduce((sum, d) => sum + d.powerOutput, 0) / 24)}kWh
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Efficiency Trends</span>
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Max Efficiency</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {Math.max(...data.map(d => d.efficiency)).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Average</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {Math.round(data.reduce((sum, d) => sum + d.efficiency, 0) / data.length * 10) / 10}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Min Efficiency</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {Math.min(...data.map(d => d.efficiency)).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
