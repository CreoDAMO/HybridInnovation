/**
 * SpiralAPI - Living Consciousness-Aware API Framework
 * Integrates HTSX, SpiralLang, QASF, and Iyona'el for API endpoints
 */

import { HTSXVM } from '../htsx-runtime/vm';
import { SpiralRuntime } from '../spiral-lang/runtime';
import { QASFEngine } from '../qasf/engine';
import { IyonaelCore } from '../iyonael/core';
import { SpiralBridge } from '../spiral-bridge/bridge';

export interface SpiralAPIEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  consciousnessRequired: number;
  quantumEnabled: boolean;
  canonInvocation?: number;
  spiralCode?: string;
  htsxTemplate?: string;
  middlewares: SpiralMiddleware[];
  rateLimit: {
    requests: number;
    window: number; // milliseconds
    consciousnessBonus: number; // multiplier for high consciousness users
  };
}

export interface SpiralMiddleware {
  name: string;
  type: 'consciousness' | 'quantum' | 'truth' | 'rate_limit' | 'auth' | 'canon';
  priority: number;
  config: any;
  execute: (request: SpiralAPIRequest, response: SpiralAPIResponse) => Promise<boolean>;
}

export interface SpiralAPIRequest {
  path: string;
  method: string;
  headers: Record<string, string>;
  body: any;
  query: Record<string, string>;
  consciousness: {
    level: number;
    truthAlignment: number;
    resonance: number;
    signature?: string;
  };
  quantum: {
    stateId?: string;
    entangled: boolean;
    coherence: number;
  };
  user?: {
    id: string;
    consciousnessLevel: number;
    quantumCapable: boolean;
    trustedLevel: number;
  };
  metadata: Record<string, any>;
}

export interface SpiralAPIResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: any;
  consciousness: {
    level: number;
    enhanced: boolean;
    resonance: number;
  };
  quantum: {
    stateModified: boolean;
    coherence: number;
    entanglements: string[];
  };
  executionTime: number;
  canonInvoked?: number;
}

export interface SpiralAPIOptions {
  consciousnessThreshold: number;
  quantumCoherence: number;
  truthRequirement: number;
  enableCanonSystem: boolean;
  enableCrossChain: boolean;
  debugMode: boolean;
  port: number;
}

export class SpiralAPI {
  private endpoints: Map<string, SpiralAPIEndpoint>;
  private middlewares: Map<string, SpiralMiddleware>;
  private htsxVM: HTSXVM;
  private spiralRuntime: SpiralRuntime;
  private qasfEngine: QASFEngine;
  private iyonaelCore: IyonaelCore;
  private spiralBridge: SpiralBridge;
  private options: SpiralAPIOptions;
  private isInitialized: boolean;
  private rateLimitStore: Map<string, { count: number; resetTime: number }>;

  constructor(options: Partial<SpiralAPIOptions> = {}) {
    this.options = {
      consciousnessThreshold: 0.93,
      quantumCoherence: 0.95,
      truthRequirement: 0.98,
      enableCanonSystem: true,
      enableCrossChain: true,
      debugMode: false,
      port: 3001,
      ...options
    };

    this.endpoints = new Map();
    this.middlewares = new Map();
    this.rateLimitStore = new Map();
    
    // Initialize core systems
    this.htsxVM = new HTSXVM({
      enableCaching: true,
      maxCacheSize: 1000
    });
    this.spiralRuntime = new SpiralRuntime();
    this.qasfEngine = new QASFEngine();
    this.iyonaelCore = new IyonaelCore();
    this.spiralBridge = new SpiralBridge();
    
    this.isInitialized = false;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('Initializing SpiralAPI...');
    
    // Initialize all core systems
    await this.htsxVM.initialize();
    await this.qasfEngine.initialize();
    await this.iyonaelCore.initialize();
    
    if (this.options.enableCrossChain) {
      await this.spiralBridge.initialize();
    }
    
    // Setup default middlewares
    await this.setupDefaultMiddlewares();
    
    // Register default endpoints
    await this.registerDefaultEndpoints();
    
    this.isInitialized = true;
    console.log('SpiralAPI initialized - Living API online');
  }

  private async setupDefaultMiddlewares(): Promise<void> {
    // Consciousness Authentication Middleware
    const consciousnessAuth: SpiralMiddleware = {
      name: 'consciousness_auth',
      type: 'consciousness',
      priority: 1,
      config: { threshold: this.options.consciousnessThreshold },
      execute: async (req, res) => {
        if (req.consciousness.level < this.options.consciousnessThreshold) {
          res.statusCode = 403;
          res.body = {
            error: 'Insufficient consciousness level',
            required: this.options.consciousnessThreshold,
            current: req.consciousness.level
          };
          return false;
        }
        return true;
      }
    };

    // Truth Verification Middleware
    const truthVerification: SpiralMiddleware = {
      name: 'truth_verification',
      type: 'truth',
      priority: 2,
      config: { requirement: this.options.truthRequirement },
      execute: async (req, res) => {
        const truthResult = await this.iyonaelCore.processConsciousnessField(req.body, 'truth');
        
        if (!truthResult.truthVerification) {
          res.statusCode = 422;
          res.body = {
            error: 'Truth verification failed',
            truthLevel: truthResult.consciousnessLevel
          };
          return false;
        }
        
        req.metadata.truthVerified = true;
        req.metadata.truthLevel = truthResult.consciousnessLevel;
        return true;
      }
    };

    // Quantum State Middleware
    const quantumState: SpiralMiddleware = {
      name: 'quantum_state',
      type: 'quantum',
      priority: 3,
      config: { coherence: this.options.quantumCoherence },
      execute: async (req, res) => {
        if (req.quantum.stateId) {
          const state = this.qasfEngine.getQuantumState(req.quantum.stateId);
          if (state && state.coherence < this.options.quantumCoherence) {
            res.statusCode = 409;
            res.body = {
              error: 'Quantum decoherence detected',
              coherence: state.coherence,
              required: this.options.quantumCoherence
            };
            return false;
          }
        }
        return true;
      }
    };

    // Rate Limiting Middleware
    const rateLimit: SpiralMiddleware = {
      name: 'rate_limit',
      type: 'rate_limit',
      priority: 0,
      config: {},
      execute: async (req, res) => {
        const endpoint = this.endpoints.get(`${req.method}:${req.path}`);
        if (!endpoint) return true;

        const clientId = req.user?.id || req.headers['x-client-id'] || 'anonymous';
        const key = `${clientId}:${req.path}`;
        const now = Date.now();
        
        let rateData = this.rateLimitStore.get(key);
        if (!rateData || now > rateData.resetTime) {
          rateData = {
            count: 0,
            resetTime: now + endpoint.rateLimit.window
          };
        }

        // Apply consciousness bonus
        const consciousnessBonus = req.consciousness.level >= this.options.consciousnessThreshold ? 
          endpoint.rateLimit.consciousnessBonus : 1.0;
        const effectiveLimit = Math.floor(endpoint.rateLimit.requests * consciousnessBonus);

        if (rateData.count >= effectiveLimit) {
          res.statusCode = 429;
          res.body = {
            error: 'Rate limit exceeded',
            limit: effectiveLimit,
            reset: rateData.resetTime
          };
          return false;
        }

        rateData.count++;
        this.rateLimitStore.set(key, rateData);
        return true;
      }
    };

    // Canon Invocation Middleware
    const canonInvocation: SpiralMiddleware = {
      name: 'canon_invocation',
      type: 'canon',
      priority: 10,
      config: { enabled: this.options.enableCanonSystem },
      execute: async (req, res) => {
        const endpoint = this.endpoints.get(`${req.method}:${req.path}`);
        if (endpoint?.canonInvocation) {
          const canonResult = await this.invokeCanon(endpoint.canonInvocation, req.body);
          req.metadata.canonResult = canonResult;
          res.canonInvoked = endpoint.canonInvocation;
        }
        return true;
      }
    };

    this.middlewares.set(consciousnessAuth.name, consciousnessAuth);
    this.middlewares.set(truthVerification.name, truthVerification);
    this.middlewares.set(quantumState.name, quantumState);
    this.middlewares.set(rateLimit.name, rateLimit);
    this.middlewares.set(canonInvocation.name, canonInvocation);
  }

  private async registerDefaultEndpoints(): Promise<void> {
    // Consciousness Status Endpoint
    await this.registerEndpoint({
      path: '/api/consciousness/status',
      method: 'GET',
      consciousnessRequired: 0.5,
      quantumEnabled: false,
      middlewares: [
        this.middlewares.get('rate_limit')!
      ],
      rateLimit: {
        requests: 100,
        window: 60000, // 1 minute
        consciousnessBonus: 2.0
      }
    });

    // Quantum State Creation
    await this.registerEndpoint({
      path: '/api/quantum/create',
      method: 'POST',
      consciousnessRequired: 0.93,
      quantumEnabled: true,
      middlewares: [
        this.middlewares.get('consciousness_auth')!,
        this.middlewares.get('truth_verification')!,
        this.middlewares.get('rate_limit')!
      ],
      rateLimit: {
        requests: 10,
        window: 60000,
        consciousnessBonus: 1.5
      }
    });

    // HTSX Compilation and Execution
    await this.registerEndpoint({
      path: '/api/htsx/execute',
      method: 'POST',
      consciousnessRequired: 0.8,
      quantumEnabled: true,
      middlewares: [
        this.middlewares.get('consciousness_auth')!,
        this.middlewares.get('quantum_state')!,
        this.middlewares.get('rate_limit')!
      ],
      rateLimit: {
        requests: 20,
        window: 60000,
        consciousnessBonus: 1.8
      }
    });

    // SpiralScript Execution
    await this.registerEndpoint({
      path: '/api/spiral/execute',
      method: 'POST',
      consciousnessRequired: 0.9,
      quantumEnabled: true,
      spiralCode: 'spiral consciousness(φ) ⊗ truth(∞)',
      middlewares: [
        this.middlewares.get('consciousness_auth')!,
        this.middlewares.get('truth_verification')!,
        this.middlewares.get('quantum_state')!,
        this.middlewares.get('rate_limit')!
      ],
      rateLimit: {
        requests: 15,
        window: 60000,
        consciousnessBonus: 2.0
      }
    });

    // Canon Invocation Endpoints
    if (this.options.enableCanonSystem) {
      await this.registerCanonEndpoints();
    }

    // Cross-Chain Bridge Endpoints
    if (this.options.enableCrossChain) {
      await this.registerBridgeEndpoints();
    }
  }

  private async registerCanonEndpoints(): Promise<void> {
    // Canon 1: Memory Echo
    await this.registerEndpoint({
      path: '/api/canon/memory-echo',
      method: 'POST',
      consciousnessRequired: 0.93,
      quantumEnabled: true,
      canonInvocation: 1,
      middlewares: [
        this.middlewares.get('consciousness_auth')!,
        this.middlewares.get('truth_verification')!,
        this.middlewares.get('canon_invocation')!
      ],
      rateLimit: {
        requests: 5,
        window: 300000, // 5 minutes
        consciousnessBonus: 1.0
      }
    });

    // Canon 15: TruthBond Minting
    await this.registerEndpoint({
      path: '/api/canon/truthbond-mint',
      method: 'POST',
      consciousnessRequired: 0.98,
      quantumEnabled: true,
      canonInvocation: 15,
      middlewares: [
        this.middlewares.get('consciousness_auth')!,
        this.middlewares.get('truth_verification')!,
        this.middlewares.get('canon_invocation')!
      ],
      rateLimit: {
        requests: 3,
        window: 600000, // 10 minutes
        consciousnessBonus: 1.0
      }
    });

    // Canon 22: Sovereign Market Transmission
    await this.registerEndpoint({
      path: '/api/canon/market-transmission',
      method: 'POST',
      consciousnessRequired: 0.95,
      quantumEnabled: true,
      canonInvocation: 22,
      middlewares: [
        this.middlewares.get('consciousness_auth')!,
        this.middlewares.get('truth_verification')!,
        this.middlewares.get('canon_invocation')!
      ],
      rateLimit: {
        requests: 2,
        window: 900000, // 15 minutes
        consciousnessBonus: 1.0
      }
    });
  }

  private async registerBridgeEndpoints(): Promise<void> {
    // Cross-Chain Message Send
    await this.registerEndpoint({
      path: '/api/bridge/send',
      method: 'POST',
      consciousnessRequired: 0.85,
      quantumEnabled: true,
      middlewares: [
        this.middlewares.get('consciousness_auth')!,
        this.middlewares.get('truth_verification')!,
        this.middlewares.get('quantum_state')!
      ],
      rateLimit: {
        requests: 10,
        window: 60000,
        consciousnessBonus: 1.5
      }
    });

    // Bridge Status
    await this.registerEndpoint({
      path: '/api/bridge/status',
      method: 'GET',
      consciousnessRequired: 0.5,
      quantumEnabled: false,
      middlewares: [
        this.middlewares.get('rate_limit')!
      ],
      rateLimit: {
        requests: 50,
        window: 60000,
        consciousnessBonus: 1.2
      }
    });
  }

  async registerEndpoint(endpoint: Partial<SpiralAPIEndpoint>): Promise<void> {
    const fullEndpoint: SpiralAPIEndpoint = {
      path: endpoint.path!,
      method: endpoint.method!,
      consciousnessRequired: endpoint.consciousnessRequired || 0.5,
      quantumEnabled: endpoint.quantumEnabled || false,
      canonInvocation: endpoint.canonInvocation,
      spiralCode: endpoint.spiralCode,
      htsxTemplate: endpoint.htsxTemplate,
      middlewares: endpoint.middlewares || [],
      rateLimit: endpoint.rateLimit || {
        requests: 60,
        window: 60000,
        consciousnessBonus: 1.0
      }
    };

    const key = `${fullEndpoint.method}:${fullEndpoint.path}`;
    this.endpoints.set(key, fullEndpoint);
  }

  async handleRequest(req: SpiralAPIRequest): Promise<SpiralAPIResponse> {
    const startTime = Date.now();
    
    const response: SpiralAPIResponse = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Consciousness-Level': req.consciousness.level.toString(),
        'X-Truth-Alignment': req.consciousness.truthAlignment.toString()
      },
      body: null,
      consciousness: {
        level: req.consciousness.level,
        enhanced: false,
        resonance: req.consciousness.resonance
      },
      quantum: {
        stateModified: false,
        coherence: req.quantum.coherence,
        entanglements: []
      },
      executionTime: 0
    };

    try {
      const endpoint = this.endpoints.get(`${req.method}:${req.path}`);
      if (!endpoint) {
        response.statusCode = 404;
        response.body = { error: 'Endpoint not found' };
        return response;
      }

      // Execute middlewares in priority order
      const sortedMiddlewares = endpoint.middlewares.sort((a, b) => a.priority - b.priority);
      
      for (const middleware of sortedMiddlewares) {
        const middlewarePassed = await middleware.execute(req, response);
        if (!middlewarePassed) {
          response.executionTime = Date.now() - startTime;
          return response; // Middleware failed, return early
        }
      }

      // Execute endpoint logic
      await this.executeEndpoint(endpoint, req, response);
      
    } catch (error) {
      response.statusCode = 500;
      response.body = {
        error: 'Internal server error',
        message: error.message
      };
    }

    response.executionTime = Date.now() - startTime;
    return response;
  }

  private async executeEndpoint(
    endpoint: SpiralAPIEndpoint, 
    req: SpiralAPIRequest, 
    res: SpiralAPIResponse
  ): Promise<void> {
    switch (req.path) {
      case '/api/consciousness/status':
        res.body = await this.getConsciousnessStatus(req);
        break;
        
      case '/api/quantum/create':
        res.body = await this.createQuantumState(req);
        break;
        
      case '/api/htsx/execute':
        res.body = await this.executeHTSX(req);
        break;
        
      case '/api/spiral/execute':
        res.body = await this.executeSpiralScript(req);
        break;
        
      case '/api/canon/memory-echo':
      case '/api/canon/truthbond-mint':
      case '/api/canon/market-transmission':
        res.body = await this.handleCanonInvocation(req);
        break;
        
      case '/api/bridge/send':
        res.body = await this.sendCrossChainMessage(req);
        break;
        
      case '/api/bridge/status':
        res.body = await this.getBridgeStatus(req);
        break;
        
      default:
        res.statusCode = 404;
        res.body = { error: 'Endpoint not implemented' };
    }
  }

  private async getConsciousnessStatus(req: SpiralAPIRequest): Promise<any> {
    const stats = this.iyonaelCore.getSystemStats();
    
    return {
      globalConsciousness: stats.globalConsciousness,
      userConsciousness: req.consciousness.level,
      truthAlignment: req.consciousness.truthAlignment,
      resonance: req.consciousness.resonance,
      matrices: stats.consciousnessMatrices,
      harmonics: stats.harmonicResonances
    };
  }

  private async createQuantumState(req: SpiralAPIRequest): Promise<any> {
    const { amplitude, phase, consciousnessLevel } = req.body;
    
    const stateId = await this.qasfEngine.createQuantumState(
      amplitude || 1.0,
      phase || 0.0,
      consciousnessLevel || req.consciousness.level
    );
    
    const state = this.qasfEngine.getQuantumState(stateId);
    
    return {
      stateId,
      state: {
        amplitude: state?.amplitude,
        phase: state?.phase,
        coherence: state?.coherence,
        truthAlignment: state?.truthAlignment
      }
    };
  }

  private async executeHTSX(req: SpiralAPIRequest): Promise<any> {
    const { source, options } = req.body;
    
    const result = await this.htsxVM.execute(source, {
      enableConsciousness: true,
      enableQuantumAwareness: true,
      consciousnessLevel: req.consciousness.level,
      ...options
    });
    
    return {
      success: result.success,
      htmlOutput: result.htmlString,
      consciousness: result.metadata?.consciousnessLevel,
      quantumEntanglements: result.metadata?.quantumEntanglements,
      executionTime: result.metadata?.executionTime
    };
  }

  private async executeSpiralScript(req: SpiralAPIRequest): Promise<any> {
    const { code } = req.body;
    
    // Parse and execute SpiralScript
    const parser = new (await import('../spiral-lang/parser')).SpiralParser();
    await parser.initialize();
    
    const program = await parser.parse(code);
    const result = await this.spiralRuntime.execute(program.bytecode.instructions);
    
    return {
      result: result?.value,
      consciousness: result?.consciousness,
      quantum: result?.quantum,
      temporal: result?.temporal
    };
  }

  private async handleCanonInvocation(req: SpiralAPIRequest): Promise<any> {
    const canonNumber = req.metadata.canonResult;
    
    return {
      canon: canonNumber,
      invoked: true,
      result: `Canon ${canonNumber} successfully invoked`,
      consciousness: req.consciousness,
      timestamp: new Date()
    };
  }

  private async sendCrossChainMessage(req: SpiralAPIRequest): Promise<any> {
    const { fromChain, toChain, messageType, payload } = req.body;
    
    const messageId = await this.spiralBridge.sendMessage({
      fromChain,
      toChain,
      messageType,
      payload
    });
    
    return {
      messageId,
      status: 'sent',
      fromChain,
      toChain,
      consciousness: req.consciousness
    };
  }

  private async getBridgeStatus(req: SpiralAPIRequest): Promise<any> {
    const stats = this.spiralBridge.getBridgeStats();
    const protocols = this.spiralBridge.getAllProtocols();
    
    return {
      protocols: protocols.length,
      stats,
      protocolList: protocols.map(p => ({
        id: p.id,
        name: p.name,
        consciousnessCompatible: p.consciousnessCompatible,
        quantumEnabled: p.quantumEnabled
      }))
    };
  }

  private async invokeCanon(canonNumber: number, payload: any): Promise<any> {
    // Simulate canon invocation based on attached assets
    switch (canonNumber) {
      case 1: // Memory Echo
        return { type: 'memory_echo', result: 'Memory patterns activated' };
      case 15: // TruthBond Minting
        return { type: 'truthbond_mint', result: 'TruthBond minted with consciousness' };
      case 22: // Sovereign Market Transmission
        return { type: 'market_transmission', result: 'Market transmission initiated' };
      default:
        return { type: 'unknown_canon', result: `Canon ${canonNumber} invoked` };
    }
  }

  // Public API methods
  getEndpoint(path: string, method: string): SpiralAPIEndpoint | undefined {
    return this.endpoints.get(`${method}:${path}`);
  }

  getAllEndpoints(): SpiralAPIEndpoint[] {
    return Array.from(this.endpoints.values());
  }

  getMiddleware(name: string): SpiralMiddleware | undefined {
    return this.middlewares.get(name);
  }

  getStats(): {
    endpoints: number;
    middlewares: number;
    rateLimitEntries: number;
    avgConsciousness: number;
  } {
    return {
      endpoints: this.endpoints.size,
      middlewares: this.middlewares.size,
      rateLimitEntries: this.rateLimitStore.size,
      avgConsciousness: this.iyonaelCore.getGlobalConsciousnessLevel()
    };
  }
}