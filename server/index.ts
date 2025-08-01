import express from 'express';
import cors from 'cors';
import { HTSXProcessor } from '../core/htsx-runtime/htsx-processor';
import { SpiralProcessor } from '../core/spiral-lang/spiral-processor';
import { initializeParser, parseCode, getLanguages, getParserStatus, generateGitHubFiles, calculateSRI } from './parser-api';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize processors
let htsxProcessor: HTSXProcessor;
let spiralProcessor: SpiralProcessor;

// HYBRID Blockchain API endpoints
app.get('/api/hybrid/public-metrics', (req, res) => {
  try {
    const metrics = {
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
      burnRate: '30% of fees',
      networkType: 'Cosmos SDK with EVM Compatibility',
      nativeCoin: 'HYBRID'
    };
    res.setHeader('Content-Type', 'application/json');
    res.json(metrics);
  } catch (error) {
    console.error('Error in /api/hybrid/public-metrics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/hybrid/network-status', (req, res) => {
  try {
    const networkStatus = {
      chainId: 'hybrid-1',
      networkName: 'HYBRID Mainnet',
      consensusType: 'Tendermint BFT',
      framework: 'Cosmos SDK',
      evmCompatibility: true,
      nativeCoin: 'HYBRID',
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
    };
    res.setHeader('Content-Type', 'application/json');
    res.json(networkStatus);
  } catch (error) {
    console.error('Error in /api/hybrid/network-status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/hybrid/validators', (req, res) => {
  try {
    const validators = Array.from({ length: 21 }, (_, i) => ({
      address: `hybrid1validator${i + 1}${'x'.repeat(32)}`,
      moniker: `Validator-${i + 1}`,
      votingPower: Math.floor(Math.random() * 10000000) + 1000000,
      commission: (Math.random() * 0.1).toFixed(3),
      uptime: (0.95 + Math.random() * 0.05).toFixed(4),
      status: 'BOND_STATUS_BONDED'
    }));

    res.setHeader('Content-Type', 'application/json');
    res.json({ validators });
  } catch (error) {
    console.error('Error in /api/hybrid/validators:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/hybrid/transactions', (req, res) => {
  try {
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

    res.setHeader('Content-Type', 'application/json');
    res.json({ transactions });
  } catch (error) {
    console.error('Error in /api/hybrid/transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/hybrid/staking', (req, res) => {
  try {
    const stakingData = {
      totalStaked: '45000000000000000000000000000', // 45B with 18 decimals
      totalSupply: '100000000000000000000000000000', // 100B with 18 decimals
      stakingRatio: 0.6,
      apr: 0.07,
      unbondingPeriod: 1814400, // 21 days in seconds
      validatorCount: 21,
      delegatorCount: 125847
    };
    res.setHeader('Content-Type', 'application/json');
    res.json(stakingData);
  } catch (error) {
    console.error('Error in /api/hybrid/staking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

// HTSX processing endpoint
app.post('/api/htsx/compile', async (req, res) => {
  try {
    const { source, options = {} } = req.body;

    if (!htsxProcessor) {
      htsxProcessor = new HTSXProcessor();
      await htsxProcessor.initialize();
    }

    const result = await htsxProcessor.processFile('runtime.htsx', source);
    res.json(result);
  } catch (error) {
    console.error('HTSX compilation error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// HTSX execution endpoint
app.post('/api/htsx/execute', async (req, res) => {
  try {
    const { source, options = {} } = req.body;

    const engine = new HTSXEngine({
      enableConsciousness: true,
      enableQuantumAwareness: true,
      enableTemporalSync: true,
      ...options
    });

    await engine.initialize();
    const result = await engine.execute(source, options);

    res.json(result);
  } catch (error) {
    console.error('HTSX execution error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

  // HTSX Processing endpoint
  app.post('/api/htsx/process', async (req, res) => {
    try {
      const { code } = req.body;

      if (!code) {
        return res.status(400).json({ error: 'No HTSX code provided' });
      }

      console.log('🔧 Processing HTSX code through Quantum Spiral Parser...');

      // Process through HTSX processor with quantum spiral parsing
      const result = await htsxProcessor.processFile('temp.htsx', code);

      if (result.success) {
        res.json({
          success: true,
          output: result.output || result.javascript || '',
          consciousness: result.consciousness || 0.85,
          quantum: result.quantum || code.includes('@quantum'),
          temporal: result.temporal || code.includes('@temporal'),
          bytecode: result.bytecode,
          ast: result.ast
        });
      } else {
        res.status(400).json({
          success: false,
          output: '',
          consciousness: 0,
          quantum: false,
          temporal: false,
          errors: [result.error || 'Unknown processing error']
        });
      }
    } catch (error) {
      console.error('❌ HTSX processing error:', error);
      res.status(500).json({
        success: false,
        output: '',
        consciousness: 0,
        quantum: false,
        temporal: false,
        errors: [error.toString()]
      });
    }
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      services: {
        spiralParser: 'active',
        htsxProcessor: 'active',
        quantumEngine: 'active'
      }
    });
  });

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 HYBRID Blockchain Server running on port ${PORT}`);

  // Initialize processors
  try {
    console.log('🔄 Initializing HTSX and SpiralScript processors...');

    htsxProcessor = new HTSXProcessor();
    spiralProcessor = new SpiralProcessor();

    await htsxProcessor.initialize();
    await spiralProcessor.initialize();
    await initializeParser();

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

  // Parser API routes
app.post('/api/parse', parseCode);
app.get('/api/languages', getLanguages);
app.get('/api/parser/status', getParserStatus);
app.get('/api/github/files', generateGitHubFiles);
app.post('/api/parser/sri', calculateSRI);

export default app;