import express from 'express';
import cors from 'cors';
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

// Start server
hybridServer.start();

export default app;
