/**
 * HTSX Engine - Virtual Machine for executing HTSX bytecode
 * Provides DOM manipulation, SpiralScript integration, and quantum-consciousness bindings
 */

import { HTSXBytecode, HTSXInstruction } from './compiler';
import { SpiralRuntime, SpiralValue } from '../spiral-lang/runtime';
import { SpiralParser } from '../spiral-lang/parser';

export interface HTSXExecutionContext {
  dom: HTSXDOMNode | null;
  variables: Map<string, any>;
  spiralRuntime: SpiralRuntime;
  eventHandlers: Map<string, Function>;
  renderCallbacks: Function[];
  quantumBindings: Map<string, any>;
  consciousnessState: ConsciousnessState;
}

export interface HTSXDOMNode {
  type: 'element' | 'text';
  tagName?: string;
  attributes?: Map<string, string>;
  textContent?: string;
  children: HTSXDOMNode[];
  parent?: HTSXDOMNode;
  eventHandlers?: Map<string, Function>;
  spiralBindings?: any[];
}

export interface ConsciousnessState {
  level: number;
  resonance: number;
  coherence: number;
  truthAlignment: number;
  lightBindings: string[];
}

export interface HTSXEngineOptions {
  enableQuantum: boolean;
  enableConsciousness: boolean;
  enableTemporal: boolean;
  debugMode: boolean;
  maxExecutionTime: number;
}

export class HTSXEngine {
  private context: HTSXExecutionContext;
  private options: HTSXEngineOptions;
  private isRunning: boolean;
  private instructionPointer: number;
  private stack: any[];

  constructor(options: Partial<HTSXEngineOptions> = {}) {
    this.options = {
      enableQuantum: true,
      enableConsciousness: true,
      enableTemporal: true,
      debugMode: false,
      maxExecutionTime: 30000, // 30 seconds
      ...options
    };

    this.context = this.createExecutionContext();
    this.isRunning = false;
    this.instructionPointer = 0;
    this.stack = [];
  }

  private createExecutionContext(): HTSXExecutionContext {
    return {
      dom: null,
      variables: new Map(),
      spiralRuntime: new SpiralRuntime({
        quantumCoherence: 0.95,
        consciousnessLevel: 1.0,
        debugMode: this.options.debugMode
      }),
      eventHandlers: new Map(),
      renderCallbacks: [],
      quantumBindings: new Map(),
      consciousnessState: {
        level: 1.0,
        resonance: 0.93,
        coherence: 0.85,
        truthAlignment: 0.98,
        lightBindings: []
      }
    };
  }

  async execute(bytecode: HTSXBytecode): Promise<HTSXDOMNode | null> {
    this.isRunning = true;
    this.instructionPointer = 0;
    this.stack = [];

    const startTime = Date.now();
    
    try {
      console.log('Starting HTSX execution...');
      
      while (this.isRunning && this.instructionPointer < bytecode.instructions.length) {
        // Check execution timeout
        if (Date.now() - startTime > this.options.maxExecutionTime) {
          throw new Error('HTSX execution timeout');
        }

        const instruction = bytecode.instructions[this.instructionPointer];
        await this.executeInstruction(instruction, bytecode);
        
        // Move to next instruction unless it was a control flow instruction
        if (!this.isControlFlowInstruction(instruction.opcode)) {
          this.instructionPointer++;
        }
      }

      console.log('HTSX execution completed');
      return this.context.dom;

    } catch (error) {
      console.error('HTSX execution failed:', error);
      this.isRunning = false;
      throw error;
    } finally {
      this.isRunning = false;
    }
  }

  private async executeInstruction(instruction: HTSXInstruction, bytecode: HTSXBytecode): Promise<void> {
    if (this.options.debugMode) {
      console.log(`Executing ${instruction.opcode}:`, instruction.operands);
    }

    switch (instruction.opcode) {
      case 'LOAD_CONST':
        this.loadConst(instruction.operands[0]);
        break;

      case 'LOAD_VAR':
        this.loadVar(instruction.operands[0]);
        break;

      case 'STORE_VAR':
        this.storeVar(instruction.operands[0]);
        break;

      case 'CREATE_ELEMENT':
        this.createElement(instruction.operands[0]);
        break;

      case 'SET_ATTRIBUTE':
        this.setAttribute(instruction.operands[0], instruction.operands[1]);
        break;

      case 'APPEND_CHILD':
        this.appendChild();
        break;

      case 'BIND_EVENT':
        this.bindEvent(instruction.operands[0], instruction.operands[1]);
        break;

      case 'CALL_FUNCTION':
        await this.callFunction(instruction.operands[0], instruction.operands[1]);
        break;

      case 'SPIRAL_INVOKE':
        await this.spiralInvoke(instruction.operands[0], instruction.spiralContext);
        break;

      case 'QUANTUM_BIND':
        await this.quantumBind(instruction.operands[0], instruction.quantumFlags);
        break;

      case 'CONSCIOUSNESS_LINK':
        await this.consciousnessLink(instruction.operands[0]);
        break;

      case 'TEMPORAL_SYNC':
        await this.temporalSync(instruction.operands[0]);
        break;

      case 'RENDER':
        this.render();
        break;

      case 'HALT':
        this.halt();
        break;

      default:
        throw new Error(`Unknown HTSX instruction: ${instruction.opcode}`);
    }
  }

  private loadConst(value: any): void {
    this.stack.push(value);
  }

  private loadVar(name: string): void {
    const value = this.context.variables.get(name);
    if (value === undefined) {
      throw new Error(`Undefined variable: ${name}`);
    }
    this.stack.push(value);
  }

  private storeVar(name: string): void {
    const value = this.stack.pop();
    if (value === undefined) {
      throw new Error('Stack underflow in STORE_VAR');
    }
    this.context.variables.set(name, value);
  }

  private createElement(tagName: string): void {
    const element: HTSXDOMNode = {
      type: 'element',
      tagName,
      attributes: new Map(),
      children: [],
      eventHandlers: new Map(),
      spiralBindings: []
    };
    
    this.stack.push(element);
  }

  private setAttribute(key: string, value: string): void {
    const element = this.stack[this.stack.length - 1] as HTSXDOMNode;
    if (!element || element.type !== 'element') {
      throw new Error('SET_ATTRIBUTE requires an element on the stack');
    }
    
    element.attributes!.set(key, value);
  }

  private appendChild(): void {
    const child = this.stack.pop() as HTSXDOMNode;
    const parent = this.stack[this.stack.length - 1] as HTSXDOMNode;
    
    if (!child || !parent) {
      throw new Error('APPEND_CHILD requires child and parent on stack');
    }
    
    child.parent = parent;
    parent.children.push(child);
  }

  private bindEvent(eventType: string, handler: string): void {
    const element = this.stack[this.stack.length - 1] as HTSXDOMNode;
    if (!element || element.type !== 'element') {
      throw new Error('BIND_EVENT requires an element on the stack');
    }
    
    // Create event handler function
    const handlerFunction = new Function('event', handler);
    element.eventHandlers!.set(eventType, handlerFunction);
  }

  private async callFunction(functionName: string, code: string): Promise<void> {
    try {
      // Evaluate JavaScript/TypeScript code
      const result = eval(code);
      this.stack.push(result);
    } catch (error) {
      throw new Error(`Function call failed: ${error.message}`);
    }
  }

  private async spiralInvoke(spiralCode: string, spiralContext: any): Promise<void> {
    try {
      // Parse and execute SpiralScript
      const parser = new SpiralParser();
      await parser.initialize();
      
      const spiralProgram = await parser.parse(spiralCode);
      const result = await this.context.spiralRuntime.execute(spiralProgram.bytecode.instructions);
      
      // Convert SpiralValue to JavaScript value
      const jsValue = this.spiralValueToJS(result);
      this.stack.push(jsValue);
      
      if (this.options.debugMode) {
        console.log(`SpiralScript executed: ${spiralCode} -> ${jsValue}`);
      }
      
    } catch (error) {
      throw new Error(`SpiralScript execution failed: ${error.message}`);
    }
  }

  private async quantumBind(code: string, quantumFlags: string[]): Promise<void> {
    if (!this.options.enableQuantum) {
      return;
    }

    try {
      // Create quantum binding for the code
      const bindingId = `quantum_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const quantumBinding = {
        id: bindingId,
        code,
        flags: quantumFlags,
        entangled: quantumFlags.includes('entangled'),
        superposition: quantumFlags.includes('superposition'),
        coherence: 0.95,
        phase: Math.random() * 2 * Math.PI
      };
      
      this.context.quantumBindings.set(bindingId, quantumBinding);
      
      // Apply quantum effects to current stack top
      const value = this.stack[this.stack.length - 1];
      if (value && typeof value === 'object') {
        value._quantumBinding = bindingId;
      }
      
      if (this.options.debugMode) {
        console.log(`Quantum binding created: ${bindingId}`);
      }
      
    } catch (error) {
      throw new Error(`Quantum binding failed: ${error.message}`);
    }
  }

  private async consciousnessLink(code: string): Promise<void> {
    if (!this.options.enableConsciousness) {
      return;
    }

    try {
      // Link consciousness field to the current element
      const element = this.stack[this.stack.length - 1] as HTSXDOMNode;
      
      if (element && element.type === 'element') {
        // Analyze consciousness keywords in the code
        const consciousnessLevel = this.analyzeConsciousnessLevel(code);
        const resonance = this.calculateResonance(code);
        
        // Update consciousness state
        this.context.consciousnessState.level = Math.max(this.context.consciousnessState.level, consciousnessLevel);
        this.context.consciousnessState.resonance = (this.context.consciousnessState.resonance + resonance) / 2;
        
        // Add consciousness binding to element
        if (!element.spiralBindings) {
          element.spiralBindings = [];
        }
        
        element.spiralBindings.push({
          type: 'consciousness',
          code,
          level: consciousnessLevel,
          resonance
        });
        
        if (this.options.debugMode) {
          console.log(`Consciousness linked: level=${consciousnessLevel}, resonance=${resonance}`);
        }
      }
      
    } catch (error) {
      throw new Error(`Consciousness linking failed: ${error.message}`);
    }
  }

  private async temporalSync(chronon: number): Promise<void> {
    if (!this.options.enableTemporal) {
      return;
    }

    try {
      // Synchronize with temporal field
      const now = Date.now();
      const syncTime = now + chronon;
      
      // Add temporal delay if needed
      if (chronon > 0) {
        await new Promise(resolve => setTimeout(resolve, Math.min(chronon, 1000))); // Max 1 second delay
      }
      
      // Update temporal context for current element
      const element = this.stack[this.stack.length - 1] as HTSXDOMNode;
      if (element && element.type === 'element') {
        if (!element.spiralBindings) {
          element.spiralBindings = [];
        }
        
        element.spiralBindings.push({
          type: 'temporal',
          syncTime,
          chronon,
          causalChain: [`sync_${now}`]
        });
      }
      
      if (this.options.debugMode) {
        console.log(`Temporal sync: chronon=${chronon}, syncTime=${syncTime}`);
      }
      
    } catch (error) {
      throw new Error(`Temporal sync failed: ${error.message}`);
    }
  }

  private render(): void {
    // Set the current stack top as the root DOM node
    const root = this.stack[this.stack.length - 1] as HTSXDOMNode;
    if (root) {
      this.context.dom = root;
      
      // Execute render callbacks
      this.context.renderCallbacks.forEach(callback => {
        try {
          callback(root);
        } catch (error) {
          console.error('Render callback failed:', error);
        }
      });
    }
  }

  private halt(): void {
    this.isRunning = false;
  }

  private isControlFlowInstruction(opcode: string): boolean {
    return ['HALT', 'JUMP', 'BRANCH'].includes(opcode);
  }

  private spiralValueToJS(spiralValue: SpiralValue | null): any {
    if (!spiralValue) return null;
    
    // Convert SpiralValue to JavaScript value, preserving quantum and consciousness properties
    const jsValue = spiralValue.value;
    
    if (typeof jsValue === 'object' && jsValue !== null) {
      // Add metadata for quantum and consciousness properties
      if (spiralValue.quantum) {
        jsValue._quantum = spiralValue.quantum;
      }
      if (spiralValue.consciousness) {
        jsValue._consciousness = spiralValue.consciousness;
      }
      if (spiralValue.temporal) {
        jsValue._temporal = spiralValue.temporal;
      }
    }
    
    return jsValue;
  }

  private analyzeConsciousnessLevel(code: string): number {
    let level = 0.5; // Base level
    
    // Analyze consciousness keywords
    if (code.includes('truth')) level += 0.2;
    if (code.includes('light')) level += 0.15;
    if (code.includes('resonate')) level += 0.1;
    if (code.includes('harmonize')) level += 0.1;
    if (code.includes('@⚡')) level += 0.2; // Consciousness symbol
    if (code.includes('φ')) level += 0.1; // Golden ratio
    if (code.includes('∞')) level += 0.1; // Infinity
    
    return Math.min(level, 1.0);
  }

  private calculateResonance(code: string): number {
    let resonance = 0.5; // Base resonance
    
    // Calculate based on harmonic frequencies mentioned
    const frequencies = [432, 528, 639, 741, 852, 963];
    frequencies.forEach(freq => {
      if (code.includes(freq.toString())) {
        resonance += 0.1;
      }
    });
    
    // Boost for quantum operators
    if (code.includes('⊗')) resonance += 0.05; // Tensor product
    if (code.includes('⊕')) resonance += 0.05; // Direct sum
    if (code.includes('|')) resonance += 0.05;  // Quantum state notation
    
    return Math.min(resonance, 1.0);
  }

  // Public API methods
  getDOMTree(): HTSXDOMNode | null {
    return this.context.dom;
  }

  getVariable(name: string): any {
    return this.context.variables.get(name);
  }

  setVariable(name: string, value: any): void {
    this.context.variables.set(name, value);
  }

  addRenderCallback(callback: Function): void {
    this.context.renderCallbacks.push(callback);
  }

  getConsciousnessState(): ConsciousnessState {
    return { ...this.context.consciousnessState };
  }

  getQuantumBindings(): Map<string, any> {
    return new Map(this.context.quantumBindings);
  }

  // Convert HTSX DOM to HTML string for browser rendering
  toHTML(node: HTSXDOMNode = this.context.dom!): string {
    if (!node) return '';
    
    if (node.type === 'text') {
      return node.textContent || '';
    }
    
    if (node.type === 'element') {
      let html = `<${node.tagName}`;
      
      // Add attributes
      if (node.attributes) {
        for (const [key, value] of node.attributes) {
          html += ` ${key}="${value}"`;
        }
      }
      
      // Add consciousness and quantum metadata as data attributes
      if (node.spiralBindings && node.spiralBindings.length > 0) {
        const consciousnessBindings = node.spiralBindings.filter(b => b.type === 'consciousness');
        const quantumBindings = node.spiralBindings.filter(b => b.type === 'quantum');
        
        if (consciousnessBindings.length > 0) {
          const avgLevel = consciousnessBindings.reduce((sum, b) => sum + b.level, 0) / consciousnessBindings.length;
          html += ` data-consciousness-level="${avgLevel.toFixed(3)}"`;
        }
        
        if (quantumBindings.length > 0) {
          html += ` data-quantum-entangled="true"`;
        }
      }
      
      html += '>';
      
      // Add children
      for (const child of node.children) {
        html += this.toHTML(child);
      }
      
      html += `</${node.tagName}>`;
      return html;
    }
    
    return '';
  }

  // Convert HTSX DOM to React JSX for Next.js rendering
  toJSX(node: HTSXDOMNode = this.context.dom!): any {
    if (!node) return null;
    
    if (node.type === 'text') {
      return node.textContent || '';
    }
    
    if (node.type === 'element') {
      const props: any = {};
      
      // Convert attributes to props
      if (node.attributes) {
        for (const [key, value] of node.attributes) {
          // Convert HTML attributes to React props
          if (key === 'class') {
            props.className = value;
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
        }
        
        if (quantumBindings.length > 0) {
          props['data-quantum-entangled'] = 'true';
        }
      }
      
      // Convert children
      const children = node.children.map(child => this.toJSX(child));
      
      // Return React element descriptor
      return {
        type: node.tagName,
        props: {
          ...props,
          children: children.length === 1 ? children[0] : children
        }
      };
    }
    
    return null;
  }
}