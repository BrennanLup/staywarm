import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
  Divider
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Message as MessageIcon,
  CalendarToday as CalendarIcon,
  Email as EmailIcon,
  Business as BusinessIcon
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

interface ConnectionCardProps {
  connection: Connection;
  onReconnect: (connection: Connection) => void;
  variant?: 'list' | 'card';
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ 
  connection, 
  onReconnect, 
  variant = 'list' 
}) => {
  const getConnectionStrengthColor = (strength: number) => {
    if (strength >= 80) return 'success';
    if (strength >= 60) return 'warning';
    return 'error';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (variant === 'card') {
    return (
      <Card sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src={connection.avatar} 
                alt={connection.name}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box>
                <Typography variant="h6" gutterBottom>
                  {connection.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {connection.title} at {connection.company}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {connection.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MessageIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {connection.messagesCount} messages
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(connection.lastContact)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={`${connection.connectionStrength}%`}
                  size="small"
                  color={getConnectionStrengthColor(connection.connectionStrength) as any}
                />
                {connection.isReconnectDue && (
                  <Chip label="Reconnect Due" size="small" color="warning" />
                )}
              </Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => onReconnect(connection)}
                startIcon={<EmailIcon />}
              >
                Reconnect
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // List variant (default)
  return (
    <Card sx={{ mb: 1, '&:hover': { backgroundColor: 'action.hover' } }}>
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Avatar 
              src={connection.avatar} 
              alt={connection.name}
              sx={{ mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {connection.name}
                </Typography>
                <Chip
                  label={`${connection.connectionStrength}%`}
                  size="small"
                  color={getConnectionStrengthColor(connection.connectionStrength) as any}
                />
                {connection.isReconnectDue && (
                  <Chip label="Reconnect Due" size="small" color="warning" />
                )}
              </Box>
              <Typography variant="body2" color="text.primary" gutterBottom>
                {connection.title} at {connection.company}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {connection.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MessageIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {connection.messagesCount} messages
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(connection.lastContact)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <IconButton
            onClick={() => onReconnect(connection)}
            color="primary"
            sx={{ ml: 1 }}
          >
            <EmailIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard; 