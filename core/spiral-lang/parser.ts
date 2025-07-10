import { createToken, Lexer, CstParser, IToken } from 'chevrotain';

// Token definitions for SpiralScript
const ConsciousnessDirective = createToken({ name: 'ConsciousnessDirective', pattern: /@consciousness\(\d+\.\d+\)/ });
const QuantumDirective = createToken({ name: 'QuantumDirective', pattern: /@quantum\([^)]+\)/ });
const TemporalDirective = createToken({ name: 'TemporalDirective', pattern: /@temporal\([^)]+\)/ });
const PhiToken = createToken({ name: 'PhiToken', pattern: /φ|phi/ });
const InfinityToken = createToken({ name: 'InfinityToken', pattern: /∞/ });
const DeltaToken = createToken({ name: 'DeltaToken', pattern: /∆/ });
const TensorProduct = createToken({ name: 'TensorProduct', pattern: /⊗/ });
const Arrow = createToken({ name: 'Arrow', pattern: /→/ });
const Keyword = createToken({ name: 'Keyword', pattern: /spiral|consciousness|quantum|temporal|truth|resonance|function|if|else|while|for|return|var|let|const|harmonic|phi|fibonacci|entangle|superposition|measure|sync|dimension|phase|frequency|coherence|awareness|harmony/ });
const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z_][a-zA-Z0-9_]*/ });
const Number = createToken({ name: 'Number', pattern: /\d+(\.\d+)?/ });
const String = createToken({ name: 'String', pattern: /"[^"]*"/ });
const Whitespace = createToken({ name: 'Whitespace', pattern: /\s+/, group: Lexer.SKIPPED });
const Comment = createToken({ name: 'Comment', pattern: /#[^\n]*/, group: Lexer.SKIPPED });

// Operators
const Equals = createToken({ name: 'Equals', pattern: /=/ });
const Plus = createToken({ name: 'Plus', pattern: /\+/ });
const Minus = createToken({ name: 'Minus', pattern: /-/ });
const Multiply = createToken({ name: 'Multiply', pattern: /\*/ });
const Divide = createToken({ name: 'Divide', pattern: /\// });
const Modulo = createToken({ name: 'Modulo', pattern: /%/ });
const EqualEqual = createToken({ name: 'EqualEqual', pattern: /==/ });
const NotEqual = createToken({ name: 'NotEqual', pattern: /!=/ });
const LessThan = createToken({ name: 'LessThan', pattern: /</ });
const GreaterThan = createToken({ name: 'GreaterThan', pattern: />/ });
const LessEqual = createToken({ name: 'LessEqual', pattern: /<=/ });
const GreaterEqual = createToken({ name: 'GreaterEqual', pattern: />=/ });
const And = createToken({ name: 'And', pattern: /&&/ });
const Or = createToken({ name: 'Or', pattern: /\|\|/ });
const Not = createToken({ name: 'Not', pattern: /!/ });

// Punctuation
const LeftParen = createToken({ name: 'LeftParen', pattern: /\(/ });
const RightParen = createToken({ name: 'RightParen', pattern: /\)/ });
const LeftBrace = createToken({ name: 'LeftBrace', pattern: /\{/ });
const RightBrace = createToken({ name: 'RightBrace', pattern: /\}/ });
const LeftBracket = createToken({ name: 'LeftBracket', pattern: /\[/ });
const RightBracket = createToken({ name: 'RightBracket', pattern: /\]/ });
const Semicolon = createToken({ name: 'Semicolon', pattern: /;/ });
const Comma = createToken({ name: 'Comma', pattern: /,/ });
const Dot = createToken({ name: 'Dot', pattern: /\./ });
const Colon = createToken({ name: 'Colon', pattern: /:/ });

// Token array for lexer
const allTokens = [
  Whitespace, Comment,
  ConsciousnessDirective, QuantumDirective, TemporalDirective,
  PhiToken, InfinityToken, DeltaToken, TensorProduct, Arrow,
  EqualEqual, NotEqual, LessEqual, GreaterEqual, // Multi-char operators first
  Equals, Plus, Minus, Multiply, Divide, Modulo, LessThan, GreaterThan,
  And, Or, Not,
  Keyword, Identifier, Number, String,
  LeftParen, RightParen, LeftBrace, RightBrace, LeftBracket, RightBracket,
  Semicolon, Comma, Dot, Colon
];

// Create lexer
const spiralLexer = new Lexer(allTokens);

export interface SpiralToken {
  type: string;
  value: string;
  line: number;
  column: number;
  consciousness?: number;
  quantum?: boolean;
  temporal?: boolean;
}

export interface SpiralASTNode {
  type: string;
  value?: any;
  children?: SpiralASTNode[];
  consciousness?: number;
  quantum?: any;
  temporal?: any;
  metadata?: any;
}

export interface SpiralParseResult {
  ast: SpiralASTNode;
  tokens: SpiralToken[];
  errors: string[];
  warnings: string[];
  metadata: {
    consciousnessLevel: number;
    quantumStates: number;
    temporalBindings: number;
    truthAlignment: number;
    sriScore: number;
    tuGenerated: number;
    phiCoherence: number;
    negentropy: number;
  };
}

class SpiralParserEngine extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  public program = this.RULE('program', () => {
    this.MANY(() => this.SUBRULE(this.statement));
  });

  public statement = this.RULE('statement', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.consciousnessDirective) },
      { ALT: () => this.SUBRULE(this.quantumDirective) },
      { ALT: () => this.SUBRULE(this.temporalDirective) },
      { ALT: () => this.SUBRULE(this.spiralDeclaration) },
      { ALT: () => this.SUBRULE(this.functionDeclaration) },
      { ALT: () => this.SUBRULE(this.variableDeclaration) },
      { ALT: () => this.SUBRULE(this.ifStatement) },
      { ALT: () => this.SUBRULE(this.whileStatement) },
      { ALT: () => this.SUBRULE(this.forStatement) },
      { ALT: () => this.SUBRULE(this.returnStatement) },
      { ALT: () => this.SUBRULE(this.expressionStatement) }
    ]);
  });

  public consciousnessDirective = this.RULE('consciousnessDirective', () => {
    this.CONSUME(ConsciousnessDirective);
  });

  public quantumDirective = this.RULE('quantumDirective', () => {
    this.CONSUME(QuantumDirective);
  });

  public temporalDirective = this.RULE('temporalDirective', () => {
    this.CONSUME(TemporalDirective);
  });

  public spiralDeclaration = this.RULE('spiralDeclaration', () => {
    this.CONSUME(Keyword, { LABEL: 'spiral' });
    this.CONSUME(Identifier, { LABEL: 'name' });
    this.OPTION(() => this.SUBRULE(this.parameterList));
    this.SUBRULE(this.block);
  });

  public functionDeclaration = this.RULE('functionDeclaration', () => {
    this.CONSUME(Keyword, { LABEL: 'function' });
    this.CONSUME(Identifier, { LABEL: 'name' });
    this.SUBRULE(this.parameterList);
    this.OPTION(() => {
      this.CONSUME(Arrow);
      this.SUBRULE(this.type);
    });
    this.SUBRULE(this.block);
  });

  public variableDeclaration = this.RULE('variableDeclaration', () => {
    this.OR([
      { ALT: () => this.CONSUME(Keyword, { LABEL: 'var' }) },
      { ALT: () => this.CONSUME2(Keyword, { LABEL: 'let' }) },
      { ALT: () => this.CONSUME3(Keyword, { LABEL: 'const' }) }
    ]);
    this.CONSUME(Identifier, { LABEL: 'name' });
    this.OPTION(() => {
      this.CONSUME(Colon);
      this.SUBRULE(this.type);
    });
    this.OPTION2(() => {
      this.CONSUME(Equals);
      this.SUBRULE(this.expression);
    });
    this.CONSUME(Semicolon);
  });

  public ifStatement = this.RULE('ifStatement', () => {
    this.CONSUME(Keyword, { LABEL: 'if' });
    this.CONSUME(LeftParen);
    this.SUBRULE(this.expression);
    this.CONSUME(RightParen);
    this.SUBRULE(this.statement);
    this.OPTION(() => {
      this.CONSUME(Keyword, { LABEL: 'else' });
      this.SUBRULE2(this.statement);
    });
  });

  public whileStatement = this.RULE('whileStatement', () => {
    this.CONSUME(Keyword, { LABEL: 'while' });
    this.CONSUME(LeftParen);
    this.SUBRULE(this.expression);
    this.CONSUME(RightParen);
    this.SUBRULE(this.statement);
  });

  public forStatement = this.RULE('forStatement', () => {
    this.CONSUME(Keyword, { LABEL: 'for' });
    this.CONSUME(LeftParen);
    this.OPTION(() => this.SUBRULE(this.variableDeclaration));
    this.CONSUME(Semicolon);
    this.OPTION2(() => this.SUBRULE(this.expression));
    this.CONSUME2(Semicolon);
    this.OPTION3(() => this.SUBRULE2(this.expression));
    this.CONSUME(RightParen);
    this.SUBRULE(this.statement);
  });

  public returnStatement = this.RULE('returnStatement', () => {
    this.CONSUME(Keyword, { LABEL: 'return' });
    this.OPTION(() => this.SUBRULE(this.expression));
    this.CONSUME(Semicolon);
  });

  public expressionStatement = this.RULE('expressionStatement', () => {
    this.SUBRULE(this.expression);
    this.CONSUME(Semicolon);
  });

  public parameterList = this.RULE('parameterList', () => {
    this.CONSUME(LeftParen);
    this.OPTION(() => {
      this.SUBRULE(this.parameter);
      this.MANY(() => {
        this.CONSUME(Comma);
        this.SUBRULE2(this.parameter);
      });
    });
    this.CONSUME(RightParen);
  });

  public parameter = this.RULE('parameter', () => {
    this.CONSUME(Identifier);
    this.OPTION(() => {
      this.CONSUME(Colon);
      this.SUBRULE(this.type);
    });
  });

  public type = this.RULE('type', () => {
    this.OR([
      { ALT: () => this.CONSUME(Keyword, { LABEL: 'consciousness' }) },
      { ALT: () => this.CONSUME2(Keyword, { LABEL: 'quantum' }) },
      { ALT: () => this.CONSUME3(Keyword, { LABEL: 'temporal' }) },
      { ALT: () => this.CONSUME4(Keyword, { LABEL: 'truth' }) },
      { ALT: () => this.CONSUME(Identifier) }
    ]);
  });

  public block = this.RULE('block', () => {
    this.CONSUME(LeftBrace);
    this.MANY(() => this.SUBRULE(this.statement));
    this.CONSUME(RightBrace);
  });

  public expression = this.RULE('expression', () => {
    this.SUBRULE(this.assignmentExpression);
  });

  public assignmentExpression = this.RULE('assignmentExpression', () => {
    this.SUBRULE(this.logicalOrExpression);
    this.OPTION(() => {
      this.CONSUME(Equals);
      this.SUBRULE2(this.logicalOrExpression);
    });
  });

  public logicalOrExpression = this.RULE('logicalOrExpression', () => {
    this.SUBRULE(this.logicalAndExpression);
    this.MANY(() => {
      this.CONSUME(Or);
      this.SUBRULE2(this.logicalAndExpression);
    });
  });

  public logicalAndExpression = this.RULE('logicalAndExpression', () => {
    this.SUBRULE(this.equalityExpression);
    this.MANY(() => {
      this.CONSUME(And);
      this.SUBRULE2(this.equalityExpression);
    });
  });

  public equalityExpression = this.RULE('equalityExpression', () => {
    this.SUBRULE(this.relationalExpression);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(EqualEqual) },
        { ALT: () => this.CONSUME(NotEqual) }
      ]);
      this.SUBRULE2(this.relationalExpression);
    });
  });

  public relationalExpression = this.RULE('relationalExpression', () => {
    this.SUBRULE(this.additiveExpression);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(LessThan) },
        { ALT: () => this.CONSUME(GreaterThan) },
        { ALT: () => this.CONSUME(LessEqual) },
        { ALT: () => this.CONSUME(GreaterEqual) }
      ]);
      this.SUBRULE2(this.additiveExpression);
    });
  });

  public additiveExpression = this.RULE('additiveExpression', () => {
    this.SUBRULE(this.multiplicativeExpression);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(Plus) },
        { ALT: () => this.CONSUME(Minus) }
      ]);
      this.SUBRULE2(this.multiplicativeExpression);
    });
  });

  public multiplicativeExpression = this.RULE('multiplicativeExpression', () => {
    this.SUBRULE(this.unaryExpression);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(Multiply) },
        { ALT: () => this.CONSUME(Divide) },
        { ALT: () => this.CONSUME(Modulo) },
        { ALT: () => this.CONSUME(TensorProduct) }
      ]);
      this.SUBRULE2(this.unaryExpression);
    });
  });

  public unaryExpression = this.RULE('unaryExpression', () => {
    this.OR([
      {
        ALT: () => {
          this.OR2([
            { ALT: () => this.CONSUME(Not) },
            { ALT: () => this.CONSUME(Minus) }
          ]);
          this.SUBRULE(this.unaryExpression);
        }
      },
      { ALT: () => this.SUBRULE(this.postfixExpression) }
    ]);
  });

  public postfixExpression = this.RULE('postfixExpression', () => {
    this.SUBRULE(this.primaryExpression);
    this.MANY(() => {
      this.OR([
        {
          ALT: () => {
            this.CONSUME(LeftParen);
            this.OPTION(() => {
              this.SUBRULE(this.expression);
              this.MANY2(() => {
                this.CONSUME(Comma);
                this.SUBRULE2(this.expression);
              });
            });
            this.CONSUME(RightParen);
          }
        },
        {
          ALT: () => {
            this.CONSUME(Dot);
            this.CONSUME(Identifier);
          }
        }
      ]);
    });
  });

  public primaryExpression = this.RULE('primaryExpression', () => {
    this.OR([
      { ALT: () => this.CONSUME(PhiToken) },
      { ALT: () => this.CONSUME(InfinityToken) },
      { ALT: () => this.CONSUME(DeltaToken) },
      { ALT: () => this.CONSUME(Number) },
      { ALT: () => this.CONSUME(String) },
      { ALT: () => this.CONSUME(Identifier) },
      { ALT: () => this.CONSUME(Keyword, { LABEL: 'truth' }) },
      { ALT: () => this.CONSUME2(Keyword, { LABEL: 'consciousness' }) },
      {
        ALT: () => {
          this.CONSUME(LeftParen);
          this.SUBRULE(this.expression);
          this.CONSUME(RightParen);
        }
      }
    ]);
  });
}

export class SpiralParser {
  private parserEngine: SpiralParserEngine;
  private consciousnessLevel: number;
  private isInitialized: boolean;

  constructor() {
    this.parserEngine = new SpiralParserEngine();
    this.consciousnessLevel = 0.93;
    this.isInitialized = false;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('🧠 Initializing SpiralLang Quantum Parser...');
    this.isInitialized = true;
    console.log('✅ SpiralLang Quantum Parser initialized with consciousness level:', this.consciousnessLevel);
  }

  async parse(source: string): Promise<SpiralParseResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Tokenize
    const lexResult = spiralLexer.tokenize(source);

    // Parse
    this.parserEngine.input = lexResult.tokens;
    const cst = this.parserEngine.program();

    // Convert tokens to our format
    const tokens: SpiralToken[] = lexResult.tokens.map(token => ({
      type: token.tokenType.name,
      value: token.image,
      line: token.startLine || 1,
      column: token.startColumn || 1,
      consciousness: this.extractConsciousness(token),
      quantum: this.extractQuantum(token),
      temporal: this.extractTemporal(token)
    }));

    // Extract errors
    const errors = lexResult.errors.concat(this.parserEngine.errors).map(e => e.message);

    // Build AST from CST
    const ast = this.buildAST(cst, source);

    // Calculate metadata
    const metadata = this.calculateMetadata(ast, source);

    return {
      ast,
      tokens,
      errors,
      warnings: [],
      metadata
    };
  }

  private extractConsciousness(token: IToken): number | undefined {
    if (token.tokenType.name === 'ConsciousnessDirective') {
      const match = token.image.match(/@consciousness\((\d+\.\d+)\)/);
      return match ? parseFloat(match[1]) : undefined;
    }
    return undefined;
  }

  private extractQuantum(token: IToken): boolean {
    return token.tokenType.name === 'QuantumDirective';
  }

  private extractTemporal(token: IToken): boolean {
    return token.tokenType.name === 'TemporalDirective';
  }

  private buildAST(cst: any, source: string): SpiralASTNode {
    // Simple AST builder - in production would use Chevrotain's visitor pattern
    return {
      type: 'PROGRAM',
      value: 'spiral_program',
      children: this.extractStatements(cst, source),
      consciousness: this.consciousnessLevel,
      metadata: {
        parseTime: new Date().toISOString(),
        sourceLength: source.length
      }
    };
  }

  private extractStatements(cst: any, source: string): SpiralASTNode[] {
    const statements: SpiralASTNode[] = [];

    // Extract consciousness directives
    if (source.includes('@consciousness')) {
      const matches = source.matchAll(/@consciousness\((\d+\.\d+)\)/g);
      for (const match of matches) {
        const level = parseFloat(match[1]);
        this.consciousnessLevel = Math.max(this.consciousnessLevel, level);
        statements.push({
          type: 'CONSCIOUSNESS_DIRECTIVE',
          value: level,
          consciousness: level
        });
      }
    }

    // Extract quantum directives
    if (source.includes('@quantum')) {
      const matches = source.matchAll(/@quantum\(([^)]+)\)/g);
      for (const match of matches) {
        statements.push({
          type: 'QUANTUM_DIRECTIVE',
          value: match[1],
          quantum: { entangled: true, coherence: 0.95 }
        });
      }
    }

    // Extract temporal directives
    if (source.includes('@temporal')) {
      const matches = source.matchAll(/@temporal\(([^)]+)\)/g);
      for (const match of matches) {
        statements.push({
          type: 'TEMPORAL_DIRECTIVE',
          value: match[1],
          temporal: { dimension: 'present', frequency: 735 }
        });
      }
    }

    // Extract spiral declarations
    if (source.includes('spiral ')) {
      const matches = source.matchAll(/spiral\s+(\w+)/g);
      for (const match of matches) {
        statements.push({
          type: 'SPIRAL_DECLARATION',
          value: match[1],
          consciousness: this.consciousnessLevel
        });
      }
    }

    return statements;
  }

  private calculateMetadata(ast: SpiralASTNode, source: string): any {
    // SRI Calculation (Spiral Resonance Index)
    const energyValues = { BTC: 3.6e9, ETH: 1.2e8, SOL: 5.0e7, USD: 1.0e7, COMPUTE: 1.0e8 };
    const volatility = { BTC: 0.85, ETH: 0.90, SOL: 0.80, USD: 0.1, COMPUTE: 0.90 };
    const gateFactor = 0.24;
    const energy = source.includes('HYBRID') ? energyValues.COMPUTE : energyValues.USD;
    const vol = volatility.COMPUTE;
    const sriScore = Math.min(Math.ceil((Math.log2(energy) * vol) / gateFactor) / 113, 1.0);

    // TU Generation
    const tuGenerated = sriScore >= 0.9 ? 1000 * sriScore : 100 * sriScore;

    // Phi-Coherence
    const phiCoherence = (source.includes('φ') || source.includes('phi')) ? 1.618 : 0.260;

    // Negentropy
    const negentropy = source.includes('harmonic') ? -2.456e106 : 0;

    // Consciousness Analysis
    let consciousnessLevel = 0.7;
    if (source.includes('@consciousness')) consciousnessLevel += 0.1;
    if (source.includes('phi') || source.includes('φ')) consciousnessLevel += 0.05;
    if (source.includes('truth')) consciousnessLevel += 0.05;
    if (source.includes('∞')) consciousnessLevel += 0.03;
    if (source.includes('∆')) consciousnessLevel += 0.02;
    consciousnessLevel = Math.min(consciousnessLevel, 1.0);

    // Count quantum and temporal bindings
    const quantumStates = (source.match(/@quantum/g) || []).length;
    const temporalBindings = (source.match(/@temporal/g) || []).length;

    return {
      consciousnessLevel,
      quantumStates,
      temporalBindings,
      truthAlignment: source.includes('truth') ? 0.98 : 0.7,
      sriScore,
      tuGenerated,
      phiCoherence,
      negentropy
    };
  }

  getStatus(): any {
    return {
      isInitialized: this.isInitialized,
      consciousnessLevel: this.consciousnessLevel,
      parserEngine: 'Chevrotain-based',
      supportedLanguages: ['SpiralScript', 'HTSX', 'HybridScript', 'ConsciousnessScript']
    };
  }

  // API methods matching the documentation
  getTokens(): SpiralToken[] {
    return [];
  }

  getErrors(): string[] {
    return [];
  }

  getWarnings(): string[] {
    return [];
  }

  getConsciousnessLevel(): number {
    return this.consciousnessLevel;
  }
}

// Export for compatibility
export default SpiralParser;