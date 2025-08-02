# LinkedIn Connection Manager

A modern web application for analyzing LinkedIn connections and messages, with smart reconnection reminders and network insights.

## Features

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
- Personalized reconnection suggestions
- Follow-up scheduling and reminders
- Connection strength-based prioritization

### 📊 Analytics Dashboard
- Connection strength distribution
- Message activity over time
- Engagement metrics and patterns
- Network growth insights

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Icons**: Material Icons + Lucide React
- **Styling**: Emotion (CSS-in-JS)
- **Charts**: MUI X Charts (planned)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
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

## Project Structure

```
src/
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── index.css            # Global styles
└── components/          # Reusable components (planned)
```

## Current Status

This is the initial UI implementation with:
- ✅ Modern, responsive dashboard design
- ✅ Connection list with detailed profiles
- ✅ Message history view
- ✅ Reconnection reminders interface
- ✅ Analytics placeholder sections
- ✅ LinkedIn-themed design system

## Next Steps

1. **LinkedIn API Integration**
   - OAuth authentication
   - Connection data fetching
   - Message history retrieval

2. **Backend Development**
   - Node.js/Express API
   - Database setup (PostgreSQL/MongoDB)
   - Data processing and analysis

3. **Advanced Features**
   - Real-time notifications
   - Email integration
   - Advanced analytics charts
   - AI-powered reconnection suggestions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.
