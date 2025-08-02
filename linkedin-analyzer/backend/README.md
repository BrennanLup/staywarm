# LinkedIn Analyzer Backend

Express.js backend API for the LinkedIn Connection Manager application.

## Features

- **RESTful API** for connections and messages
- **LinkedIn Integration** (placeholder for OAuth)
- **Analytics Endpoints** for network insights
- **Message Management** for reconnection workflows
- **Security** with Helmet and CORS protection

## API Endpoints

### Health Check
- `GET /api/health` - API status

### Connections
- `GET /api/connections` - Get all connections
- `GET /api/connections/:id` - Get specific connection
- `POST /api/connections/:id/reconnect` - Send reconnection message

### Messages
- `GET /api/messages` - Get all messages
- `GET /api/connections/:id/messages` - Get messages for specific connection

### Analytics
- `GET /api/analytics` - Get network analytics and insights

### Authentication (Placeholder)
- `GET /api/auth/linkedin` - LinkedIn OAuth initiation
- `GET /api/auth/linkedin/callback` - LinkedIn OAuth callback

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:5000/api/auth/linkedin/callback
```

4. Start development server:
```bash
npm run dev
```

## Development

- **Development**: `npm run dev` (with nodemon)
- **Production**: `npm start`

## Next Steps

1. **LinkedIn API Integration**
   - Implement OAuth 2.0 flow
   - Add LinkedIn API endpoints
   - Handle rate limiting

2. **Database Integration**
   - Add PostgreSQL/MongoDB
   - Implement data persistence
   - Add caching layer

3. **Advanced Features**
   - Real-time notifications
   - Email integration
   - AI-powered insights

## Security

- Helmet.js for security headers
- CORS protection
- Input validation (to be implemented)
- Rate limiting (to be implemented)

## Testing

```bash
npm test
```

## License

MIT 