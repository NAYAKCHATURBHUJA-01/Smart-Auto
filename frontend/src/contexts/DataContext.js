import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [solarPanels, setSolarPanels] = useState([]);
  const [cleaningRobot, setCleaningRobot] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize socket connection
    const socket = io('http://localhost:5000');

    socket.on('dataUpdate', (data) => {
      setSolarPanels(data.solarPanels);
      setCleaningRobot(data.cleaningRobot);
      setAlerts(data.alerts);
    });

    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        const [panelsRes, robotRes, alertsRes, analyticsRes] = await Promise.all([
          axios.get('/api/panels'),
          axios.get('/api/robot'),
          axios.get('/api/alerts'),
          axios.get('/api/analytics')
        ]);

        setSolarPanels(panelsRes.data);
        setCleaningRobot(robotRes.data);
        setAlerts(alertsRes.data);
        setAnalytics(analyticsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setLoading(false);
      }
    };

    fetchInitialData();

    return () => {
      socket.disconnect();
    };
  }, []);

  const cleanPanel = async (panelId) => {
    try {
      const response = await axios.post(`/api/clean/${panelId}`);
      return { success: true, message: response.data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Cleaning failed' 
      };
    }
  };

  const getPrediction = async (panelId) => {
    try {
      const response = await axios.get(`/api/predict/${panelId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Prediction failed' 
      };
    }
  };

  const value = {
    solarPanels,
    cleaningRobot,
    alerts,
    analytics,
    loading,
    cleanPanel,
    getPrediction
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
