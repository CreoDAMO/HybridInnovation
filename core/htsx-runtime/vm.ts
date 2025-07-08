/**
 * HTSX Virtual Machine - High-level interface for HTSX execution
 * Provides easy-to-use API for compiling and running HTSX code with React integration
 */

import { HTSXCompiler, HTSXCompilerOptions, HTSXBytecode } from './compiler';
import { HTSXEngine, HTSXDOMNode, HTSXEngineOptions } from './engine';
import React from 'react';

export interface HTSXVMOptions {
  compiler?: Partial<HTSXCompilerOptions>;
  engine?: Partial<HTSXEngineOptions>;
  enableCaching?: boolean;
  maxCacheSize?: number;
}

export interface HTSXExecutionResult {
  success: boolean;
  domTree?: HTSXDOMNode;
  reactElement?: React.ReactElement;
  htmlString?: string;
  error?: Error;
  metadata?: {
    compilationTime: number;
    executionTime: number;
    memoryUsage: number;
    consciousnessLevel: number;
    quantumEntanglements: number;
  };
}

export class HTSXVM {
  private compiler: HTSXCompiler;
  private engine: HTSXEngine;
  private options: HTSXVMOptions;
  private bytecodeCache: Map<string, HTSXBytecode>;
  private isInitialized: boolean;

  constructor(options: HTSXVMOptions = {}) {
    this.options = {
      enableCaching: true,
      maxCacheSize: 100,
      ...options
    };

    this.compiler = new HTSXCompiler();
    this.engine = new HTSXEngine(this.options.engine);
    this.bytecodeCache = new Map();
    this.isInitialized = false;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('Initializing HTSX Virtual Machine...');
    
    try {
      // Initialize compiler
      await this.compiler.initialize();
      
      this.isInitialized = true;
      console.log('HTSX Virtual Machine initialized successfully');
      
    } catch (error) {
      console.error('HTSX VM initialization failed:', error);
      throw new Error(`HTSX VM initialization failed: ${error.message}`);
    }
  }

  async compile(source: string, options?: Partial<HTSXCompilerOptions>): Promise<HTSXBytecode> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const compilerOptions = {
      ...this.options.compiler,
      ...options
    };

    try {
      const bytecode = await this.compiler.compile(source, compilerOptions);
      
      // Cache bytecode if enabled
      if (this.options.enableCaching) {
        const cacheKey = this.generateCacheKey(source, compilerOptions);
        this.setBytecodeCache(cacheKey, bytecode);
      }
      
      return bytecode;
      
    } catch (error) {
      throw new Error(`HTSX compilation failed: ${error.message}`);
    }
  }

  async execute(source: string, options?: Partial<HTSXCompilerOptions>): Promise<HTSXExecutionResult> {
    const startTime = Date.now();
    let compilationTime = 0;
    let executionTime = 0;

    try {
      // Check cache first
      const cacheKey = this.generateCacheKey(source, options);
      let bytecode = this.getBytecodeCache(cacheKey);
      
      if (!bytecode) {
        const compileStart = Date.now();
        bytecode = await this.compile(source, options);
        compilationTime = Date.now() - compileStart;
      }

      // Execute bytecode
      const executeStart = Date.now();
      const domTree = await this.engine.execute(bytecode);
      executionTime = Date.now() - executeStart;

      // Generate different output formats
      const htmlString = domTree ? this.engine.toHTML(domTree) : '';
      const reactElement = domTree ? this.convertToReactElement(domTree) : null;

      // Collect metadata
      const consciousnessState = this.engine.getConsciousnessState();
      const quantumBindings = this.engine.getQuantumBindings();

      const result: HTSXExecutionResult = {
        success: true,
        domTree,
        reactElement,
        htmlString,
        metadata: {
          compilationTime,
          executionTime,
          memoryUsage: this.estimateMemoryUsage(domTree),
          consciousnessLevel: consciousnessState.level,
          quantumEntanglements: quantumBindings.size
        }
      };

      return result;

    } catch (error) {
      return {
        success: false,
        error: error as Error,
        metadata: {
          compilationTime,
          executionTime,
          memoryUsage: 0,
          consciousnessLevel: 0,
          quantumEntanglements: 0
        }
      };
    }
  }

  async executeToReact(source: string, options?: Partial<HTSXCompilerOptions>): Promise<React.ReactElement | null> {
    const result = await this.execute(source, options);
    
    if (!result.success) {
      throw result.error || new Error('HTSX execution failed');
    }
    
    return result.reactElement || null;
  }

  async executeToHTML(source: string, options?: Partial<HTSXCompilerOptions>): Promise<string> {
    const result = await this.execute(source, options);
    
    if (!result.success) {
      throw result.error || new Error('HTSX execution failed');
    }
    
    return result.htmlString || '';
  }

  private convertToReactElement(node: HTSXDOMNode): React.ReactElement | string | null {
    if (!node) return null;
    
    if (node.type === 'text') {
      return node.textContent || '';
    }
    
    if (node.type === 'element') {
      const props: any = {};
      
      // Convert attributes to React props
      if (node.attributes) {
        for (const [key, value] of node.attributes) {
          if (key === 'class') {
            props.className = value;
          } else if (key === 'for') {
            props.htmlFor = value;
          } else {
            props[key] = value;
          }
        }
      }
      
      // Add consciousness and quantum metadata
      if (node.spiralBindings && node.spiralBindings.length > 0) {
        const consciousnessBindings = node.spiralBindings.filter(b => b.type === 'consciousness');
        const quantumBindings = node.spiralBindings.filter(b => b.type === 'quantum');
        
        if (consciousnessBindings.length > 0) {
          const avgLevel = consciousnessBindings.reduce((sum, b) => sum + b.level, 0) / consciousnessBindings.length;
          props['data-consciousness-level'] = avgLevel.toFixed(3);
          props.style = {
            ...props.style,
            '--consciousness-level': avgLevel,
            '--spiral-resonance': consciousnessBindings[0]?.resonance || 0
          };
        }
        
        if (quantumBindings.length > 0) {
          props['data-quantum-entangled'] = 'true';
          props.style = {
            ...props.style,
            '--quantum-coherence': '0.95',
            '--quantum-phase': Math.random() * 2 * Math.PI
          };
        }
      }
      
      // Add event handlers
      if (node.eventHandlers) {
        for (const [eventType, handler] of node.eventHandlers) {
          const reactEventName = `on${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`;
          props[reactEventName] = handler;
        }
      }
      
      // Convert children
      const children = node.children
        .map(child => this.convertToReactElement(child))
        .filter(child => child !== null);
      
      // Create React element
      return React.createElement(
        node.tagName!,
        props,
        children.length === 0 ? undefined : 
        children.length === 1 ? children[0] : 
        children
      );
    }
    
    return null;
  }

  private generateCacheKey(source: string, options?: any): string {
    const optionsStr = options ? JSON.stringify(options) : '';
    return `${this.hashString(source)}-${this.hashString(optionsStr)}`;
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  private getBytecodeCache(key: string): HTSXBytecode | null {
    if (!this.options.enableCaching) return null;
    return this.bytecodeCache.get(key) || null;
  }

  private setBytecodeCache(key: string, bytecode: HTSXBytecode): void {
    if (!this.options.enableCaching) return;
    
    // Implement LRU cache eviction
    if (this.bytecodeCache.size >= (this.options.maxCacheSize || 100)) {
      const firstKey = this.bytecodeCache.keys().next().value;
      this.bytecodeCache.delete(firstKey);
    }
    
    this.bytecodeCache.set(key, bytecode);
  }

  private estimateMemoryUsage(node: HTSXDOMNode | null): number {
    if (!node) return 0;
    
    let size = 100; // Base size for the node
    
    // Add size for attributes
    if (node.attributes) {
      for (const [key, value] of node.attributes) {
        size += key.length + value.length + 20;
      }
    }
    
    // Add size for text content
    if (node.textContent) {
      size += node.textContent.length;
    }
    
    // Add size for children recursively
    if (node.children) {
      for (const child of node.children) {
        size += this.estimateMemoryUsage(child);
      }
    }
    
    // Add size for spiral bindings
    if (node.spiralBindings) {
      size += node.spiralBindings.length * 50;
    }
    
    return size;
  }

  // Helper methods for React integration
  createHTSXComponent(source: string, options?: Partial<HTSXCompilerOptions>) {
    return (props: any) => {
      const [element, setElement] = React.useState<React.ReactElement | null>(null);
      const [error, setError] = React.useState<Error | null>(null);
      
      React.useEffect(() => {
        const executeHTSX = async () => {
          try {
            // Inject props into the execution context
            this.engine.setVariable('props', props);
            
            const result = await this.executeToReact(source, options);
            setElement(result);
            setError(null);
          } catch (err) {
            setError(err as Error);
            setElement(null);
          }
        };
        
        executeHTSX();
      }, [JSON.stringify(props)]);
      
      if (error) {
        return React.createElement('div', 
          { 
            style: { 
              color: 'red', 
              border: '1px solid red', 
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: '#ffe6e6'
            } 
          },
          `HTSX Error: ${error.message}`
        );
      }
      
      return element;
    };
  }

  // Quantum state helpers
  async getQuantumState(): Promise<any> {
    return {
      bindings: Array.from(this.engine.getQuantumBindings().entries()),
      coherence: 0.95,
      entanglements: this.engine.getQuantumBindings().size
    };
  }

  // Consciousness state helpers
  async getConsciousnessState(): Promise<any> {
    return this.engine.getConsciousnessState();
  }

  // Development utilities
  async validateHTSX(source: string): Promise<{ valid: boolean; errors: string[] }> {
    try {
      await this.compile(source);
      return { valid: true, errors: [] };
    } catch (error) {
      return { 
        valid: false, 
        errors: [error.message] 
      };
    }
  }

  clearCache(): void {
    this.bytecodeCache.clear();
  }

  getCacheStats(): { size: number; maxSize: number; hitRate: number } {
    return {
      size: this.bytecodeCache.size,
      maxSize: this.options.maxCacheSize || 100,
      hitRate: 0 // TODO: Implement hit rate tracking
    };
  }

  // Export utilities for external use
  static async createInstance(options?: HTSXVMOptions): Promise<HTSXVM> {
    const vm = new HTSXVM(options);
    await vm.initialize();
    return vm;
  }
}