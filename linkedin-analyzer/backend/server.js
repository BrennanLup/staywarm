const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Mock data for development
const mockConnections = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastContact: '2024-01-15',
    connectionStrength: 85,
    messagesCount: 12,
    isReconnectDue: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Seattle, WA',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastContact: '2024-02-20',
    connectionStrength: 72,
    messagesCount: 8,
    isReconnectDue: false,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'UX Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastContact: '2024-01-30',
    connectionStrength: 93,
    messagesCount: 15,
    isReconnectDue: true,
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    avatar: 'https://i.pravatar.cc/150?img=4',
    lastContact: '2024-03-10',
    connectionStrength: 68,
    messagesCount: 5,
    isReconnectDue: false,
  },
  {
    id: '5',
    name: 'Lisa Wang',
    title: 'Marketing Director',
    company: 'Salesforce',
    location: 'San Francisco, CA',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastContact: '2024-02-05',
    connectionStrength: 91,
    messagesCount: 20,
    isReconnectDue: true,
  }
];

const mockMessages = [
  {
    id: '1',
    connectionId: '1',
    connectionName: 'Sarah Johnson',
    content: 'Thanks for connecting! I\'d love to learn more about your work at Google.',
    date: '2024-01-15',
    type: 'sent',
  },
  {
    id: '2',
    connectionId: '1',
    connectionName: 'Sarah Johnson',
    content: 'Absolutely! Let\'s grab coffee sometime this week. I\'d love to hear about your projects.',
    date: '2024-01-15',
    type: 'received',
  },
  {
    id: '3',
    connectionId: '2',
    connectionName: 'Michael Chen',
    content: 'Hi Michael, I saw your recent post about product strategy. Great insights!',
    date: '2024-02-20',
    type: 'sent',
  },
  {
    id: '4',
    connectionId: '3',
    connectionName: 'Emily Rodriguez',
    content: 'Emily, your design portfolio is amazing! Would love to collaborate on a project.',
    date: '2024-01-30',
    type: 'sent',
  },
  {
    id: '5',
    connectionId: '3',
    connectionName: 'Emily Rodriguez',
    content: 'Thank you! I\'d be happy to discuss potential collaborations.',
    date: '2024-01-30',
    type: 'received',
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LinkedIn Analyzer API is running' });
});

// Get all connections
app.get('/api/connections', (req, res) => {
  try {
    // TODO: Replace with actual LinkedIn API call
    res.json({
      success: true,
      data: mockConnections,
      total: mockConnections.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch connections'
    });
  }
});

// Get connection by ID
app.get('/api/connections/:id', (req, res) => {
  try {
    const connection = mockConnections.find(c => c.id === req.params.id);
    if (!connection) {
      return res.status(404).json({
        success: false,
        error: 'Connection not found'
      });
    }
    res.json({
      success: true,
      data: connection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch connection'
    });
  }
});

// Get all messages
app.get('/api/messages', (req, res) => {
  try {
    // TODO: Replace with actual LinkedIn API call
    res.json({
      success: true,
      data: mockMessages,
      total: mockMessages.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
});

// Get messages by connection ID
app.get('/api/connections/:id/messages', (req, res) => {
  try {
    const connectionMessages = mockMessages.filter(m => m.connectionId === req.params.id);
    res.json({
      success: true,
      data: connectionMessages,
      total: connectionMessages.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
});

// Send reconnection message
app.post('/api/connections/:id/reconnect', (req, res) => {
  try {
    const { message, scheduleReminder, reminderTime } = req.body;
    const connectionId = req.params.id;
    
    // TODO: Implement actual LinkedIn message sending
    console.log('Sending message to connection:', connectionId, {
      message,
      scheduleReminder,
      reminderTime
    });
    
    // Simulate API delay
    setTimeout(() => {
      res.json({
        success: true,
        message: 'Message sent successfully',
        data: {
          connectionId,
          messageId: Date.now().toString(),
          sentAt: new Date().toISOString()
        }
      });
    }, 1000);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
});

// Get analytics data
app.get('/api/analytics', (req, res) => {
  try {
    const totalConnections = mockConnections.length;
    const totalMessages = mockMessages.length;
    const reconnectDue = mockConnections.filter(c => c.isReconnectDue).length;
    const avgConnectionStrength = Math.round(
      mockConnections.reduce((acc, c) => acc + c.connectionStrength, 0) / totalConnections
    );
    
    const analytics = {
      connections: {
        total: totalConnections,
        reconnectDue,
        avgStrength: avgConnectionStrength,
        strengthDistribution: {
          strong: mockConnections.filter(c => c.connectionStrength >= 80).length,
          moderate: mockConnections.filter(c => c.connectionStrength >= 60 && c.connectionStrength < 80).length,
          weak: mockConnections.filter(c => c.connectionStrength < 60).length
        }
      },
      messages: {
        total: totalMessages,
        sent: mockMessages.filter(m => m.type === 'sent').length,
        received: mockMessages.filter(m => m.type === 'received').length
      },
      activity: {
        lastWeek: 5,
        lastMonth: 15,
        lastQuarter: 45
      }
    };
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    });
  }
});

// LinkedIn OAuth endpoints (placeholder)
app.get('/api/auth/linkedin', (req, res) => {
  // TODO: Implement LinkedIn OAuth flow
  res.json({
    success: true,
    message: 'LinkedIn OAuth endpoint - to be implemented'
  });
});

app.get('/api/auth/linkedin/callback', (req, res) => {
  // TODO: Handle LinkedIn OAuth callback
  res.json({
    success: true,
    message: 'LinkedIn OAuth callback - to be implemented'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 LinkedIn Analyzer API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Connections: http://localhost:${PORT}/api/connections`);
  console.log(`💬 Messages: http://localhost:${PORT}/api/messages`);
});

module.exports = app; 