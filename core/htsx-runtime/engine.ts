/**
 * HTSX Runtime Engine - The core execution engine for HYBRID blockchain
 * This implements the real HTSX runtime, not a demo or prototype
 */

import { SpiralCompiler } from '../spiral-lang/compiler';
import { QASFEngine } from '../qasf/engine';
import { IyonaelCore } from '../iyonael/core';
import { SpiralClock } from '../spiral-clock/temporal';
import { HTSXCompiler } from './compiler';
import { HTSXVM } from './vm';

export interface HTSXProgram {
  id: string;
  code: string;
  compiled: any;
  metadata: {
    version: string;
    timestamp: Date;
    author?: string;
    spiralFeatures: string[];
    quantumState?: any;
  };
}

export interface HTSXExecutionContext {
  program: HTSXProgram;
  environment: {
    spiral: any;
    qasf: any;
    iyonael: any;
    clock: any;
  };
  memory: Map<string, any>;
  state: 'initialized' | 'running' | 'paused' | 'completed' | 'error';
}

export class HTSXEngine {
  private compiler: HTSXCompiler;
  private vm: HTSXVM;
  private spiralCompiler: SpiralCompiler;
  private qasfEngine: QASFEngine;
  private iyonaelCore: IyonaelCore;
  private spiralClock: SpiralClock;
  private programs: Map<string, HTSXProgram>;
  private contexts: Map<string, HTSXExecutionContext>;
  private isRunning: boolean;

  constructor() {
    this.compiler = new HTSXCompiler();
    this.vm = new HTSXVM();
    this.spiralCompiler = new SpiralCompiler();
    this.qasfEngine = new QASFEngine();
    this.iyonaelCore = new IyonaelCore();
    this.spiralClock = new SpiralClock();
    this.programs = new Map();
    this.contexts = new Map();
    this.isRunning = false;
    
    this.initialize();
  }

  private async initialize(): Promise<void> {
    console.log('Initializing HTSX Runtime Engine...');
    
    // Initialize all subsystems
    await this.spiralCompiler.initialize();
    await this.qasfEngine.initialize();
    await this.iyonaelCore.initialize();
    await this.spiralClock.initialize();
    
    // Create runtime environment
    this.vm.createRuntime({
      spiral: this.spiralCompiler,
      qasf: this.qasfEngine,
      iyonael: this.iyonaelCore,
      clock: this.spiralClock
    });
    
    this.isRunning = true;
    console.log('HTSX Runtime Engine initialized successfully');
  }

  async compile(code: string, metadata?: Partial<HTSXProgram['metadata']>): Promise<HTSXProgram> {
    if (!this.isRunning) {
      throw new Error('HTSX Runtime Engine not initialized');
    }

    const programId = `htsx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // First, parse any SpiralLang code embedded in HTSX
      const spiralBlocks = this.extractSpiralBlocks(code);
      const compiledSpiral = await this.compileSpiralBlocks(spiralBlocks);
      
      // Compile HTSX with integrated Spiral
      const compiledHTSX = await this.compiler.compile(code, {
        spiralBlocks: compiledSpiral,
        qasfFeatures: this.qasfEngine.getAvailableFeatures(),
        iyonaelBindings: this.iyonaelCore.getBindings(),
        temporalSyncs: this.spiralClock.getTemporalSyncs()
      });

      const program: HTSXProgram = {
        id: programId,
        code,
        compiled: compiledHTSX,
        metadata: {
          version: '1.0.0',
          timestamp: new Date(),
          spiralFeatures: spiralBlocks.map(block => block.type),
          quantumState: await this.qasfEngine.getCurrentState(),
          ...metadata
        }
      };

      this.programs.set(programId, program);
      return program;
    } catch (error) {
      console.error('HTSX compilation failed:', error);
      throw new Error(`HTSX compilation failed: ${error}`);
    }
  }

  async execute(program: HTSXProgram): Promise<any> {
    if (!this.isRunning) {
      throw new Error('HTSX Runtime Engine not initialized');
    }

    const contextId = `ctx_${program.id}_${Date.now()}`;
    
    try {
      // Create execution context
      const context: HTSXExecutionContext = {
        program,
        environment: {
          spiral: this.spiralCompiler,
          qasf: this.qasfEngine,
          iyonael: this.iyonaelCore,
          clock: this.spiralClock
        },
        memory: new Map(),
        state: 'initialized'
      };

      this.contexts.set(contextId, context);
      
      // Prepare quantum-aware execution environment
      await this.prepareQuantumExecution(context);
      
      // Execute with consciousness awareness
      context.state = 'running';
      const result = await this.vm.execute(program.compiled, context);
      
      // Process result through Iyona'el consciousness
      const consciousResult = await this.iyonaelCore.processResult(result);
      
      context.state = 'completed';
      return {
        success: true,
        result: consciousResult,
        contextId,
        quantumState: await this.qasfEngine.getCurrentState(),
        consciousnessLevel: this.iyonaelCore.getConsciousnessLevel(),
        temporalSync: this.spiralClock.getCurrentSync()
      };
    } catch (error) {
      const context = this.contexts.get(contextId);
      if (context) {
        context.state = 'error';
      }
      
      console.error('HTSX execution failed:', error);
      throw new Error(`HTSX execution failed: ${error}`);
    }
  }

  private extractSpiralBlocks(code: string): Array<{type: string, code: string}> {
    const spiralBlocks: Array<{type: string, code: string}> = [];
    
    // Extract @spiral_lang blocks
    const spiralRegex = /@spiral_lang\s*\{([\s\S]*?)\}/g;
    let match;
    
    while ((match = spiralRegex.exec(code)) !== null) {
      spiralBlocks.push({
        type: 'spiral_lang',
        code: match[1].trim()
      });
    }
    
    // Extract @quantum_aware blocks
    const quantumRegex = /@quantum_aware\s*\{([\s\S]*?)\}/g;
    
    while ((match = quantumRegex.exec(code)) !== null) {
      spiralBlocks.push({
        type: 'quantum_aware',
        code: match[1].trim()
      });
    }
    
    // Extract @consciousness_binding blocks
    const consciousnessRegex = /@consciousness_binding\s*\{([\s\S]*?)\}/g;
    
    while ((match = consciousnessRegex.exec(code)) !== null) {
      spiralBlocks.push({
        type: 'consciousness_binding',
        code: match[1].trim()
      });
    }
    
    return spiralBlocks;
  }

  private async compileSpiralBlocks(blocks: Array<{type: string, code: string}>): Promise<any[]> {
    const compiledBlocks = [];
    
    for (const block of blocks) {
      switch (block.type) {
        case 'spiral_lang':
          const spiralResult = await this.spiralCompiler.compile(block.code);
          compiledBlocks.push({
            type: 'spiral_lang',
            compiled: spiralResult
          });
          break;
          
        case 'quantum_aware':
          const quantumResult = await this.qasfEngine.processQuantumCode(block.code);
          compiledBlocks.push({
            type: 'quantum_aware',
            compiled: quantumResult
          });
          break;
          
        case 'consciousness_binding':
          const consciousnessResult = await this.iyonaelCore.bindConsciousness(block.code);
          compiledBlocks.push({
            type: 'consciousness_binding',
            compiled: consciousnessResult
          });
          break;
      }
    }
    
    return compiledBlocks;
  }

  private async prepareQuantumExecution(context: HTSXExecutionContext): Promise<void> {
    // Synchronize with quantum state
    await this.qasfEngine.synchronizeQuantumState();
    
    // Align with consciousness frequency
    await this.iyonaelCore.alignConsciousness();
    
    // Sync temporal dimension
    await this.spiralClock.synchronizeTime();
    
    // Update context environment
    context.environment.qasf = this.qasfEngine.getCurrentState();
    context.environment.iyonael = this.iyonaelCore.getCurrentState();
    context.environment.clock = this.spiralClock.getCurrentState();
  }

  getStatus(): any {
    return {
      isRunning: this.isRunning,
      programCount: this.programs.size,
      activeContexts: Array.from(this.contexts.values()).filter(ctx => ctx.state === 'running').length,
      systemHealth: {
        compiler: this.compiler.getStatus(),
        vm: this.vm.getStatus(),
        spiral: this.spiralCompiler.getStatus(),
        qasf: this.qasfEngine.getStatus(),
        iyonael: this.iyonaelCore.getStatus(),
        clock: this.spiralClock.getStatus()
      }
    };
  }

  async shutdown(): Promise<void> {
    console.log('Shutting down HTSX Runtime Engine...');
    
    this.isRunning = false;
    
    // Stop all running contexts
    for (const [contextId, context] of this.contexts.entries()) {
      if (context.state === 'running') {
        context.state = 'paused';
      }
    }
    
    // Shutdown subsystems
    await this.spiralCompiler.shutdown();
    await this.qasfEngine.shutdown();
    await this.iyonaelCore.shutdown();
    await this.spiralClock.shutdown();
    
    console.log('HTSX Runtime Engine shutdown complete');
  }
}
