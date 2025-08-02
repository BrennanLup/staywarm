# LinkedIn Connection Manager

A modern full-stack web application for analyzing LinkedIn connections and messages, with smart reconnection reminders and network insights.

## 🚀 Features

### 🔗 Connection Management
- View all LinkedIn connections with detailed profiles
- Connection strength scoring and analysis
- Filter and search through connections
- Track last contact dates and message history

### 💬 Message Analysis
- Complete message history with all connections
- Sent vs received message tracking
- Message frequency analysis
- Conversation insights and patterns

### 🔔 Smart Reconnection Reminders
- Automated detection of connections needing attention
- Personalized reconnection suggestions with templates
- Follow-up scheduling and reminders
- Connection strength-based prioritization

### 📊 Analytics Dashboard
- Connection strength distribution
- Message activity over time
- Engagement metrics and patterns
- Network growth insights

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI) v5** for UI components
- **Emotion** for CSS-in-JS styling
- **Material Icons** for consistent iconography

### Backend
- **Node.js** with Express.js
- **RESTful API** architecture
- **Security middleware** (Helmet, CORS)
- **Mock data** for development

## 📁 Project Structure

```
linkedin-analyzer/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ConnectionCard.tsx
│   │   ├── MessageCard.tsx
│   │   ├── ReconnectDialog.tsx
│   │   └── DashboardStats.tsx
│   ├── App.tsx              # Main application
│   ├── index.tsx            # Entry point
│   └── index.css            # Global styles
├── backend/
│   ├── server.js            # Express server
│   ├── package.json         # Backend dependencies
│   └── README.md            # Backend documentation
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Frontend Setup

1. Navigate to the project directory:
```bash
cd linkedin-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. The API will be available at [http://localhost:5000](http://localhost:5000)

## 📊 Current Implementation

### ✅ Completed Features

#### Frontend
- **Modern Dashboard**: Real-time statistics with hover effects
- **Connection Cards**: Detailed profiles with strength indicators
- **Message History**: Chronological view with type indicators
- **Reconnection Dialog**: Smart templates and scheduling
- **Analytics Placeholders**: Ready for chart integration
- **Responsive Design**: Works on all device sizes

#### Backend
- **RESTful API**: Complete CRUD operations
- **Mock Data**: Realistic sample data for testing
- **Security**: Helmet and CORS protection
- **Error Handling**: Comprehensive error responses
- **Analytics Endpoints**: Network insights and metrics

### 🔄 API Endpoints

- `GET /api/health` - Health check
- `GET /api/connections` - All connections
- `GET /api/connections/:id` - Specific connection
- `GET /api/messages` - All messages
- `GET /api/connections/:id/messages` - Connection messages
- `POST /api/connections/:id/reconnect` - Send reconnection message
- `GET /api/analytics` - Network analytics

## 🎯 Next Steps

### Phase 1: LinkedIn API Integration
- [ ] LinkedIn OAuth 2.0 implementation
- [ ] Real connection data fetching
- [ ] Message history retrieval
- [ ] Rate limiting and caching

### Phase 2: Database & Persistence
- [ ] PostgreSQL/MongoDB integration
- [ ] User authentication system
- [ ] Data persistence and backup
- [ ] Real-time updates

### Phase 3: Advanced Features
- [ ] Email integration for reminders
- [ ] Advanced analytics charts
- [ ] AI-powered insights
- [ ] Mobile app development

### Phase 4: Production Ready
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Performance optimization
- [ ] Security hardening

## 🎨 UI Components

### ConnectionCard
- Displays connection profile with avatar
- Shows connection strength with color coding
- Includes last contact and message count
- Reconnect button with quick actions

### MessageCard
- Message content with sender info
- Sent/received indicators
- Timestamp formatting
- Truncated content with hover expansion

### ReconnectDialog
- Message composition with templates
- Scheduling options for follow-ups
- Connection context and tips
- Loading states and validation

### DashboardStats
- Real-time metrics display
- Progress indicators for network health
- Hover effects and animations
- Responsive grid layout

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

**Backend:**
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

### Code Style
- TypeScript for type safety
- Material-UI for consistent design
- Component-based architecture
- RESTful API design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for better LinkedIn networking**
