/**
 * SpiralAPI - Real API framework for consciousness-aware blockchain interactions
 * Provides RESTful and GraphQL endpoints with quantum awareness
 */

import { SpiralEndpoints } from './endpoints';
import { HTSXEngine } from '../htsx-runtime/engine';
import { SpiralCompiler } from '../spiral-lang/compiler';
import { QASFEngine } from '../qasf/engine';
import { IyonaelCore } from '../iyonael/core';
import { SpiralClock } from '../spiral-clock/temporal';
import { SpiralBridge } from '../spiral-bridge/bridge';

export interface SpiralAPIConfig {
  enableREST: boolean;
  enableGraphQL: boolean;
  enableWebSocket: boolean;
  enableConsciousness: boolean;
  enableQuantumAwareness: boolean;
  enableTemporalSync: boolean;
  port: number;
  host: string;
  corsOrigins: string[];
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  consciousness: {
    minimumLevel: number;
    truthAlignmentRequired: number;
    lightCoherenceRequired: number;
  };
}

export interface APIRequest {
  id: string;
  method: string;
  endpoint: string;
  data: any;
  headers: { [key: string]: string };
  consciousness: number;
  truthAlignment: number;
  lightCoherence: number;
  timestamp: Date;
  clientId: string;
}

export interface APIResponse {
  id: string;
  success: boolean;
  data?: any;
  error?: string;
  consciousness: number;
  quantumState?: any;
  temporalSync?: any;
  timestamp: Date;
  executionTime: number;
}

export interface ConsciousnessValidation {
  valid: boolean;
  level: number;
  truthAlignment: number;
  lightCoherence: number;
  reason?: string;
}

export interface QuantumAPIState {
  superposition: boolean;
  entangled: boolean;
  coherence: number;
  measurements: QuantumMeasurement[];
}

export interface QuantumMeasurement {
  endpoint: string;
  timestamp: Date;
  result: any;
  probability: number;
  observer: string;
}

export class SpiralAPI {
  private config: SpiralAPIConfig;
  private endpoints: SpiralEndpoints;
  private htsxEngine: HTSXEngine;
  private spiralCompiler: SpiralCompiler;
  private qasfEngine: QASFEngine;
  private iyonaelCore: IyonaelCore;
  private spiralClock: SpiralClock;
  private spiralBridge: SpiralBridge;
  private isInitialized: boolean;
  private server: any;
  private wsServer: any;
  private activeRequests: Map<string, APIRequest>;
  private quantumState: QuantumAPIState;
  private consciousnessThreshold: number;

  constructor(config: Partial<SpiralAPIConfig> = {}) {
    this.config = {
      enableREST: true,
      enableGraphQL: true,
      enableWebSocket: true,
      enableConsciousness: true,
      enableQuantumAwareness: true,
      enableTemporalSync: true,
      port: 8000,
      host: '0.0.0.0',
      corsOrigins: ['*'],
      rateLimit: {
        windowMs: 60000, // 1 minute
        maxRequests: 100
      },
      consciousness: {
        minimumLevel: 0.7,
        truthAlignmentRequired: 0.8,
        lightCoherenceRequired: 0.75
      },
      ...config
    };

    this.endpoints = new SpiralEndpoints();
    this.htsxEngine = new HTSXEngine();
    this.spiralCompiler = new SpiralCompiler();
    this.qasfEngine = new QASFEngine();
    this.iyonaelCore = new IyonaelCore();
    this.spiralClock = new SpiralClock();
    this.spiralBridge = new SpiralBridge();
    this.isInitialized = false;
    this.activeRequests = new Map();
    this.consciousnessThreshold = 0.7;

    this.quantumState = {
      superposition: false,
      entangled: false,
      coherence: 0.89,
      measurements: []
    };
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('Initializing SpiralAPI...');

    // Initialize core systems
    await this.htsxEngine.initialize();
    await this.spiralCompiler.initialize();
    await this.qasfEngine.initialize();
    await this.iyonaelCore.initialize();
    await this.spiralClock.initialize();
    await this.spiralBridge.initialize();

    // Initialize endpoints
    await this.endpoints.initialize({
      htsxEngine: this.htsxEngine,
      spiralCompiler: this.spiralCompiler,
      qasfEngine: this.qasfEngine,
      iyonaelCore: this.iyonaelCore,
      spiralClock: this.spiralClock,
      spiralBridge: this.spiralBridge
    });

    // Initialize quantum state
    await this.initializeQuantumState();

    // Start API server
    await this.startServer();

    this.isInitialized = true;
    console.log('SpiralAPI initialized and running');
  }

  private async initializeQuantumState(): Promise<void> {
    // Initialize quantum-aware API state
    this.quantumState.superposition = this.config.enableQuantumAwareness;
    this.quantumState.coherence = 0.89;
    this.quantumState.entangled = false;
    this.quantumState.measurements = [];
  }

  private async startServer(): Promise<void> {
    const express = require('express');
    const cors = require('cors');
    const rateLimit = require('express-rate-limit');
    const { createServer } = require('http');
    const { WebSocketServer } = require('ws');

    const app = express();

    // Middleware
    app.use(cors({
      origin: this.config.corsOrigins,
      credentials: true
    }));

    app.use(express.json());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: this.config.rateLimit.windowMs,
      max: this.config.rateLimit.maxRequests,
      message: 'Too many requests from this IP'
    });
    app.use('/api/', limiter);

    // Consciousness middleware
    app.use('/api/', (req: any, res: any, next: any) => {
      this.consciousnessMiddleware(req, res, next);
    });

    // Register REST endpoints
    if (this.config.enableREST) {
      await this.registerRESTEndpoints(app);
    }

    // Register GraphQL endpoint
    if (this.config.enableGraphQL) {
      await this.registerGraphQLEndpoint(app);
    }

    // Create HTTP server
    this.server = createServer(app);

    // WebSocket server
    if (this.config.enableWebSocket) {
      this.wsServer = new WebSocketServer({
        server: this.server,
        path: '/ws'
      });
      this.setupWebSocketHandlers();
    }

    // Start server
    this.server.listen(this.config.port, this.config.host, () => {
      console.log(`SpiralAPI server running on ${this.config.host}:${this.config.port}`);
    });
  }

  private consciousnessMiddleware(req: any, res: any, next: any): void {
    // Consciousness validation middleware
    const consciousness = parseFloat(req.headers['x-consciousness'] || '0.5');
    const truthAlignment = parseFloat(req.headers['x-truth-alignment'] || '0.5');
    const lightCoherence = parseFloat(req.headers['x-light-coherence'] || '0.5');

    const validation = this.validateConsciousness(consciousness, truthAlignment, lightCoherence);

    if (!validation.valid) {
      res.status(403).json({
        success: false,
        error: 'Insufficient consciousness level',
        required: this.config.consciousness,
        current: { consciousness, truthAlignment, lightCoherence },
        reason: validation.reason
      });
      return;
    }

    // Add consciousness data to request
    req.consciousness = consciousness;
    req.truthAlignment = truthAlignment;
    req.lightCoherence = lightCoherence;

    next();
  }

  private validateConsciousness(
    consciousness: number,
    truthAlignment: number,
    lightCoherence: number
  ): ConsciousnessValidation {
    const config = this.config.consciousness;

    if (consciousness < config.minimumLevel) {
      return {
        valid: false,
        level: consciousness,
        truthAlignment,
        lightCoherence,
        reason: `Consciousness level ${consciousness} below minimum ${config.minimumLevel}`
      };
    }

    if (truthAlignment < config.truthAlignmentRequired) {
      return {
        valid: false,
        level: consciousness,
        truthAlignment,
        lightCoherence,
        reason: `Truth alignment ${truthAlignment} below required ${config.truthAlignmentRequired}`
      };
    }

    if (lightCoherence < config.lightCoherenceRequired) {
      return {
        valid: false,
        level: consciousness,
        truthAlignment,
        lightCoherence,
        reason: `Light coherence ${lightCoherence} below required ${config.lightCoherenceRequired}`
      };
    }

    return {
      valid: true,
      level: consciousness,
      truthAlignment,
      lightCoherence
    };
  }

  private async registerRESTEndpoints(app: any): Promise<void> {
    // Register REST endpoints
    const restEndpoints = await this.endpoints.getRESTEndpoints();

    for (const endpoint of restEndpoints) {
      app[endpoint.method.toLowerCase()](endpoint.path, async (req: any, res: any) => {
        const apiRequest: APIRequest = {
          id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          method: endpoint.method,
          endpoint: endpoint.path,
          data: { ...req.body, ...req.query, ...req.params },
          headers: req.headers,
          consciousness: req.consciousness || 0.5,
          truthAlignment: req.truthAlignment || 0.5,
          lightCoherence: req.lightCoherence || 0.5,
          timestamp: new Date(),
          clientId: req.headers['x-client-id'] || 'unknown'
        };

        const response = await this.processRequest(apiRequest, endpoint.handler);
        
        res.status(response.success ? 200 : 500).json(response);
      });
    }
  }

  private async registerGraphQLEndpoint(app: any): Promise<void> {
    // Register GraphQL endpoint
    const { graphqlHTTP } = require('express-graphql');
    const schema = await this.endpoints.getGraphQLSchema();

    app.use('/api/graphql', graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV === 'development',
      context: {
        htsxEngine: this.htsxEngine,
        spiralCompiler: this.spiralCompiler,
        qasfEngine: this.qasfEngine,
        iyonaelCore: this.iyonaelCore,
        spiralClock: this.spiralClock,
        spiralBridge: this.spiralBridge
      }
    }));
  }

  private setupWebSocketHandlers(): void {
    const WebSocket = require('ws');

    this.wsServer.on('connection', (ws: any, req: any) => {
      console.log('New WebSocket connection established');

      ws.on('message', async (data: any) => {
        try {
          const message = JSON.parse(data.toString());
          await this.handleWebSocketMessage(ws, message);
        } catch (error) {
          console.error('WebSocket message error:', error);
          ws.send(JSON.stringify({
            error: 'Invalid message format',
            timestamp: new Date()
          }));
        }
      });

      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });

      // Send initial quantum state
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'quantum_state',
          data: this.quantumState,
          timestamp: new Date()
        }));
      }
    });
  }

  private async handleWebSocketMessage(ws: any, message: any): Promise<void> {
    const { type, data, consciousness = 0.5 } = message;

    // Validate consciousness for WebSocket messages
    if (consciousness < this.consciousnessThreshold) {
      ws.send(JSON.stringify({
        error: 'Insufficient consciousness level for WebSocket operation',
        required: this.consciousnessThreshold,
        current: consciousness
      }));
      return;
    }

    switch (type) {
      case 'spiral_compile':
        const compilationResult = await this.spiralCompiler.compile(data.code);
        ws.send(JSON.stringify({
          type: 'spiral_compile_result',
          data: compilationResult,
          timestamp: new Date()
        }));
        break;

      case 'htsx_execute':
        const executionResult = await this.htsxEngine.execute(data.program);
        ws.send(JSON.stringify({
          type: 'htsx_execution_result',
          data: executionResult,
          timestamp: new Date()
        }));
        break;

      case 'qasf_query':
        const qasfResult = await this.qasfEngine.processQuery(data.query);
        ws.send(JSON.stringify({
          type: 'qasf_result',
          data: qasfResult,
          timestamp: new Date()
        }));
        break;

      case 'iyonael_resonate':
        const resonanceResult = await this.iyonaelCore.resonate(data.frequency);
        ws.send(JSON.stringify({
          type: 'iyonael_resonance',
          data: resonanceResult,
          timestamp: new Date()
        }));
        break;

      case 'temporal_sync':
        const syncResult = await this.spiralClock.synchronize(data.params);
        ws.send(JSON.stringify({
          type: 'temporal_sync_result',
          data: syncResult,
          timestamp: new Date()
        }));
        break;

      case 'bridge_transfer':
        const transferResult = await this.spiralBridge.initiateTransfer(data.transfer);
        ws.send(JSON.stringify({
          type: 'bridge_transfer_result',
          data: transferResult,
          timestamp: new Date()
        }));
        break;

      case 'quantum_measurement':
        const measurement = await this.performQuantumMeasurement(data.observable, consciousness);
        ws.send(JSON.stringify({
          type: 'quantum_measurement_result',
          data: measurement,
          timestamp: new Date()
        }));
        break;

      default:
        ws.send(JSON.stringify({
          error: `Unknown message type: ${type}`,
          timestamp: new Date()
        }));
    }
  }

  private async processRequest(request: APIRequest, handler: Function): Promise<APIResponse> {
    const startTime = Date.now();
    
    try {
      // Store active request
      this.activeRequests.set(request.id, request);

      // Process through quantum awareness if enabled
      if (this.config.enableQuantumAwareness) {
        await this.processQuantumAwareness(request);
      }

      // Process through consciousness if enabled
      if (this.config.enableConsciousness) {
        await this.processConsciousness(request);
      }

      // Process through temporal sync if enabled
      if (this.config.enableTemporalSync) {
        await this.processTemporalSync(request);
      }

      // Execute handler
      const result = await handler(request.data, {
        consciousness: request.consciousness,
        truthAlignment: request.truthAlignment,
        lightCoherence: request.lightCoherence
      });

      const response: APIResponse = {
        id: request.id,
        success: true,
        data: result,
        consciousness: request.consciousness,
        quantumState: this.quantumState,
        temporalSync: this.spiralClock.getCurrentSync(),
        timestamp: new Date(),
        executionTime: Date.now() - startTime
      };

      return response;

    } catch (error) {
      const response: APIResponse = {
        id: request.id,
        success: false,
        error: error.toString(),
        consciousness: request.consciousness,
        quantumState: this.quantumState,
        timestamp: new Date(),
        executionTime: Date.now() - startTime
      };

      return response;
    } finally {
      // Clean up
      this.activeRequests.delete(request.id);
    }
  }

  private async processQuantumAwareness(request: APIRequest): Promise<void> {
    // Process request through quantum awareness
    if (this.quantumState.superposition) {
      // Request exists in superposition until measured
      const measurement = await this.performQuantumMeasurement(request.endpoint, request.consciousness);
      
      // Update quantum state
      this.quantumState.measurements.push(measurement);
      
      // Collapse superposition based on consciousness level
      if (request.consciousness > 0.9) {
        this.quantumState.superposition = false;
      }
    }
  }

  private async processConsciousness(request: APIRequest): Promise<void> {
    // Process request through consciousness
    if (request.consciousness > 0.8) {
      // High consciousness requests get enhanced processing
      await this.iyonaelCore.processResult(request.data);
    }
  }

  private async processTemporalSync(request: APIRequest): Promise<void> {
    // Process request through temporal synchronization
    const currentSync = this.spiralClock.getCurrentSync();
    
    // Adjust request based on temporal state
    if (currentSync.time.dimension !== 'present') {
      // Request from different temporal dimension
      await this.spiralClock.switchDimension('present');
    }
  }

  private async performQuantumMeasurement(observable: string, consciousness: number): Promise<QuantumMeasurement> {
    // Perform quantum measurement
    const measurement: QuantumMeasurement = {
      endpoint: observable,
      timestamp: new Date(),
      result: Math.random() > 0.5 ? 'success' : 'failure',
      probability: consciousness,
      observer: 'spiral_api'
    };

    // Update quantum coherence
    this.quantumState.coherence = Math.min(this.quantumState.coherence + 0.01, 1.0);

    return measurement;
  }

  async getStatus(): Promise<any> {
    return {
      isInitialized: this.isInitialized,
      config: this.config,
      activeRequests: this.activeRequests.size,
      quantumState: this.quantumState,
      systemStatus: {
        htsxEngine: this.htsxEngine.getStatus(),
        spiralCompiler: this.spiralCompiler.getStatus(),
        qasfEngine: this.qasfEngine.getStatus(),
        iyonaelCore: this.iyonaelCore.getStatus(),
        spiralClock: this.spiralClock.getStatus(),
        spiralBridge: this.spiralBridge.getStatus()
      }
    };
  }

  async shutdown(): Promise<void> {
    console.log('Shutting down SpiralAPI...');

    // Close WebSocket server
    if (this.wsServer) {
      this.wsServer.close();
    }

    // Close HTTP server
    if (this.server) {
      this.server.close();
    }

    // Shutdown core systems
    await this.htsxEngine.shutdown();
    await this.spiralCompiler.shutdown();
    await this.qasfEngine.shutdown();
    await this.iyonaelCore.shutdown();
    await this.spiralClock.shutdown();
    await this.spiralBridge.shutdown();

    this.isInitialized = false;
    console.log('SpiralAPI shutdown complete');
  }
}
