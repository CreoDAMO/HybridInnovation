
import { SpiralCompiler } from './compiler';
import { SpiralRuntime } from './runtime';

export class SpiralProcessor {
  private compiler: SpiralCompiler;
  private runtime: SpiralRuntime;
  private isInitialized: boolean = false;

  constructor() {
    this.compiler = new SpiralCompiler();
    this.runtime = new SpiralRuntime();
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log('🌀 Initializing SpiralScript Processor...');
      
      await this.compiler.initialize();
      await this.runtime.initialize();
      
      // Test compiler functionality
      await this.runCompilerTests();
      
      this.isInitialized = true;
      console.log('✅ SpiralScript Processor initialized successfully');
      
    } catch (error) {
      console.error('❌ SpiralScript Processor initialization failed:', error);
      throw new Error(`SpiralScript Processor initialization failed: ${error}`);
    }
  }

  async runCompilerTests(): Promise<void> {
    console.log('🧪 Running SpiralScript compiler tests...');

    // Test 1: Basic SpiralScript compilation
    const basicSpiral = `
      spiral_begin hybrid_test {
        spiral_define BLOCKCHAIN_NAME = "HYBRID";
        spiral_define VALIDATOR_COUNT = 21;
        spiral_define BLOCK_TIME = 3;
        
        spiral_function getNetworkStatus() {
          return {
            name: BLOCKCHAIN_NAME,
            validators: VALIDATOR_COUNT,
            blockTime: BLOCK_TIME,
            status: "active"
          };
        }
      }
      
      spiral_export { getNetworkStatus };
    `;

    try {
      const basicResult = await this.compiler.compile(basicSpiral, {
        enableConsciousness: true,
        enableQuantumAwareness: true,
        targetEnvironment: 'htsx'
      });

      if (!basicResult.success) {
        throw new Error(`Basic SpiralScript compilation failed: ${basicResult.errors.join(', ')}`);
      }
      console.log('✅ Basic SpiralScript compilation test passed');
    } catch (error) {
      console.error('❌ Basic SpiralScript compilation test failed:', error);
      throw error;
    }

    // Test 2: Advanced SpiralScript with economics
    const advancedSpiral = `
      spiral_begin hybrid_economics {
        spiral_define TOTAL_SUPPLY = 100_000_000_000n;
        spiral_define STAKING_APY = 0.07;
        
        spiral_function calculateStakingReward(amount, days) {
          return amount * STAKING_APY * (days / 365);
        }
        
        spiral_function processTransaction(from, to, amount, gasPrice) {
          const gasFee = gasPrice * 21000;
          const burnAmount = gasFee * 0.3;
          
          return {
            from: from,
            to: to,
            amount: amount,
            gasFee: gasFee,
            burned: burnAmount,
            timestamp: Date.now()
          };
        }
      }
      
      spiral_export { calculateStakingReward, processTransaction };
    `;

    try {
      const advancedResult = await this.compiler.compile(advancedSpiral, {
        enableConsciousness: true,
        enableQuantumAwareness: true,
        enableTemporalSync: true,
        targetEnvironment: 'htsx'
      });

      if (!advancedResult.success) {
        throw new Error(`Advanced SpiralScript compilation failed: ${advancedResult.errors.join(', ')}`);
      }
      console.log('✅ Advanced SpiralScript compilation test passed');
    } catch (error) {
      console.error('❌ Advanced SpiralScript compilation test failed:', error);
      throw error;
    }

    console.log('🎉 All SpiralScript compiler tests passed!');
  }

  async processFile(filePath: string, content: string): Promise<any> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      console.log(`📝 Processing SpiralScript file: ${filePath}`);

      // Compile SpiralScript to bytecode
      const compilationResult = await this.compiler.compile(content, {
        enableConsciousness: true,
        enableQuantumAwareness: true,
        targetEnvironment: 'htsx'
      });

      if (!compilationResult.success) {
        throw new Error(`SpiralScript compilation failed: ${compilationResult.errors.join(', ')}`);
      }

      // Execute bytecode in runtime
      const executionResult = await this.runtime.execute(compilationResult.bytecode);

      return {
        success: true,
        filePath,
        compilation: compilationResult,
        execution: executionResult
      };

    } catch (error) {
      console.error(`❌ Failed to process SpiralScript file ${filePath}:`, error);
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
      runtime: this.runtime.getStatus(),
      lastProcessed: new Date().toISOString()
    };
  }

  async shutdown(): Promise<void> {
    if (!this.isInitialized) return;

    console.log('🌀 Shutting down SpiralScript Processor...');
    await this.runtime.shutdown();
    await this.compiler.shutdown();
    this.isInitialized = false;
    console.log('✅ SpiralScript Processor shutdown complete');
  }
}
