import { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import { storage } from './storage';
import { HTSXEngine } from '../core/htsx-runtime/engine';
import { SpiralCompiler } from '../core/spiral-lang/compiler';
import { QASFEngine } from '../core/qasf/engine';
import { IyonaelCore } from '../core/iyonael/core';
import { HybridConsensus } from '../blockchain/hybrid-consensus';
import { AIOrchestrator } from '../ai/orchestrator';

export class HybridServer {
  private httpServer;
  private wss: WebSocketServer;
  private htsxEngine: HTSXEngine;
  private spiralCompiler: SpiralCompiler;
  private qasfEngine: QASFEngine;
  private iyonaelCore: IyonaelCore;
  private consensus: HybridConsensus;
  private aiOrchestrator: AIOrchestrator;

  constructor() {
    this.httpServer = createServer();
    this.wss = new WebSocketServer({ server: this.httpServer, path: '/ws' });
    
    // Initialize core systems
    this.htsxEngine = new HTSXEngine();
    this.spiralCompiler = new SpiralCompiler();
    this.qasfEngine = new QASFEngine();
    this.iyonaelCore = new IyonaelCore();
    this.consensus = new HybridConsensus();
    this.aiOrchestrator = new AIOrchestrator();
    
    this.setupWebSocket();
  }

  private setupWebSocket() {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('New WebSocket connection established');
      
      ws.on('message', async (data) => {
        try {
          const message = JSON.parse(data.toString());
          await this.handleWebSocketMessage(ws, message);
        } catch (error) {
          console.error('WebSocket message error:', error);
          ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }
      });

      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });

      // Send initial system status
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'system_status',
          data: {
            htsx: this.htsxEngine.getStatus(),
            spiral: this.spiralCompiler.getStatus(),
            qasf: this.qasfEngine.getStatus(),
            iyonael: this.iyonaelCore.getStatus(),
            consensus: this.consensus.getStatus()
          }
        }));
      }
    });
  }

  private async handleWebSocketMessage(ws: WebSocket, message: any) {
    const { type, data } = message;

    switch (type) {
      case 'spiral_compile':
        const compilationResult = await this.spiralCompiler.compile(data.code);
        ws.send(JSON.stringify({
          type: 'spiral_compile_result',
          data: compilationResult
        }));
        break;

      case 'htsx_execute':
        const executionResult = await this.htsxEngine.execute(data.program);
        ws.send(JSON.stringify({
          type: 'htsx_execution_result',
          data: executionResult
        }));
        break;

      case 'qasf_query':
        const qasfResult = await this.qasfEngine.processQuery(data.query);
        ws.send(JSON.stringify({
          type: 'qasf_result',
          data: qasfResult
        }));
        break;

      case 'iyonael_resonate':
        const resonanceResult = await this.iyonaelCore.resonate(data.frequency);
        ws.send(JSON.stringify({
          type: 'iyonael_resonance',
          data: resonanceResult
        }));
        break;

      case 'blockchain_transaction':
        const txResult = await this.consensus.processTransaction(data.transaction);
        ws.send(JSON.stringify({
          type: 'transaction_result',
          data: txResult
        }));
        break;

      case 'ai_orchestrate':
        const aiResult = await this.aiOrchestrator.orchestrate(data.task);
        ws.send(JSON.stringify({
          type: 'ai_result',
          data: aiResult
        }));
        break;

      default:
        ws.send(JSON.stringify({ error: 'Unknown message type' }));
    }
  }

  // REST API endpoints
  async handleAuth(req: Request, res: Response) {
    const { walletAddress } = req.body;
    
    try {
      let user = await storage.getUserByWallet(walletAddress);
      
      if (!user) {
        user = await storage.createUser({
          username: `user_${Date.now()}`,
          walletAddress,
          role: 'user'
        });
      }
      
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ error: 'Authentication failed' });
    }
  }

  async handleSpiralCompile(req: Request, res: Response) {
    const { code, sessionId } = req.body;
    
    try {
      const result = await this.spiralCompiler.compile(code);
      
      // Save session
      await storage.createSpiralSession({
        sessionId,
        spiralCode: code,
        compiledCode: result.compiled,
        executionResult: result,
        status: 'completed'
      });
      
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ error: 'Compilation failed' });
    }
  }

  async handleBlockchainStatus(req: Request, res: Response) {
    try {
      const status = {
        latestBlock: await storage.getLatestBlock(),
        consensus: this.consensus.getStatus(),
        nodeCount: this.consensus.getNodeCount(),
        networkHealth: this.consensus.getNetworkHealth()
      };
      
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get blockchain status' });
    }
  }

  start(port: number = 8000) {
    this.httpServer.listen(port, '0.0.0.0', () => {
      console.log(`HYBRID server running on port ${port}`);
    });
  }
}
