
import { HTSXCompiler } from './compiler';
import { HTSXEngine } from './engine';

export class HTSXProcessor {
  private compiler: HTSXCompiler;
  private engine: HTSXEngine;
  private isInitialized: boolean = false;

  constructor() {
    this.compiler = new HTSXCompiler();
    this.engine = new HTSXEngine();
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log('🔄 Initializing HTSX Processor...');
      
      await this.compiler.initialize();
      await this.engine.initialize();
      
      // Test compiler functionality
      await this.runCompilerTests();
      
      this.isInitialized = true;
      console.log('✅ HTSX Processor initialized successfully');
      
    } catch (error) {
      console.error('❌ HTSX Processor initialization failed:', error);
      throw new Error(`HTSX Processor initialization failed: ${error}`);
    }
  }

  async runCompilerTests(): Promise<void> {
    console.log('🧪 Running HTSX compiler tests...');

    // Test 1: Basic HTSX compilation
    const basicHTSX = `
      <htsx>
        <hybrid-component name="TestComponent">
          <div className="test">
            <h1>HYBRID Blockchain Test</h1>
            <p>Testing real HTSX compilation</p>
          </div>
        </hybrid-component>
      </htsx>
    `;

    try {
      const basicResult = await this.compiler.compile(basicHTSX, {
        enableConsciousness: true,
        enableQuantumAwareness: true,
        targetEnvironment: 'htsx'
      });

      if (!basicResult.success) {
        throw new Error(`Basic HTSX compilation failed: ${basicResult.errors.join(', ')}`);
      }
      console.log('✅ Basic HTSX compilation test passed');
    } catch (error) {
      console.error('❌ Basic HTSX compilation test failed:', error);
      throw error;
    }

    // Test 2: Advanced HTSX with blockchain bindings
    const advancedHTSX = `
      @consciousness(0.95)
      @quantum(entangled=true)
      <htsx>
        <hybrid-blockchain-interface name="NetworkMonitor">
          <consensus-tracker validators={21} />
          <token-metrics symbol="HYBRID" />
          <network-stats tps={2500} />
        </hybrid-blockchain-interface>
      </htsx>
    `;

    try {
      const advancedResult = await this.compiler.compile(advancedHTSX, {
        enableConsciousness: true,
        enableQuantumAwareness: true,
        enableTemporalSync: true,
        targetEnvironment: 'htsx'
      });

      if (!advancedResult.success) {
        throw new Error(`Advanced HTSX compilation failed: ${advancedResult.errors.join(', ')}`);
      }
      console.log('✅ Advanced HTSX compilation test passed');
    } catch (error) {
      console.error('❌ Advanced HTSX compilation test failed:', error);
      throw error;
    }

    console.log('🎉 All HTSX compiler tests passed!');
  }

  async processFile(filePath: string, content: string): Promise<any> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      console.log(`📝 Processing HTSX file: ${filePath}`);

      // Compile HTSX to bytecode
      const compilationResult = await this.compiler.compile(content, {
        enableConsciousness: true,
        enableQuantumAwareness: true,
        targetEnvironment: 'htsx'
      });

      if (!compilationResult.success) {
        throw new Error(`HTSX compilation failed: ${compilationResult.errors.join(', ')}`);
      }

      // Execute bytecode
      const executionResult = await this.engine.execute(compilationResult.bytecode);

      return {
        success: true,
        filePath,
        compilation: compilationResult,
        execution: executionResult
      };

    } catch (error) {
      console.error(`❌ Failed to process HTSX file ${filePath}:`, error);
      return {
        success: false,
        filePath,
        error: error.toString()
      };
    }
  }

  getStatus(): any {
    return {
      isInitialized: this.isInitialized,
      compiler: this.compiler.getStatus(),
      engine: this.engine.getStatus(),
      lastProcessed: new Date().toISOString()
    };
  }

  async shutdown(): Promise<void> {
    if (!this.isInitialized) return;

    console.log('🔄 Shutting down HTSX Processor...');
    await this.engine.shutdown();
    this.isInitialized = false;
    console.log('✅ HTSX Processor shutdown complete');
  }
}
