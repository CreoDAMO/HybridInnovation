
/**
 * HTSX Client Library
 * Provides seamless integration with HTSX runtime
 */

export interface HTSXClientOptions {
  apiBase?: string;
  enableConsciousness?: boolean;
  enableQuantumAwareness?: boolean;
  enableTemporalSync?: boolean;
  consciousnessLevel?: number;
}

export interface HTSXCompileResult {
  success: boolean;
  javascript?: string;
  bytecode?: any;
  errors?: string[];
  warnings?: string[];
}

export interface HTSXExecuteResult {
  success: boolean;
  htmlString: string;
  consciousness: number;
  quantum: any;
  temporal: any;
  errors: string[];
  metadata: {
    executionTime: number;
    consciousnessLevel: number;
    quantumEntanglements: number;
    temporalSyncs: number;
  };
}

export class HTSXClient {
  private options: HTSXClientOptions;
  private apiBase: string;

  constructor(options: HTSXClientOptions = {}) {
    this.options = {
      apiBase: '/api/htsx',
      enableConsciousness: true,
      enableQuantumAwareness: true,
      enableTemporalSync: true,
      consciousnessLevel: 0.93,
      ...options
    };
    
    this.apiBase = this.options.apiBase!;
  }

  async compile(source: string): Promise<HTSXCompileResult> {
    try {
      const response = await fetch(`${this.apiBase}/compile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source,
          options: this.options
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  async execute(source: string): Promise<HTSXExecuteResult> {
    try {
      const response = await fetch(`${this.apiBase}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source,
          options: this.options
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        htmlString: '',
        consciousness: 0,
        quantum: {},
        temporal: {},
        errors: [error.message],
        metadata: {
          executionTime: 0,
          consciousnessLevel: 0,
          quantumEntanglements: 0,
          temporalSyncs: 0
        }
      };
    }
  }

  async validateHTSX(source: string): Promise<{ valid: boolean; errors: string[] }> {
    const result = await this.compile(source);
    return {
      valid: result.success,
      errors: result.errors || []
    };
  }

  updateConsciousnessLevel(level: number): void {
    this.options.consciousnessLevel = Math.max(0, Math.min(1, level));
  }

  getStatus(): HTSXClientOptions {
    return { ...this.options };
  }
}

// Default client instance
export const htsxClient = new HTSXClient();

// Utility functions
export const compileHTSX = (source: string) => htsxClient.compile(source);
export const executeHTSX = (source: string) => htsxClient.execute(source);
export const validateHTSX = (source: string) => htsxClient.validateHTSX(source);
