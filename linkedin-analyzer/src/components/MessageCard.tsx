import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import {
  Send as SendIcon,
  Inbox as InboxIcon
} from '@mui/icons-material';

interface Message {
  id: string;
  connectionId: string;
  connectionName: string;
  content: string;
  date: string;
  type: 'sent' | 'received';
}

interface MessageCardProps {
  message: Message;
  showDivider?: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, showDivider = true }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <>
      <Card sx={{ 
        mb: 1, 
        '&:hover': { backgroundColor: 'action.hover' },
        borderLeft: message.type === 'sent' ? '4px solid #0077b5' : '4px solid #00a0dc'
      }}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Avatar 
              src={`https://i.pravatar.cc/150?img=${message.connectionId}`}
              alt={message.connectionName}
              sx={{ mr: 2, mt: 0.5 }}
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {message.connectionName}
                </Typography>
                <Chip
                  icon={message.type === 'sent' ? <SendIcon /> : <InboxIcon />}
                  label={message.type === 'sent' ? 'Sent' : 'Received'}
                  size="small"
                  color={message.type === 'sent' ? 'primary' : 'secondary'}
                  variant="outlined"
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                  {formatDate(message.date)}
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                color="text.primary" 
                sx={{ 
                  lineHeight: 1.5,
                  backgroundColor: message.type === 'sent' ? 'primary.50' : 'grey.50',
                  p: 1.5,
                  borderRadius: 1,
                  border: `1px solid ${message.type === 'sent' ? 'primary.200' : 'grey.200'}`
                }}
              >
                {truncateContent(message.content)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      {showDivider && <Divider sx={{ my: 1 }} />}
    </>
  );
};

export default MessageCard; 