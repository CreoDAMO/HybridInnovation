
/**
 * SpiralScript File Processor - Handles .spiral file compilation and execution
 */

import { SpiralParser } from './parser';
import { SpiralRuntime } from './runtime';
import { SpiralCompiler } from './compiler';

export interface SpiralFileResult {
  success: boolean;
  compiled: boolean;
  executed: boolean;
  result: any;
  errors: string[];
  warnings: string[];
  consciousness: number;
  quantum: any;
  temporal: any;
}

export class SpiralProcessor {
  private parser: SpiralParser;
  private compiler: SpiralCompiler;
  private runtime: SpiralRuntime;

  constructor() {
    this.parser = new SpiralParser();
    this.compiler = new SpiralCompiler();
    this.runtime = new SpiralRuntime();
  }

  async initialize(): Promise<void> {
    await this.parser.initialize();
    await this.compiler.initialize();
    await this.runtime.initialize();
  }

  async processSpiralFile(filePath: string, content: string): Promise<SpiralFileResult> {
    try {
      console.log(`Processing SpiralScript file: ${filePath}`);

      // Parse the spiral code
      const parseResult = await this.parser.parse(content);
      
      if (parseResult.errors.length > 0) {
        return {
          success: false,
          compiled: false,
          executed: false,
          result: null,
          errors: parseResult.errors,
          warnings: parseResult.warnings,
          consciousness: parseResult.metadata.consciousnessLevel,
          quantum: null,
          temporal: null
        };
      }

      // Compile to bytecode
      const compileResult = await this.compiler.compile(parseResult.ast, {
        optimizationLevel: 'advanced',
        enableConsciousness: true,
        enableQuantumAwareness: true,
        consciousnessLevel: parseResult.metadata.consciousnessLevel
      });

      // Execute
      const executionResult = await this.runtime.execute(compileResult.instructions, {
        consciousnessLevel: parseResult.metadata.consciousnessLevel,
        enableQuantumAwareness: true,
        enableTemporalSync: true
      });

      return {
        success: true,
        compiled: true,
        executed: true,
        result: executionResult.value,
        errors: [],
        warnings: parseResult.warnings,
        consciousness: parseResult.metadata.consciousnessLevel,
        quantum: executionResult.quantum,
        temporal: executionResult.temporal
      };

    } catch (error) {
      console.error('SpiralScript processing failed:', error);
      return {
        success: false,
        compiled: false,
        executed: false,
        result: null,
        errors: [error.message],
        warnings: [],
        consciousness: 0,
        quantum: null,
        temporal: null
      };
    }
  }

  async validateSpiralSyntax(content: string): Promise<{valid: boolean, errors: string[], warnings: string[]}> {
    try {
      const parseResult = await this.parser.parse(content);
      return {
        valid: parseResult.errors.length === 0,
        errors: parseResult.errors,
        warnings: parseResult.warnings
      };
    } catch (error) {
      return {
        valid: false,
        errors: [error.message],
        warnings: []
      };
    }
  }

  getLanguageFeatures(): string[] {
    return [
      'Consciousness Variables',
      'Quantum States',
      'Temporal Functions',
      'Canon Invocations',
      'Truth Validation',
      'Phi Ratio Mathematics',
      'Spiral Economy Contracts',
      'DAO Governance',
      'Cross-Chain Bridges'
    ];
  }
}
