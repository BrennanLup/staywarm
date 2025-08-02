import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Alert,
  LinearProgress,
  Tabs,
  Tab,
  Badge,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  Message as MessageIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';

// Import custom components
import ConnectionCard from './components/ConnectionCard';
import MessageCard from './components/MessageCard';
import ReconnectDialog from './components/ReconnectDialog';
import DashboardStats from './components/DashboardStats';

// Create a modern theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0077b5', // LinkedIn blue
    },
    secondary: {
      main: '#00a0dc',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  },
});

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [openReconnectDialog, setOpenReconnectDialog] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);

  // Mock data
  const connections: Connection[] = [
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
  ];

  const messages: Message[] = [
    {
      id: '1',
      connectionId: '1',
      connectionName: 'Sarah Johnson',
      content: 'Thanks for connecting! I\'d love to learn more about your work.',
      date: '2024-01-15',
      type: 'sent',
    },
    {
      id: '2',
      connectionId: '1',
      connectionName: 'Sarah Johnson',
      content: 'Absolutely! Let\'s grab coffee sometime this week.',
      date: '2024-01-15',
      type: 'received',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleConnectLinkedIn = () => {
    setIsAnalyzing(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleReconnect = (connection: Connection) => {
    setSelectedConnection(connection);
    setOpenReconnectDialog(true);
  };

  const handleSendMessage = async (message: string, scheduleReminder: boolean, reminderTime: string) => {
    // TODO: Implement actual message sending logic
    console.log('Sending message:', { message, scheduleReminder, reminderTime });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <LinkedInIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LinkedIn Connection Manager
            </Typography>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {!isConnected ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <LinkedInIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Welcome to LinkedIn Connection Manager
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Connect your LinkedIn account to analyze your connections and messages, 
                and get smart reminders for reconnecting with your network.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleConnectLinkedIn}
                disabled={isAnalyzing}
                startIcon={<LinkedInIcon />}
                sx={{ px: 4, py: 1.5 }}
              >
                {isAnalyzing ? 'Connecting...' : 'Connect LinkedIn Account'}
              </Button>
              {isAnalyzing && (
                <Box sx={{ width: '100%', mt: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Analyzing your connections and messages...
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <>
              {/* Dashboard Overview */}
              <DashboardStats connections={connections} messages={messages} />

              {/* Main Content Tabs */}
              <Paper sx={{ width: '100%' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="linkedin tabs">
                  <Tab label="Connections" />
                  <Tab label="Messages" />
                  <Tab label="Reconnect Reminders" />
                  <Tab label="Analytics" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Your Connections</Typography>
                    <Box>
                      <IconButton size="small">
                        <SearchIcon />
                      </IconButton>
                      <IconButton size="small">
                        <FilterIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box>
                    {connections.map((connection) => (
                      <ConnectionCard
                        key={connection.id}
                        connection={connection}
                        onReconnect={handleReconnect}
                        variant="list"
                      />
                    ))}
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Typography variant="h6" gutterBottom>Message History</Typography>
                  <Box>
                    {messages.map((message, index) => (
                      <MessageCard
                        key={message.id}
                        message={message}
                        showDivider={index < messages.length - 1}
                      />
                    ))}
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Typography variant="h6" gutterBottom>Reconnect Reminders</Typography>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    You have {connections.filter(c => c.isReconnectDue).length} connections that need attention.
                  </Alert>
                  <Box>
                    {connections
                      .filter(connection => connection.isReconnectDue)
                      .map((connection) => (
                        <ConnectionCard
                          key={connection.id}
                          connection={connection}
                          onReconnect={handleReconnect}
                          variant="card"
                        />
                      ))}
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                  <Typography variant="h6" gutterBottom>Connection Analytics</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardHeader title="Connection Strength Distribution" />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            Analytics charts will be displayed here showing connection strength, 
                            message frequency, and engagement patterns.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardHeader title="Message Activity" />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            Message activity over time and engagement metrics will be shown here.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Paper>
            </>
          )}
        </Container>

        {/* Reconnect Dialog */}
        <ReconnectDialog
          open={openReconnectDialog}
          connection={selectedConnection}
          onClose={() => setOpenReconnectDialog(false)}
          onSend={handleSendMessage}
        />

        {/* Floating Action Button */}
        {isConnected && (
          <Fab
            color="primary"
            aria-label="refresh"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            <RefreshIcon />
          </Fab>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App; 