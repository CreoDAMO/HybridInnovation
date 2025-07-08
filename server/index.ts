import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { HybridServer } from './routes';
import { HTSXProcessor } from '../core/htsx-runtime/htsx-processor';
import { SpiralProcessor } from '../core/spiral-lang/spiral-processor';

const app = express();
const hybridServer = new HybridServer();

app.use(cors());
app.use(express.json());

// REST API routes
app.post('/api/auth', hybridServer.handleAuth.bind(hybridServer));
app.post('/api/spiral/compile', hybridServer.handleSpiralCompile.bind(hybridServer));
app.get('/api/blockchain/status', hybridServer.handleBlockchainStatus.bind(hybridServer));

// HYBRID Blockchain API endpoints
app.get('/api/blockchain/status', (req, res) => {
  res.json({
    latestBlock: 2847291 + Math.floor(Math.random() * 100),
    transactions: [
      {
        hash: '0x1234...5678',
        from: '0xabc...def',
        to: '0x123...789',
        amount: '10.5',
        status: 'confirmed'
      }
    ],
    networkStats: {
      hashRate: '125.4 TH/s',
      difficulty: '0x1bc16d674ec80000',
      gasPrice: '15 gwei',
      activeValidators: 21,
      totalSupply: '100000000000 HBD'
    }
  });
});

// HYBRID Core Ecosystem APIs
app.get('/api/hybrid/metrics', (req, res) => {
  res.json({
    tps: 2500,
    validators: 21,
    uptime: 99.9,
    hashRate: 120 + (Math.random() - 0.5) * 10,
    totalSupply: '100000000000',
    circulatingSupply: '75000000000',
    stakingAPY: 5.0,
    inflationRate: 7.0,
    blockHeight: 1847293 + Math.floor(Math.random() * 10),
    gasPrice: '0.001',
    crossChainVolume: '1.2M',
    nftLicenses: {
      validator: 156,
      storage: 423
    }
  });
});

app.get('/api/hybrid/ai-orchestrator', (req, res) => {
  res.json({
    models: [
      { name: 'GPT-4', status: 'active', confidence: 94, tasks: 1247 },
      { name: 'Claude-4', status: 'active', confidence: 91, tasks: 982 },
      { name: 'DeepSeek-R3', status: 'active', confidence: 88, tasks: 756 },
      { name: 'Grok-3', status: 'active', confidence: 92, tasks: 634 }
    ],
    consensus: {
      agreement: 85 + Math.random() * 10,
      processing: Math.floor(Math.random() * 100),
      completed: 12847 + Math.floor(Math.random() * 5)
    }
  });
});

app.get('/api/hybrid/mining', (req, res) => {
  res.json({
    hashRate: 120.5 + (Math.random() - 0.5) * 5,
    power: 2.8,
    temperature: 65 + Math.random() * 10,
    efficiency: 90 + Math.random() * 8,
    dailyReward: '45.67',
    poolShare: 0.0034,
    workers: 8,
    uptime: 99.8
  });
});

app.get('/api/hybrid/cross-chain', (req, res) => {
  res.json({
    chains: [
      { name: 'HYBRID', connected: true, volume: '45.2M', fee: '0.01%' },
      { name: 'BASE', connected: true, volume: '23.8M', fee: '0.025%' },
      { name: 'Polygon', connected: true, volume: '31.4M', fee: '0.02%' },
      { name: 'Solana', connected: true, volume: '18.9M', fee: '0.03%' }
    ],
    bridgeActivity: 156,
    totalBridged: '119.3M'
  });
});

app.get('/api/hybrid/htsx', (req, res) => {
  res.json({
    activeApps: 23,
    deployments: 156,
    components: 89,
    runtime: 'v2.1.3',
    memoryUsage: 68,
    cpuUsage: 45,
    requests: 15674,
    errors: 3
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

const startServer = async () => {
  console.log('Starting HYBRID Blockchain Server...');

  // Initialize file processors
  const htsxProcessor = new HTSXProcessor();
  const spiralProcessor = new SpiralProcessor();

  await htsxProcessor.initialize();
  await spiralProcessor.initialize();

  console.log('HTSX and SpiralScript processors initialized');
};

// Start server
hybridServer.start();

// Initialize WebSocket server
const wss = new WebSocketServer({ server });

// HTSX file processing endpoint
app.post('/api/htsx/process', async (req, res) => {
  try {
    const { filePath, content } = req.body;
    const result = await htsxProcessor.processHTSXFile(filePath, content);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SpiralScript file processing endpoint
app.post('/api/spiral/process', async (req, res) => {
  try {
    const { filePath, content } = req.body;
    const result = await spiralProcessor.processSpiralFile(filePath, content);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// File validation endpoints
app.post('/api/spiral/validate', async (req, res) => {
  try {
    const { content } = req.body;
    const result = await spiralProcessor.validateSpiralSyntax(content);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// WebSocket for real-time blockchain updates
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export default app;