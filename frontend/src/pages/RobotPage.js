import React, { useState } from 'react';
import RobotStatus from '../components/RobotStatus';
import PanelRobotStatus from '../components/PanelRobotStatus';
import { useData } from '../contexts/DataContext';
import { Bot, Battery, MapPin, Activity, Cpu, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

function RobotPage() {
  const { cleaningRobot, loading, updateRobotStatus } = useData();
  const [showPanelView, setShowPanelView] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState(null);

  // Generate dynamic panel and robot data
  const generatePanelData = (panelId) => {
    if (!panelId) return null;

    // Panel-specific patterns based on panel number
    const panelNum = parseInt(panelId.slice(1));
    let panelCharacteristics;

    switch(panelNum) {
      case 1: // Panel 1 - Heavily soiled, needs urgent cleaning
        panelCharacteristics = {
          dustLevel: 85 + Math.floor(Math.random() * 10), // 85-95%
          efficiency: 60 + Math.floor(Math.random() * 10), // 60-70%
          temperature: 38 + Math.floor(Math.random() * 4), // 38-42°C
          mode: 'critical',
          health: 'Heavy Load',
          batteryNeeded: 45 + Math.floor(Math.random() * 10), // 45-55%
        };
        break;
      case 2: // Panel 2 - Moderate condition
        panelCharacteristics = {
          dustLevel: 45 + Math.floor(Math.random() * 15), // 45-60%
          efficiency: 75 + Math.floor(Math.random() * 10), // 75-85%
          temperature: 32 + Math.floor(Math.random() * 3), // 32-35°C
          mode: 'active',
          health: 'Moderate',
          batteryNeeded: 25 + Math.floor(Math.random() * 10), // 25-35%
        };
        break;
      case 3: // Panel 3 - Recently cleaned
        panelCharacteristics = {
          dustLevel: 15 + Math.floor(Math.random() * 10), // 15-25%
          efficiency: 90 + Math.floor(Math.random() * 8), // 90-98%
          temperature: 28 + Math.floor(Math.random() * 2), // 28-30°C
          mode: 'optimal',
          health: 'Normal',
          batteryNeeded: 15 + Math.floor(Math.random() * 5), // 15-20%
        };
        break;
      case 4: // Panel 4 - Needs routine cleaning
        panelCharacteristics = {
          dustLevel: 65 + Math.floor(Math.random() * 10), // 65-75%
          efficiency: 70 + Math.floor(Math.random() * 10), // 70-80%
          temperature: 35 + Math.floor(Math.random() * 3), // 35-38°C
          mode: 'warning',
          health: 'Moderate',
          batteryNeeded: 35 + Math.floor(Math.random() * 10), // 35-45%
        };
        break;
    }

    const timeNeeded = Math.ceil(panelCharacteristics.dustLevel / 15); // Minutes needed for cleaning
    const currentOutput = Math.floor(1000 * (panelCharacteristics.efficiency/100));

    return {
      id: panelId,
      ...panelCharacteristics,
      timeNeeded: timeNeeded,
      currentOutput: currentOutput,
      voltage: (24 + (panelCharacteristics.efficiency - 60) / 80).toFixed(1), // 24-25V based on efficiency
      current: (currentOutput / 24).toFixed(1),
      position: `Section ${Math.ceil(panelNum/2)}, Row ${((panelNum-1) % 2) + 1}`
    };
  };

  // Handle panel selection
  const handlePanelSelect = (panelId) => {
    if (!panelId) return;
    
    const panelData = generatePanelData(panelId);

    setSelectedPanel(panelData);
    
    if (panelData) {
      // Calculate battery consumption based on dust level
      const batteryRequired = Math.ceil(panelData.dustLevel / 10);
      const estimatedTime = Math.ceil(panelData.dustLevel / 20);
      
      // Update robot status with new panel assignment
      const updatedRobot = {
        ...cleaningRobot,
        assignedPanel: panelId,
        mode: panelData.mode,
        location: panelData.position,
        cleaningProgress: 0,
        timeElapsed: '0:00',
        health: panelData.health,
        battery: Math.max(0, 100 - panelData.batteryNeeded), // Battery decreases based on panel needs
        role: `Panel ${panelId.slice(1)} Maintenance`,
        estimatedTime: `${panelData.timeNeeded} minutes`,
        status: panelData.mode === 'critical' ? 'Critical Cleaning Required' :
               panelData.mode === 'warning' ? 'Maintenance Needed' :
               panelData.mode === 'active' ? 'Standard Cleaning' : 'Light Cleaning',
        panelDetails: {
          dustLevel: `${panelData.dustLevel}%`,
          efficiency: `${panelData.efficiency}%`,
          output: `${panelData.currentOutput}W`,
          temperature: `${panelData.temperature}°C`,
          voltage: `${panelData.voltage}V`,
          current: `${panelData.current}A`,
          timeNeeded: `${panelData.timeNeeded} minutes`,
          batteryRequired: `${panelData.batteryNeeded}%`
        }
      };
      
      // Simulate mode change after a brief delay
      setTimeout(() => {
        updateRobotStatus({
          ...updatedRobot,
          mode: 'cleaning'
        });
      }, 2000);
      
      updateRobotStatus(updatedRobot);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading robot status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Cleaning Robot
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Autonomous solar panel maintenance system</p>
            </div>
          </div>
        </motion.div>

        {/* Robot Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Battery Level</p>
                <p className="text-4xl font-bold mt-2">{(cleaningRobot?.battery || 0).toFixed(2)}%</p>
                <p className="text-green-200 text-xs mt-1">Power remaining</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Battery className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Health Status</p>
                <p className="text-3xl font-bold mt-2">{cleaningRobot?.health || 'N/A'}</p>
                <p className="text-blue-200 text-xs mt-1">System condition</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Activity className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Current Mode</p>
                <p className="text-3xl font-bold mt-2 capitalize">{cleaningRobot?.mode || 'idle'}</p>
                <p className="text-purple-200 text-xs mt-1">Operation status</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Bot className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Current Panel Location */}
              <div className="bg-gradient-to-br from-orange-500/90 to-orange-600/90 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white text-sm font-medium">Current Panel</p>
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
                    {cleaningRobot?.assignedPanel ? `Panel ${cleaningRobot.assignedPanel.slice(1)}` : 'Not Assigned'}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${
                      !cleaningRobot?.assignedPanel ? 'bg-gray-400' :
                      cleaningRobot.mode === 'critical' ? 'bg-red-400 animate-pulse' :
                      cleaningRobot.mode === 'warning' ? 'bg-yellow-400' :
                      cleaningRobot.mode === 'active' ? 'bg-green-400' :
                      'bg-blue-400'
                    }`} />
                    <p className="text-orange-100 text-sm">
                      {cleaningRobot?.assignedPanel ? cleaningRobot.location : 'Waiting for assignment'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel Selection */}
              <div className="bg-gradient-to-br from-orange-500/90 to-orange-600/90 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white text-sm font-medium">Select Panel</p>
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </div>
                <select
                  className="w-full bg-white/20 backdrop-blur-sm border-2 border-orange-300/30 rounded-lg px-3 py-2 text-white text-lg font-semibold 
                    focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50
                    appearance-none cursor-pointer transition-all duration-200 hover:bg-white/30
                    [&>option]:bg-orange-500 [&>option]:text-white"
                  value={cleaningRobot?.assignedPanel || ''}
                  onChange={(e) => handlePanelSelect(e.target.value)}
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="" className="bg-orange-600 text-white">Select Panel</option>
                  <option value="P1" className="bg-orange-600 text-white">Panel 1</option>
                  <option value="P2" className="bg-orange-600 text-white">Panel 2</option>
                  <option value="P3" className="bg-orange-600 text-white">Panel 3</option>
                  <option value="P4" className="bg-orange-600 text-white">Panel 4</option>
                </select>
                <p className="text-orange-200 text-xs mt-1 pl-1">Choose panel to assign robot</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* View Toggle */}
        <div className="mb-6 flex justify-end space-x-4">
          <button
            onClick={() => setShowPanelView(false)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              !showPanelView
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Robot Status
          </button>
          <button
            onClick={() => setShowPanelView(true)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              showPanelView
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Panel View
          </button>
        </div>

        {/* Robot Status Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          {showPanelView ? (
            <PanelRobotStatus
              robot={cleaningRobot}
              panels={[
                { id: "A1", dustLevel: 85, lastCleaned: "2024-03-10" },
                { id: "A2", dustLevel: 65, lastCleaned: "2024-03-09" },
                { id: "B1", dustLevel: 45, lastCleaned: "2024-03-11" },
                { id: "B2", dustLevel: 25, lastCleaned: "2024-03-12" },
                { id: "C1", dustLevel: 90, lastCleaned: "2024-03-08" },
                { id: "C2", dustLevel: 15, lastCleaned: "2024-03-13" },
              ]}
              onAssignPanel={(panel) => {
                console.log('Assigning panel:', panel);
                // Add your panel assignment logic here
              }}
              onStartCleaning={(panelId) => {
                console.log('Starting cleaning for panel:', panelId);
                // Add your cleaning start logic here
              }}
            />
          ) : (
            <RobotStatus />
          )}
        </motion.div>

        {/* Robot Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 dark:text-white">Robot Information</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Technical specifications and maintenance</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-black text-gray-800 dark:text-white text-lg">Specifications</h3>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Model: <span className="font-bold text-gray-900 dark:text-white">Solar Cleaner Pro X1</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Cleaning Capacity: <span className="font-bold text-gray-900 dark:text-white">4 panels/hour</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Battery Life: <span className="font-bold text-gray-900 dark:text-white">8 hours continuous</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Water Tank: <span className="font-bold text-gray-900 dark:text-white">5 liters</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Weight: <span className="font-bold text-gray-900 dark:text-white">15 kg</span></span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="flex items-center space-x-2 mb-4">
                <Wrench className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-black text-gray-800 dark:text-white text-lg">Maintenance Schedule</h3>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Last Service: <span className="font-bold text-gray-900 dark:text-white">15 days ago</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Next Service: <span className="font-bold text-gray-900 dark:text-white">In 15 days</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Total Cleanings: <span className="font-bold text-gray-900 dark:text-white">247</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Operating Hours: <span className="font-bold text-gray-900 dark:text-white">1,856 hrs</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Brush Replacement: <span className="font-bold text-gray-900 dark:text-white">Due in 30 days</span></span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RobotPage;
