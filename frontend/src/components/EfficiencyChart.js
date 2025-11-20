import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const EfficiencyChart = ({ data }) => {
  const { isDark } = useTheme();

  // Generate sample data for the last 24 hours
  const generateChartData = () => {
    const now = new Date();
    const chartData = [];
    
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const baseEfficiency = 85 + Math.random() * 10;
      
      chartData.push({
        time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        efficiency: Math.round(baseEfficiency * 10) / 10,
        dust: Math.round(20 + Math.random() * 30),
        power: Math.round(250 + Math.random() * 50)
      });
    }
    
    return chartData;
  };

  const chartData = generateChartData();

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
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'efficiency' ? '%' : entry.dataKey === 'dust' ? '%' : 'W'}`}
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
          <div className="solar-gradient p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Efficiency Trends
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last 24 hours performance
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-solar-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Dust Level</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
            <Line 
              type="monotone" 
              dataKey="efficiency" 
              stroke="#f97316" 
              strokeWidth={3}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="dust" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-solar-600 dark:text-solar-400">
            {Math.round(chartData.reduce((sum, item) => sum + item.efficiency, 0) / chartData.length * 10) / 10}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Efficiency</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(chartData.reduce((sum, item) => sum + item.dust, 0) / chartData.length * 10) / 10}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Dust</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.round(chartData.reduce((sum, item) => sum + item.power, 0) / chartData.length)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Power (W)</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EfficiencyChart;
