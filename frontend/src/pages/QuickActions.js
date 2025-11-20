import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Play, Zap, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function QuickActions() {
  const { solarPanels, cleanPanel, getPrediction } = useData();
  const [selectedPanel, setSelectedPanel] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClean = async () => {
    if (!selectedPanel) {
      setMessage('Please select a panel');
      return;
    }
    setLoading(true);
    const result = await cleanPanel(selectedPanel);
    setMessage(result.message);
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePredict = async () => {
    if (!selectedPanel) {
      setMessage('Please select a panel');
      return;
    }
    setLoading(true);
    const result = await getPrediction(selectedPanel);
    if (result.success) {
      setPrediction(result.data);
    } else {
      setMessage(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-1">
                ✨ Quick Actions
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Control and predict panel performance</p>
            </div>
          </div>
        </motion.div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white px-6 py-4 rounded-2xl mb-6 shadow-2xl flex items-center space-x-3"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{message}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-800 dark:text-white">Select Panel</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Choose a panel to control</p>
              </div>
            </div>
            <select
              value={selectedPanel}
              onChange={(e) => setSelectedPanel(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl mb-6 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors text-gray-700 dark:text-gray-200 font-medium"
            >
              <option value="">Choose a panel...</option>
              {solarPanels.map((panel) => (
                <option key={panel.id} value={panel.id}>
                  {panel.id} - {panel.efficiency.toFixed(1)}% Efficiency
                </option>
              ))}
            </select>

            {selectedPanel && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-700"
              >
                {solarPanels.filter(p => p.id === selectedPanel).map(panel => (
                  <div key={panel.id}>
                    <h3 className="font-black text-2xl mb-4 text-gray-800 dark:text-white">{panel.id}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Efficiency</span>
                        <span className="font-black text-lg text-purple-600 dark:text-purple-400">{panel.efficiency.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Dust Level</span>
                        <span className="font-black text-lg text-orange-600 dark:text-orange-400">{panel.dustLevel.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Power Output</span>
                        <span className="font-black text-lg text-green-600 dark:text-green-400">{panel.powerOutput}W</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-800 dark:text-white">Actions</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Execute panel operations</p>
              </div>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleClean}
                disabled={loading || !selectedPanel}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Cleaning
                  </>
                )}
              </button>
              <button
                onClick={handlePredict}
                disabled={loading || !selectedPanel}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Get AI Prediction
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Prediction Results */}
        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-800 dark:text-white">AI Prediction Results</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Machine learning analysis</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
                <p className="text-blue-100 text-sm font-medium mb-2">Predicted Efficiency</p>
                <p className="text-4xl font-bold">{prediction.predicted_efficiency}%</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
                <p className="text-green-100 text-sm font-medium mb-2">Recommended Action</p>
                <p className="text-2xl font-bold">{prediction.recommended_action}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-xl text-white shadow-lg">
                <p className="text-yellow-100 text-sm font-medium mb-2">Dust Level</p>
                <p className="text-2xl font-bold">{prediction.dust_level}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-xl text-white shadow-lg">
                <p className="text-purple-100 text-sm font-medium mb-2">Confidence</p>
                <p className="text-4xl font-bold">{prediction.confidence}%</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default QuickActions;
