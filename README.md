# 🌞 Solar Optimizer - AI-Driven Panel Management

A hackathon-ready web application for monitoring and optimizing solar panel performance with AI-driven cleaning recommendations and real-time analytics.

## 🚀 Features

- **Real-time Monitoring**: Live solar panel efficiency, dust levels, temperature, and power output
- **AI Predictions**: Simulated AI recommendations for optimal cleaning schedules
- **Robotic Cleaner**: Monitor cleaning robot status, battery, and health
- **Interactive Dashboard**: Beautiful charts and analytics with Recharts
- **Smart Alerts**: Dynamic notifications for efficiency drops and maintenance needs
- **Dark/Light Theme**: Modern UI with theme switching
- **Responsive Design**: Works perfectly on all devices
- **Real-time Updates**: WebSocket integration for live data

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- Framer Motion (animations)
- Recharts (data visualization)
- Lucide React (icons)
- Axios (API calls)

### Backend
- Node.js + Express.js
- Socket.io (real-time updates)
- CORS enabled
- RESTful API endpoints

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd solar-project-2
npm run install-all
```

2. **Start the development servers:**
```bash
npm run dev
```

This will start both frontend (port 3000) and backend (port 5000) simultaneously.

### Manual Setup

If you prefer to run servers separately:

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## 🔑 Demo Credentials

**Login:**
- Email: `admin@solar.com`
- Password: `admin123`

## 📱 Application Structure

```
solar-project-2/
├── backend/                 # Express.js API server
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React.js application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/      # Context providers
│   │   └── App.js         # Main app component
│   └── public/            # Static assets
├── package.json           # Root package.json with scripts
└── README.md             # This file
```

## 🎯 Key Components

### Dashboard Features
- **Solar Panel Cards**: Individual panel status with efficiency bars
- **Robot Status**: Cleaning robot battery, health, and location
- **Alerts Panel**: Real-time system notifications
- **Analytics Charts**: Efficiency trends and power generation
- **Quick Actions**: One-click cleaning and refresh

### Settings Page
- **Alert Thresholds**: Customizable efficiency, dust, and temperature limits
- **Notifications**: Email, push, and SMS preferences
- **AI Settings**: Auto-cleaning and prediction toggles
- **Theme Toggle**: Dark/light mode switching

## 🔌 API Endpoints

### Solar Panel Data
- `GET /api/panels` - Get all solar panel data
- `GET /api/robot` - Get cleaning robot status
- `GET /api/alerts` - Get system alerts
- `GET /api/analytics` - Get analytics data

### AI Predictions
- `GET /api/predict/:panelId` - Get AI prediction for specific panel
- `POST /api/clean/:panelId` - Initiate cleaning for panel

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## 🎨 UI/UX Features

- **Modern Design**: Solar-energy inspired color scheme
- **Smooth Animations**: Framer Motion for delightful interactions
- **Responsive Layout**: Mobile-first design approach
- **Status Indicators**: Color-coded efficiency and health status
- **Real-time Updates**: Live data refresh every 3 seconds
- **Interactive Charts**: Hover effects and tooltips

## 🔮 AI Integration Ready

The application is structured to easily integrate real AI models:

1. **Backend**: Replace dummy data in `/api/predict` with actual ML model calls
2. **Frontend**: AI predictions are already displayed in the UI
3. **Data Flow**: WebSocket updates can be connected to real sensor data
4. **Scalability**: Modular structure supports microservices architecture

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create `.env` files in both frontend and backend directories as needed.

## 📊 Sample Data

The application uses simulated data that updates every 3 seconds:
- Solar panel efficiency (60-100%)
- Dust levels (0-100%)
- Temperature (35-60°C)
- Power output (calculated from efficiency)
- Robot battery and health status
- Dynamic alerts based on thresholds

## 🎯 Hackathon Ready

This application is designed to be:
- **Demo Ready**: All features working with realistic data
- **Scalable**: Easy to integrate real AI models
- **Professional**: Production-quality code and UI
- **Complete**: Full-stack application with all necessary features

## 🤝 Contributing

This is a hackathon project. Feel free to fork and enhance!

## 📄 License

MIT License - feel free to use for your projects.

---

**Built with ❤️ for the Solar Energy Hackathon**
