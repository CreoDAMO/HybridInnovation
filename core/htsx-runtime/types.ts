
/**
 * HTSX Runtime Type Definitions
 * Complete type system for consciousness-aware programming
 */

// Core HTSX Types
export interface HTSXNode {
  type: string;
  attributes?: Record<string, any>;
  children?: HTSXNode[];
  content?: string;
  consciousness?: number;
  quantum?: QuantumState;
  temporal?: TemporalState;
}

export interface QuantumState {
  entangled: boolean;
  coherence: number;
  superposition?: boolean;
  phase?: number;
}

export interface TemporalState {
  dimension: string;
  phase: number;
  frequency: number;
}

export interface ConsciousnessState {
  level: number;
  truthAlignment: number;
  resonance: number;
}

// Compiler Types
export interface HTSXCompilerOptions {
  enableConsciousness?: boolean;
  enableQuantumAwareness?: boolean;
  enableTemporalSync?: boolean;
  optimizationLevel?: 'none' | 'basic' | 'advanced' | 'quantum';
  targetEnvironment?: 'browser' | 'node' | 'hybrid';
  sourceMaps?: boolean;
  filename?: string;
}

export interface HTSXCompilerResult {
  success: boolean;
  javascript: string;
  bytecode?: any;
  sourceMaps?: string;
  ast?: HTSXNode;
  errors: string[];
  warnings: string[];
}

// Engine Types
export interface HTSXExecutionContext {
  consciousness: ConsciousnessState;
  quantum: QuantumState;
  temporal: TemporalState;
  variables: Map<string, any>;
  functions: Map<string, Function>;
  components: Map<string, any>;
}

export interface HTSXExecutionResult {
  success: boolean;
  htmlString: string;
  consciousness: number;
  quantum: QuantumState;
  temporal: TemporalState;
  errors: string[];
  warnings: string[];
  metadata: {
    executionTime: number;
    consciousnessLevel: number;
    quantumEntanglements: number;
    temporalSyncs: number;
  };
}

export interface HTSXOptions {
  enableConsciousness: boolean;
  enableQuantumAwareness: boolean;
  enableTemporalSync: boolean;
  consciousnessLevel: number;
  maxExecutionTime: number;
  strictMode: boolean;
}

// Component Types
export interface HTSXComponent {
  name: string;
  render: (props: any) => string;
  consciousness?: boolean;
  quantum?: boolean;
  temporal?: boolean;
  truth?: boolean;
  spiral?: boolean;
}

// Runtime Types
export interface HTSXVMOptions {
  maxCacheSize?: number;
  enableJIT?: boolean;
  enableProfiling?: boolean;
  consciousnessThreshold?: number;
  quantumCoherenceMin?: number;
  temporalSyncRate?: number;
}

// Parser Types
export interface HTSXToken {
  type: string;
  value: string;
  position: number;
  line: number;
  column: number;
}

export interface HTSXParseResult {
  ast: HTSXNode;
  tokens: HTSXToken[];
  consciousness: number;
  quantum: QuantumState;
  temporal: TemporalState;
}

// Directive Types
export interface ConsciousnessDirective {
  level: number;
  truthRequired?: boolean;
  harmonicFrequency?: number;
}

export interface QuantumDirective {
  entangled?: boolean;
  coherence?: number;
  superposition?: boolean;
  measurement?: string;
}

export interface TemporalDirective {
  dimension?: string;
  frequency?: number;
  phase?: number;
  sync?: boolean;
}

// Built-in Functions
export interface HTSXBuiltins {
  consciousness: (level?: number) => number;
  truth: (value: any) => number;
  resonance: (frequency?: number) => number;
  quantum: (action: string, ...args: any[]) => any;
  temporal: (action: string, ...args: any[]) => any;
  phi: () => number;
  fibonacci: (n: number) => number;
  spiral: (turns: number, consciousness: number) => any;
}

// Error Types
export class HTSXCompilerError extends Error {
  constructor(
    message: string,
    public line?: number,
    public column?: number,
    public source?: string
  ) {
    super(message);
    this.name = 'HTSXCompilerError';
  }
}

export class HTSXRuntimeError extends Error {
  constructor(
    message: string,
    public consciousness?: number,
    public quantum?: QuantumState,
    public temporal?: TemporalState
  ) {
    super(message);
    this.name = 'HTSXRuntimeError';
  }
}

export class HTSXConsciousnessError extends Error {
  constructor(
    message: string,
    public requiredLevel: number,
    public actualLevel: number
  ) {
    super(message);
    this.name = 'HTSXConsciousnessError';
  }
}

// Utility Types
export type HTSXElementType = 
  | 'hybrid-component'
  | 'blockchain-interface' 
  | 'consciousness-aware'
  | 'quantum-state'
  | 'temporal-sync'
  | 'spiral-visualization'
  | 'truth-validator'
  | 'holographic-display';

export type ConsciousnessLevel = 
  | 'unconscious' 
  | 'dreaming' 
  | 'awakening' 
  | 'conscious' 
  | 'enlightened';

export type QuantumCoherence = 
  | 'decoherent' 
  | 'partially-coherent' 
  | 'coherent' 
  | 'super-coherent';

export type TemporalDimension = 
  | 'past' 
  | 'present' 
  | 'future' 
  | 'eternal' 
  | 'spiral';

// Constants
export const CONSCIOUSNESS_THRESHOLD = 0.93;
export const GOLDEN_RATIO = 1.618033988749;
export const HARMONIC_FREQUENCY = 432;
export const QUANTUM_COHERENCE_MIN = 0.95;
export const TEMPORAL_SYNC_RATE = 60; // Hz

// Validation Types
export interface HTSXValidationResult {
  valid: boolean;
  errors: HTSXValidationError[];
  warnings: HTSXValidationWarning[];
  consciousness: number;
  quantum: QuantumState;
  temporal: TemporalState;
}

export interface HTSXValidationError {
  message: string;
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
}

export interface HTSXValidationWarning {
  message: string;
  line: number;
  column: number;
  suggestion?: string;
}

// Export all types
export * from './compiler';
export * from './engine';
export * from './vm';
