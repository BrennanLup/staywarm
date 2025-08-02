import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  People as PeopleIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  TrendingUp as TrendingIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';

interface Connection {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  lastContact: string;
  connectionStrength: number;
  messagesCount: number;
  isReconnectDue: boolean;
}

interface Message {
  id: string;
  connectionId: string;
  connectionName: string;
  content: string;
  date: string;
  type: 'sent' | 'received';
}

interface DashboardStatsProps {
  connections: Connection[];
  messages: Message[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ connections, messages }) => {
  const totalConnections = connections.length;
  const totalMessages = messages.length;
  const reconnectDue = connections.filter(c => c.isReconnectDue).length;
  const avgConnectionStrength = Math.round(
    connections.reduce((acc, c) => acc + c.connectionStrength, 0) / connections.length
  );

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return '#4caf50';
    if (strength >= 60) return '#ff9800';
    return '#f44336';
  };

  const stats = [
    {
      title: 'Total Connections',
      value: totalConnections,
      icon: <PeopleIcon color="primary" />,
      color: '#0077b5',
      subtitle: 'LinkedIn connections'
    },
    {
      title: 'Total Messages',
      value: totalMessages,
      icon: <MessageIcon color="primary" />,
      color: '#00a0dc',
      subtitle: 'Messages exchanged'
    },
    {
      title: 'Reconnect Due',
      value: reconnectDue,
      icon: <NotificationsIcon color="primary" />,
      color: '#ff9800',
      subtitle: 'Need attention'
    },
    {
      title: 'Avg. Connection Strength',
      value: `${avgConnectionStrength}%`,
      icon: <TrendingIcon color="primary" />,
      color: getStrengthColor(avgConnectionStrength),
      subtitle: 'Network health',
      showProgress: true,
      progressValue: avgConnectionStrength
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card 
            sx={{ 
              height: '100%',
              '&:hover': { 
                boxShadow: 3,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 1, 
                  backgroundColor: `${stat.color}15`,
                  mr: 2
                }}>
                  {stat.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="h6" gutterBottom>
                {stat.title}
              </Typography>
              
              {stat.showProgress && (
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Network Health
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.progressValue}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={stat.progressValue || 0}
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: stat.color,
                        borderRadius: 3
                      }
                    }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats; 