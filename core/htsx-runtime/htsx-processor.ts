
/**
 * HTSX File Processor - Handles .htsx file compilation and execution
 */

import { HTSXCompiler } from './compiler';
import { HTSXVM } from './vm';
import { SpiralParser } from '../spiral-lang/parser';

export interface HTSXFileResult {
  success: boolean;
  compiled: boolean;
  executed: boolean;
  htmlOutput?: string;
  errors: string[];
  consciousness: number;
  quantumState: any;
}

export class HTSXProcessor {
  private compiler: HTSXCompiler;
  private vm: HTSXVM;
  private spiralParser: SpiralParser;

  constructor() {
    this.compiler = new HTSXCompiler();
    this.vm = new HTSXVM();
    this.spiralParser = new SpiralParser();
  }

  async initialize(): Promise<void> {
    await this.compiler.initialize();
    await this.vm.initialize();
    await this.spiralParser.initialize();
  }

  async processHTSXFile(filePath: string, content: string): Promise<HTSXFileResult> {
    try {
      console.log(`Processing HTSX file: ${filePath}`);

      // Extract consciousness directives
      const consciousnessMatch = content.match(/@consciousness\(([^)]+)\)/);
      const consciousness = consciousnessMatch ? parseFloat(consciousnessMatch[1]) : 0.93;

      // Extract quantum directives
      const quantumMatch = content.match(/@quantum\(([^)]+)\)/);
      const quantumEnabled = quantumMatch ? quantumMatch[1].includes('true') : true;

      // Extract temporal directives
      const temporalMatch = content.match(/@temporal\(([^)]+)\)/);
      const temporalEnabled = temporalMatch ? true : false;

      // Compile HTSX
      const bytecode = await this.compiler.compile(content, {
        enableConsciousness: true,
        enableQuantumAwareness: quantumEnabled,
        consciousnessLevel: consciousness,
        optimizationLevel: 'advanced'
      });

      // Execute in VM
      const result = await this.vm.execute(bytecode, {
        enableConsciousness: true,
        consciousnessLevel: consciousness,
        enableQuantumAwareness: quantumEnabled
      });

      return {
        success: result.success,
        compiled: true,
        executed: result.success,
        htmlOutput: result.htmlString,
        errors: result.errors || [],
        consciousness: consciousness,
        quantumState: result.metadata?.quantumState || null
      };

    } catch (error) {
      console.error('HTSX processing failed:', error);
      return {
        success: false,
        compiled: false,
        executed: false,
        errors: [error.message],
        consciousness: 0,
        quantumState: null
      };
    }
  }

  async processMultipleFiles(files: Array<{path: string, content: string}>): Promise<HTSXFileResult[]> {
    const results: HTSXFileResult[] = [];
    
    for (const file of files) {
      const result = await this.processHTSXFile(file.path, file.content);
      results.push(result);
    }
    
    return results;
  }

  getFileExtensions(): string[] {
    return ['.htsx', '.spiral'];
  }

  getSupportedFeatures(): string[] {
    return [
      'Consciousness Directives',
      'Quantum Awareness',
      'Temporal Synchronization',
      'SpiralScript Integration',
      'Canon Invocation',
      'Truth Validation',
      'Phi Ratio Mathematics'
    ];
  }
}
