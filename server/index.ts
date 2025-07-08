import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { HybridServer } from './routes';

const app = express();
const hybridServer = new HybridServer();

app.use(cors());
app.use(express.json());

// REST API routes
app.post('/api/auth', hybridServer.handleAuth.bind(hybridServer));
app.post('/api/spiral/compile', hybridServer.handleSpiralCompile.bind(hybridServer));
app.get('/api/blockchain/status', hybridServer.handleBlockchainStatus.bind(hybridServer));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start server
hybridServer.start();

export default app;