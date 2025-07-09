
import express from 'express';
import cors from 'cors';
import { HTSXProcessor } from '../core/htsx-runtime/htsx-processor';
import { SpiralProcessor } from '../core/spiral-lang/spiral-processor';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize processors
let htsxProcessor: HTSXProcessor;
let spiralProcessor: SpiralProcessor;

// HYBRID Blockchain API endpoints
app.get('/api/hybrid/public-metrics', (req, res) => {
  res.json({
    totalSupply: '100,000,000,000',
    circulatingSupply: '75,000,000,000',
    currentPrice: '$0.85',
    marketCap: '$85,000,000,000',
    volume24h: '$2,500,000,000',
    holders: '1,247,892',
    transactions24h: '892,456',
    blockHeight: 2847362 + Math.floor(Math.random() * 10),
    blockTime: '3 seconds',
    validators: 21,
    tps: '2,500',
    gasPrice: '0.001 HYBRID',
    stakingRewards: '7% APY',
    inflationRate: '7% → 2%',
    burnRate: '30% of fees'
  });
});

app.get('/api/hybrid/network-status', (req, res) => {
  res.json({
    chainId: 'hybrid-1',
    networkName: 'HYBRID Mainnet',
    consensusType: 'Proof of Stake',
    blockHeight: 2847362 + Math.floor(Math.random() * 10),
    validators: {
      active: 21,
      total: 21,
      uptime: 99.99
    },
    performance: {
      tps: 2500 + Math.floor(Math.random() * 100),
      latency: 3,
      finality: 3
    },
    economics: {
      totalSupply: '100000000000000000000000000000', // 100B with 18 decimals
      stakingRatio: 0.6,
      inflationRate: 0.07,
      burnRate: 0.3
    }
  });
});

app.get('/api/hybrid/validators', (req, res) => {
  const validators = Array.from({ length: 21 }, (_, i) => ({
    address: `hybrid1validator${i + 1}${'x'.repeat(32)}`,
    moniker: `Validator-${i + 1}`,
    votingPower: Math.floor(Math.random() * 10000000) + 1000000,
    commission: (Math.random() * 0.1).toFixed(3),
    uptime: (0.95 + Math.random() * 0.05).toFixed(4),
    status: 'BOND_STATUS_BONDED'
  }));

  res.json({ validators });
});

app.get('/api/hybrid/transactions', (req, res) => {
  const transactions = Array.from({ length: 10 }, (_, i) => ({
    hash: `0x${Math.random().toString(16).substr(2, 64)}`,
    height: 2847362 - i,
    from: `hybrid1${Math.random().toString(16).substr(2, 38)}`,
    to: `hybrid1${Math.random().toString(16).substr(2, 38)}`,
    amount: (Math.random() * 1000).toFixed(6),
    fee: (Math.random() * 0.01).toFixed(6),
    status: 'SUCCESS',
    timestamp: new Date(Date.now() - i * 60000).toISOString()
  }));

  res.json({ transactions });
});

app.get('/api/hybrid/staking', (req, res) => {
  res.json({
    totalStaked: '45000000000000000000000000000', // 45B with 18 decimals
    totalSupply: '100000000000000000000000000000', // 100B with 18 decimals
    stakingRatio: 0.6,
    apr: 0.07,
    unbondingPeriod: 1814400, // 21 days in seconds
    validatorCount: 21,
    delegatorCount: 125847
  });
});

// HTSX and SpiralScript API endpoints
app.get('/api/htsx/status', async (req, res) => {
  try {
    const status = htsxProcessor ? htsxProcessor.getStatus() : { isInitialized: false };
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/api/htsx/compile', async (req, res) => {
  try {
    const { code } = req.body;
    if (!htsxProcessor) {
      return res.status(500).json({ error: 'HTSX processor not initialized' });
    }

    const result = await htsxProcessor.processFile('inline.htsx', code);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/api/spiral/status', async (req, res) => {
  try {
    const status = spiralProcessor ? spiralProcessor.getStatus() : { isInitialized: false };
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/api/spiral/compile', async (req, res) => {
  try {
    const { code } = req.body;
    if (!spiralProcessor) {
      return res.status(500).json({ error: 'SpiralScript processor not initialized' });
    }

    const result = await spiralProcessor.processFile('inline.spiral', code);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      htsx: htsxProcessor?.getStatus()?.isInitialized || false,
      spiral: spiralProcessor?.getStatus()?.isInitialized || false
    }
  });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 HYBRID Blockchain Server running on port ${PORT}`);
  
  // Initialize processors
  try {
    console.log('🔄 Initializing HTSX and SpiralScript processors...');
    
    htsxProcessor = new HTSXProcessor();
    spiralProcessor = new SpiralProcessor();
    
    await htsxProcessor.initialize();
    await spiralProcessor.initialize();
    
    console.log('✅ All processors initialized successfully');
    console.log('🌐 HYBRID Blockchain API ready');
  } catch (error) {
    console.error('❌ Failed to initialize processors:', error);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down server...');
  
  if (htsxProcessor) {
    await htsxProcessor.shutdown();
  }
  
  if (spiralProcessor) {
    await spiralProcessor.shutdown();
  }
  
  server.close(() => {
    console.log('✅ Server shutdown complete');
    process.exit(0);
  });
});

export default app;
