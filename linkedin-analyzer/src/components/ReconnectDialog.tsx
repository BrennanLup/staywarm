import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Chip,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Send as SendIcon,
  Schedule as ScheduleIcon,
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

interface ReconnectDialogProps {
  open: boolean;
  connection: Connection | null;
  onClose: () => void;
  onSend: (message: string, scheduleReminder: boolean, reminderTime: string) => void;
}

const ReconnectDialog: React.FC<ReconnectDialogProps> = ({
  open,
  connection,
  onClose,
  onSend
}) => {
  const [message, setMessage] = useState('');
  const [scheduleReminder, setScheduleReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState('1_week');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || !connection) return;
    
    setIsSending(true);
    try {
      await onSend(message, scheduleReminder, reminderTime);
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const generateTemplate = (templateType: string) => {
    if (!connection) return '';
    
    const templates = {
      casual: `Hi ${connection.name.split(' ')[0]}, I hope you're doing well! I wanted to reconnect and see how things are going at ${connection.company}. Would love to catch up sometime!`,
      professional: `Hi ${connection.name}, I hope this message finds you well. I wanted to reconnect and see how your role at ${connection.company} is going. Would be great to schedule a quick call to catch up.`,
      networking: `Hi ${connection.name}, I hope you're doing well! I've been thinking about our previous conversations and wanted to reconnect. How are things going at ${connection.company}? Would love to hear about any exciting projects you're working on.`,
      custom: ''
    };
    
    return templates[templateType as keyof typeof templates] || '';
  };

  const formatLastContact = (dateString: string) => {
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

  if (!connection) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={connection.avatar} alt={connection.name} />
          <Box>
            <Typography variant="h6">Reconnect with {connection.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {connection.title} at {connection.company}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {isSending && <LinearProgress sx={{ mb: 2 }} />}
        
        <Box sx={{ mb: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Last contact: {formatLastContact(connection.lastContact)} • 
              Connection strength: {connection.connectionStrength}% • 
              Messages exchanged: {connection.messagesCount}
            </Typography>
          </Alert>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Message Templates
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip 
              label="Casual" 
              size="small" 
              onClick={() => setMessage(generateTemplate('casual'))}
              variant="outlined"
            />
            <Chip 
              label="Professional" 
              size="small" 
              onClick={() => setMessage(generateTemplate('professional'))}
              variant="outlined"
            />
            <Chip 
              label="Networking" 
              size="small" 
              onClick={() => setMessage(generateTemplate('networking'))}
              variant="outlined"
            />
          </Box>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Your Message"
          placeholder="Write a personalized message to reconnect..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch 
                checked={scheduleReminder} 
                onChange={(e) => setScheduleReminder(e.target.checked)}
              />
            }
            label="Schedule follow-up reminder"
          />
        </Box>

        {scheduleReminder && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Reminder Time</InputLabel>
            <Select
              value={reminderTime}
              label="Reminder Time"
              onChange={(e) => setReminderTime(e.target.value)}
            >
              <MenuItem value="3_days">3 days</MenuItem>
              <MenuItem value="1_week">1 week</MenuItem>
              <MenuItem value="2_weeks">2 weeks</MenuItem>
              <MenuItem value="1_month">1 month</MenuItem>
              <MenuItem value="3_months">3 months</MenuItem>
            </Select>
          </FormControl>
        )}

        <Box sx={{ 
          p: 2, 
          backgroundColor: 'grey.50', 
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200'
        }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Tip:</strong> Personalize your message by mentioning specific details about their work, 
            recent company news, or shared interests to make your reconnection more meaningful.
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} disabled={isSending}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSend}
          disabled={!message.trim() || isSending}
          startIcon={<SendIcon />}
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReconnectDialog; 