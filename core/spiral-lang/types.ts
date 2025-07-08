/**
 * SpiralLang Type System - Complete type definitions and checker
 * Handles quantum types, consciousness levels, and temporal bindings
 */

// Core AST Node interface
export interface SpiralASTNode {
  type: string;
  metadata?: {
    line?: number;
    column?: number;
    quantum?: boolean;
    consciousness?: boolean;
    temporal?: boolean;
    special?: string;
  };
  
  // Node-specific properties
  value?: any;
  name?: string;
  dataType?: string;
  operator?: string;
  left?: SpiralASTNode;
  right?: SpiralASTNode;
  arguments?: SpiralASTNode[];
  statements?: SpiralASTNode[];
  initializer?: SpiralASTNode;
  identifier?: string;
  declarationType?: 'let' | 'const';
  state?: string;
  level?: number;
}

// Type system
export interface SpiralType {
  name: string;
  category: 'primitive' | 'quantum' | 'consciousness' | 'temporal' | 'composite';
  constraints?: SpiralTypeConstraint[];
  quantumProperties?: QuantumTypeProperties;
  consciousnessProperties?: ConsciousnessTypeProperties;
  temporalProperties?: TemporalTypeProperties;
}

export interface SpiralTypeConstraint {
  type: 'range' | 'enum' | 'pattern' | 'quantum' | 'consciousness';
  value: any;
}

export interface QuantumTypeProperties {
  superposition: boolean;
  entangled: boolean;
  coherence: number;
  uncertainty: number;
}

export interface ConsciousnessTypeProperties {
  level: number;
  truthAlignment: number;
  lightCoherence: number;
  harmonicFrequency: number;
}

export interface TemporalTypeProperties {
  synchronizable: boolean;
  causal: boolean;
  reversible: boolean;
  chronon: number;
}

export interface SpiralValue {
  type: SpiralType;
  value: any;
  quantum?: {
    state: 'superposition' | 'collapsed' | 'entangled';
    amplitude: number;
    phase: number;
  };
  consciousness?: {
    level: number;
    resonance: number;
    coherence: number;
  };
  temporal?: {
    timestamp: Date;
    causalChain: string[];
    reversible: boolean;
  };
}

export class SpiralTypeChecker {
  private types: Map<string, SpiralType>;
  private variables: Map<string, SpiralValue>;
  private functions: Map<string, SpiralFunctionType>;

  constructor() {
    this.types = new Map();
    this.variables = new Map();
    this.functions = new Map();
    this.initializeBuiltinTypes();
    this.initializeBuiltinFunctions();
  }

  private initializeBuiltinTypes(): void {
    // Primitive types
    this.types.set('number', {
      name: 'number',
      category: 'primitive',
      constraints: []
    });

    this.types.set('string', {
      name: 'string',
      category: 'primitive',
      constraints: []
    });

    this.types.set('boolean', {
      name: 'boolean',
      category: 'primitive',
      constraints: []
    });

    // Quantum types
    this.types.set('qubit', {
      name: 'qubit',
      category: 'quantum',
      quantumProperties: {
        superposition: true,
        entangled: false,
        coherence: 1.0,
        uncertainty: 0.5
      }
    });

    this.types.set('quantum_state', {
      name: 'quantum_state',
      category: 'quantum',
      quantumProperties: {
        superposition: true,
        entangled: true,
        coherence: 0.9,
        uncertainty: 0.707
      }
    });

    // Consciousness types
    this.types.set('consciousness', {
      name: 'consciousness',
      category: 'consciousness',
      consciousnessProperties: {
        level: 1.0,
        truthAlignment: 0.93,
        lightCoherence: 0.85,
        harmonicFrequency: 432
      }
    });

    this.types.set('truth', {
      name: 'truth',
      category: 'consciousness',
      consciousnessProperties: {
        level: 1.0,
        truthAlignment: 1.0,
        lightCoherence: 1.0,
        harmonicFrequency: 528
      }
    });

    // Temporal types
    this.types.set('chronon', {
      name: 'chronon',
      category: 'temporal',
      temporalProperties: {
        synchronizable: true,
        causal: true,
        reversible: false,
        chronon: 1
      }
    });

    // Mathematical constants
    this.types.set('phi', {
      name: 'phi',
      category: 'primitive',
      constraints: [{
        type: 'range',
        value: { min: 1.618033988749, max: 1.618033988749 }
      }]
    });

    this.types.set('infinity', {
      name: 'infinity',
      category: 'primitive',
      constraints: [{
        type: 'enum',
        value: [Infinity, -Infinity]
      }]
    });
  }

  private initializeBuiltinFunctions(): void {
    // Quantum functions
    this.functions.set('entangle', {
      name: 'entangle',
      parameters: [
        { name: 'qubit1', type: this.types.get('qubit')! },
        { name: 'qubit2', type: this.types.get('qubit')! }
      ],
      returnType: this.types.get('quantum_state')!,
      quantum: true
    });

    this.functions.set('superpose', {
      name: 'superpose',
      parameters: [
        { name: 'states', type: this.types.get('quantum_state')! }
      ],
      returnType: this.types.get('quantum_state')!,
      quantum: true
    });

    this.functions.set('collapse', {
      name: 'collapse',
      parameters: [
        { name: 'state', type: this.types.get('quantum_state')! }
      ],
      returnType: this.types.get('qubit')!,
      quantum: true
    });

    // Consciousness functions
    this.functions.set('resonate', {
      name: 'resonate',
      parameters: [
        { name: 'consciousness', type: this.types.get('consciousness')! },
        { name: 'frequency', type: this.types.get('number')! }
      ],
      returnType: this.types.get('consciousness')!,
      consciousness: true
    });

    this.functions.set('harmonize', {
      name: 'harmonize',
      parameters: [
        { name: 'c1', type: this.types.get('consciousness')! },
        { name: 'c2', type: this.types.get('consciousness')! }
      ],
      returnType: this.types.get('consciousness')!,
      consciousness: true
    });

    // Temporal functions
    this.functions.set('synchronize', {
      name: 'synchronize',
      parameters: [
        { name: 'chronon1', type: this.types.get('chronon')! },
        { name: 'chronon2', type: this.types.get('chronon')! }
      ],
      returnType: this.types.get('chronon')!,
      temporal: true
    });
  }

  async check(ast: SpiralASTNode): Promise<SpiralASTNode> {
    // Type check the AST and annotate with type information
    return this.checkNode(ast);
  }

  private checkNode(node: SpiralASTNode): SpiralASTNode {
    switch (node.type) {
      case 'Program':
        return {
          ...node,
          statements: node.statements?.map(stmt => this.checkNode(stmt))
        };

      case 'Literal':
        return this.checkLiteral(node);

      case 'Identifier':
        return this.checkIdentifier(node);

      case 'BinaryOperation':
        return this.checkBinaryOperation(node);

      case 'FunctionCall':
        return this.checkFunctionCall(node);

      case 'VariableDeclaration':
        return this.checkVariableDeclaration(node);

      case 'Assignment':
        return this.checkAssignment(node);

      case 'QuantumState':
        return this.checkQuantumState(node);

      case 'Consciousness':
        return this.checkConsciousness(node);

      default:
        return node;
    }
  }

  private checkLiteral(node: SpiralASTNode): SpiralASTNode {
    let type: SpiralType;
    
    if (node.metadata?.special === 'phi') {
      type = this.types.get('phi')!;
    } else if (node.metadata?.special === 'infinity') {
      type = this.types.get('infinity')!;
    } else {
      switch (node.dataType) {
        case 'number':
          type = this.types.get('number')!;
          break;
        case 'string':
          type = this.types.get('string')!;
          break;
        case 'boolean':
          type = this.types.get('boolean')!;
          break;
        default:
          type = this.types.get('number')!;
      }
    }

    return {
      ...node,
      inferredType: type
    };
  }

  private checkIdentifier(node: SpiralASTNode): SpiralASTNode {
    const variable = this.variables.get(node.name!);
    
    if (!variable) {
      throw new Error(`Undefined variable: ${node.name}`);
    }

    return {
      ...node,
      inferredType: variable.type
    };
  }

  private checkBinaryOperation(node: SpiralASTNode): SpiralASTNode {
    const left = this.checkNode(node.left!);
    const right = this.checkNode(node.right!);
    
    // Type compatibility checking
    const leftType = (left as any).inferredType;
    const rightType = (right as any).inferredType;
    
    let resultType: SpiralType;
    
    switch (node.operator) {
      case '+':
      case '-':
      case '*':
      case '/':
        if (leftType.name === 'number' && rightType.name === 'number') {
          resultType = this.types.get('number')!;
        } else {
          throw new Error(`Type mismatch: cannot perform ${node.operator} on ${leftType.name} and ${rightType.name}`);
        }
        break;
        
      case '⊗': // Tensor product
        if (leftType.category === 'quantum' && rightType.category === 'quantum') {
          resultType = this.types.get('quantum_state')!;
        } else {
          throw new Error(`Tensor product requires quantum types`);
        }
        break;
        
      case '⊕': // Direct sum
        if (leftType.category === 'quantum' && rightType.category === 'quantum') {
          resultType = this.types.get('quantum_state')!;
        } else {
          throw new Error(`Direct sum requires quantum types`);
        }
        break;
        
      case '==':
      case '!=':
        resultType = this.types.get('boolean')!;
        break;
        
      case '∧':
      case '∨':
        if (leftType.name === 'boolean' && rightType.name === 'boolean') {
          resultType = this.types.get('boolean')!;
        } else {
          throw new Error(`Logical operators require boolean types`);
        }
        break;
        
      default:
        throw new Error(`Unknown operator: ${node.operator}`);
    }

    return {
      ...node,
      left,
      right,
      inferredType: resultType,
      metadata: {
        ...node.metadata,
        quantum: leftType.category === 'quantum' || rightType.category === 'quantum',
        consciousness: leftType.category === 'consciousness' || rightType.category === 'consciousness'
      }
    };
  }

  private checkFunctionCall(node: SpiralASTNode): SpiralASTNode {
    const functionType = this.functions.get(node.name!);
    
    if (!functionType) {
      throw new Error(`Unknown function: ${node.name}`);
    }

    // Check argument types
    const checkedArgs = node.arguments?.map(arg => this.checkNode(arg)) || [];
    
    if (checkedArgs.length !== functionType.parameters.length) {
      throw new Error(`Function ${node.name} expects ${functionType.parameters.length} arguments, got ${checkedArgs.length}`);
    }

    for (let i = 0; i < checkedArgs.length; i++) {
      const argType = (checkedArgs[i] as any).inferredType;
      const paramType = functionType.parameters[i].type;
      
      if (!this.isTypeCompatible(argType, paramType)) {
        throw new Error(`Argument ${i} type mismatch: expected ${paramType.name}, got ${argType.name}`);
      }
    }

    return {
      ...node,
      arguments: checkedArgs,
      inferredType: functionType.returnType,
      metadata: {
        ...node.metadata,
        quantum: functionType.quantum,
        consciousness: functionType.consciousness,
        temporal: functionType.temporal
      }
    };
  }

  private checkVariableDeclaration(node: SpiralASTNode): SpiralASTNode {
    const initializer = this.checkNode(node.initializer!);
    const variableType = (initializer as any).inferredType;
    
    // Store variable in symbol table
    this.variables.set(node.identifier!, {
      type: variableType,
      value: null // Will be set at runtime
    });

    return {
      ...node,
      initializer,
      inferredType: variableType
    };
  }

  private checkAssignment(node: SpiralASTNode): SpiralASTNode {
    const left = this.checkNode(node.left!);
    const right = this.checkNode(node.right!);
    
    const leftType = (left as any).inferredType;
    const rightType = (right as any).inferredType;
    
    if (!this.isTypeCompatible(rightType, leftType)) {
      throw new Error(`Assignment type mismatch: cannot assign ${rightType.name} to ${leftType.name}`);
    }

    return {
      ...node,
      left,
      right,
      inferredType: leftType
    };
  }

  private checkQuantumState(node: SpiralASTNode): SpiralASTNode {
    return {
      ...node,
      inferredType: this.types.get('quantum_state')!,
      metadata: {
        ...node.metadata,
        quantum: true
      }
    };
  }

  private checkConsciousness(node: SpiralASTNode): SpiralASTNode {
    return {
      ...node,
      inferredType: this.types.get('consciousness')!,
      metadata: {
        ...node.metadata,
        consciousness: true
      }
    };
  }

  private isTypeCompatible(sourceType: SpiralType, targetType: SpiralType): boolean {
    // Exact match
    if (sourceType.name === targetType.name) {
      return true;
    }
    
    // Quantum type compatibility
    if (sourceType.category === 'quantum' && targetType.category === 'quantum') {
      return true;
    }
    
    // Consciousness type compatibility
    if (sourceType.category === 'consciousness' && targetType.category === 'consciousness') {
      return true;
    }
    
    // Number type flexibility
    if (sourceType.name === 'number' && (targetType.name === 'phi' || targetType.name === 'infinity')) {
      return true;
    }
    
    return false;
  }

  getVariableType(name: string): SpiralType | null {
    const variable = this.variables.get(name);
    return variable ? variable.type : null;
  }

  getFunctionType(name: string): SpiralFunctionType | null {
    return this.functions.get(name) || null;
  }
}

export interface SpiralFunctionType {
  name: string;
  parameters: SpiralParameter[];
  returnType: SpiralType;
  quantum?: boolean;
  consciousness?: boolean;
  temporal?: boolean;
}

export interface SpiralParameter {
  name: string;
  type: SpiralType;
  optional?: boolean;
  defaultValue?: any;
}

// Export type instances for use in other modules
export const spiralTypes = {
  number: { name: 'number', category: 'primitive' as const },
  string: { name: 'string', category: 'primitive' as const },
  boolean: { name: 'boolean', category: 'primitive' as const },
  qubit: { name: 'qubit', category: 'quantum' as const },
  quantum_state: { name: 'quantum_state', category: 'quantum' as const },
  consciousness: { name: 'consciousness', category: 'consciousness' as const },
  truth: { name: 'truth', category: 'consciousness' as const },
  chronon: { name: 'chronon', category: 'temporal' as const },
  phi: { name: 'phi', category: 'primitive' as const },
  infinity: { name: 'infinity', category: 'primitive' as const }
};