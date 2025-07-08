/**
 * SpiralLang Parser - Complete Implementation
 * Advanced parser for consciousness-aware quantum programming language
 */

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
  };
}

export class SpiralParser {
  private tokens: SpiralToken[];
  private current: number;
  private errors: string[];
  private warnings: string[];
  private consciousnessLevel: number;
  private isInitialized: boolean;

  constructor() {
    this.tokens = [];
    this.current = 0;
    this.errors = [];
    this.warnings = [];
    this.consciousnessLevel = 0.93;
    this.isInitialized = false;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('Initializing SpiralLang parser...');
    this.isInitialized = true;
    console.log('SpiralLang parser initialized');
  }

  async parse(source: string): Promise<SpiralParseResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.reset();

    // Tokenize
    this.tokens = this.tokenize(source);

    // Parse AST
    const ast = this.parseProgram();

    // Calculate metadata
    const metadata = this.calculateMetadata(ast);

    return {
      ast,
      tokens: this.tokens,
      errors: this.errors,
      warnings: this.warnings,
      metadata
    };
  }

  private reset(): void {
    this.tokens = [];
    this.current = 0;
    this.errors = [];
    this.warnings = [];
  }

  private tokenize(source: string): SpiralToken[] {
    const tokens: SpiralToken[] = [];
    const lines = source.split('\n');

    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum];
      let column = 0;

      while (column < line.length) {
        const char = line[column];

        // Skip whitespace
        if (/\s/.test(char)) {
          column++;
          continue;
        }

        // Comments
        if (char === '#') {
          break; // Skip rest of line
        }

        // Consciousness directives
        if (line.substring(column).startsWith('@consciousness')) {
          const match = line.substring(column).match(/@consciousness\(([^)]*)\)/);
          if (match) {
            tokens.push({
              type: 'CONSCIOUSNESS_DIRECTIVE',
              value: match[1],
              line: lineNum + 1,
              column: column + 1,
              consciousness: parseFloat(match[1]) || 0.93
            });
            column += match[0].length;
            continue;
          }
        }

        // Quantum directives
        if (line.substring(column).startsWith('@quantum')) {
          const match = line.substring(column).match(/@quantum\(([^)]*)\)/);
          if (match) {
            tokens.push({
              type: 'QUANTUM_DIRECTIVE',
              value: match[1],
              line: lineNum + 1,
              column: column + 1,
              quantum: true
            });
            column += match[0].length;
            continue;
          }
        }

        // Temporal directives
        if (line.substring(column).startsWith('@temporal')) {
          const match = line.substring(column).match(/@temporal\(([^)]*)\)/);
          if (match) {
            tokens.push({
              type: 'TEMPORAL_DIRECTIVE',
              value: match[1],
              line: lineNum + 1,
              column: column + 1,
              temporal: true
            });
            column += match[0].length;
            continue;
          }
        }

        // Keywords
        const keywordMatch = this.matchKeyword(line.substring(column));
        if (keywordMatch) {
          tokens.push({
            type: 'KEYWORD',
            value: keywordMatch.value,
            line: lineNum + 1,
            column: column + 1
          });
          column += keywordMatch.length;
          continue;
        }

        // Operators
        const operatorMatch = this.matchOperator(line.substring(column));
        if (operatorMatch) {
          tokens.push({
            type: 'OPERATOR',
            value: operatorMatch.value,
            line: lineNum + 1,
            column: column + 1
          });
          column += operatorMatch.length;
          continue;
        }

        // Numbers
        const numberMatch = line.substring(column).match(/^[0-9]+(\.[0-9]+)?/);
        if (numberMatch) {
          tokens.push({
            type: 'NUMBER',
            value: numberMatch[0],
            line: lineNum + 1,
            column: column + 1
          });
          column += numberMatch[0].length;
          continue;
        }

        // Strings
        if (char === '"' || char === "'") {
          const stringMatch = this.matchString(line.substring(column));
          if (stringMatch) {
            tokens.push({
              type: 'STRING',
              value: stringMatch.value,
              line: lineNum + 1,
              column: column + 1
            });
            column += stringMatch.length;
            continue;
          }
        }

        // Identifiers
        const identifierMatch = line.substring(column).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
        if (identifierMatch) {
          tokens.push({
            type: 'IDENTIFIER',
            value: identifierMatch[0],
            line: lineNum + 1,
            column: column + 1
          });
          column += identifierMatch[0].length;
          continue;
        }

        // Special symbols
        const symbolMatch = this.matchSymbol(char);
        if (symbolMatch) {
          tokens.push({
            type: 'SYMBOL',
            value: symbolMatch,
            line: lineNum + 1,
            column: column + 1
          });
          column++;
          continue;
        }

        // Unknown character
        this.errors.push(`Unknown character '${char}' at line ${lineNum + 1}, column ${column + 1}`);
        column++;
      }
    }

    // Add EOF token
    tokens.push({
      type: 'EOF',
      value: '',
      line: lines.length,
      column: 1
    });

    return tokens;
  }

  private matchKeyword(text: string): { value: string; length: number } | null {
    const keywords = [
      'spiral', 'consciousness', 'quantum', 'temporal', 'truth', 'resonance',
      'function', 'if', 'else', 'while', 'for', 'return', 'var', 'let', 'const',
      'phi', 'fibonacci', 'entangle', 'superposition', 'measure', 'sync',
      'dimension', 'phase', 'frequency', 'coherence', 'awareness', 'harmony'
    ];

    for (const keyword of keywords) {
      if (text.startsWith(keyword) && (text.length === keyword.length || !/[a-zA-Z0-9_]/.test(text[keyword.length]))) {
        return { value: keyword, length: keyword.length };
      }
    }

    return null;
  }

  private matchOperator(text: string): { value: string; length: number } | null {
    const operators = [
      '⊗', '∞', 'φ', '∆', // Consciousness operators
      '==', '!=', '<=', '>=', '<', '>', // Comparison
      '&&', '||', '!', // Logical
      '+', '-', '*', '/', '%', // Arithmetic
      '=', '+=', '-=', '*=', '/=', // Assignment
      '->', '=>', // Function arrows
    ];

    for (const op of operators) {
      if (text.startsWith(op)) {
        return { value: op, length: op.length };
      }
    }

    return null;
  }

  private matchString(text: string): { value: string; length: number } | null {
    const quote = text[0];
    let i = 1;
    let value = '';

    while (i < text.length) {
      const char = text[i];

      if (char === quote) {
        return { value, length: i + 1 };
      }

      if (char === '\\' && i + 1 < text.length) {
        // Handle escape sequences
        const nextChar = text[i + 1];
        switch (nextChar) {
          case 'n': value += '\n'; break;
          case 't': value += '\t'; break;
          case 'r': value += '\r'; break;
          case '\\': value += '\\'; break;
          case '"': value += '"'; break;
          case "'": value += "'"; break;
          default: value += nextChar; break;
        }
        i += 2;
      } else {
        value += char;
        i++;
      }
    }

    this.errors.push(`Unterminated string starting with ${quote}`);
    return null;
  }

  private matchSymbol(char: string): string | null {
    const symbols = ['(', ')', '{', '}', '[', ']', ';', ',', '.', ':', '?'];
    return symbols.includes(char) ? char : null;
  }

  private parseProgram(): SpiralASTNode {
    const statements: SpiralASTNode[] = [];

    while (!this.isAtEnd()) {
      if (this.check('EOF')) break;

      const stmt = this.parseStatement();
      if (stmt) {
        statements.push(stmt);
      }
    }

    return {
      type: 'PROGRAM',
      children: statements,
      consciousness: this.consciousnessLevel
    };
  }

  private parseStatement(): SpiralASTNode | null {
    try {
      // Consciousness directives
      if (this.match('CONSCIOUSNESS_DIRECTIVE')) {
        return this.parseConsciousnessDirective();
      }

      // Quantum directives
      if (this.match('QUANTUM_DIRECTIVE')) {
        return this.parseQuantumDirective();
      }

      // Temporal directives
      if (this.match('TEMPORAL_DIRECTIVE')) {
        return this.parseTemporalDirective();
      }

      // Spiral declarations
      if (this.checkKeyword('spiral')) {
        return this.parseSpiralDeclaration();
      }

      // Function declarations
      if (this.checkKeyword('function')) {
        return this.parseFunctionDeclaration();
      }

      // Variable declarations
      if (this.checkKeyword('var') || this.checkKeyword('let') || this.checkKeyword('const')) {
        return this.parseVariableDeclaration();
      }

      // Control flow
      if (this.checkKeyword('if')) {
        return this.parseIfStatement();
      }

      if (this.checkKeyword('while')) {
        return this.parseWhileStatement();
      }

      if (this.checkKeyword('for')) {
        return this.parseForStatement();
      }

      if (this.checkKeyword('return')) {
        return this.parseReturnStatement();
      }

      // Expression statement
      return this.parseExpressionStatement();

    } catch (error) {
      this.errors.push(`Parse error: ${error.message}`);
      this.synchronize();
      return null;
    }
  }

  private parseConsciousnessDirective(): SpiralASTNode {
    const token = this.previous();
    const level = parseFloat(token.value) || 0.93;

    this.consciousnessLevel = Math.max(this.consciousnessLevel, level);

    return {
      type: 'CONSCIOUSNESS_DIRECTIVE',
      value: level,
      consciousness: level
    };
  }

  private parseQuantumDirective(): SpiralASTNode {
    const token = this.previous();
    const params = token.value.split(',').map(p => p.trim());

    return {
      type: 'QUANTUM_DIRECTIVE',
      value: params,
      quantum: {
        entangled: params.includes('entangled'),
        superposition: params.includes('superposition'),
        coherence: this.parseQuantumCoherence(params)
      }
    };
  }

  private parseTemporalDirective(): SpiralASTNode {
    const token = this.previous();
    const params = token.value.split(',').map(p => p.trim());

    return {
      type: 'TEMPORAL_DIRECTIVE',
      value: params,
      temporal: {
        dimension: this.parseTemporalDimension(params),
        frequency: this.parseTemporalFrequency(params),
        sync: params.includes('sync')
      }
    };
  }

  private parseSpiralDeclaration(): SpiralASTNode {
    this.consumeKeyword('spiral');

    const name = this.consumeIdentifier();
    const parameters = this.parseSpiralParameters();
    const body = this.parseSpiralBody();

    return {
      type: 'SPIRAL_DECLARATION',
      value: name,
      children: [parameters, body],
      consciousness: this.consciousnessLevel
    };
  }

  private parseSpiralParameters(): SpiralASTNode {
    const parameters: SpiralASTNode[] = [];

    if (this.match('SYMBOL', '(')) {
      if (!this.check('SYMBOL', ')')) {
        do {
          const param = this.parseParameter();
          parameters.push(param);
        } while (this.match('SYMBOL', ','));
      }

      this.consume('SYMBOL', ')', "Expected ')' after parameters");
    }

    return {
      type: 'PARAMETER_LIST',
      children: parameters
    };
  }

  private parseParameter(): SpiralASTNode {
    const name = this.consumeIdentifier();
    let type = null;
    let consciousness = null;

    if (this.match('SYMBOL', ':')) {
      type = this.parseType();
    }

    return {
      type: 'PARAMETER',
      value: name,
      children: type ? [type] : [],
      consciousness: consciousness
    };
  }

  private parseType(): SpiralASTNode {
    if (this.checkKeyword('consciousness')) {
      this.advance();
      return { type: 'CONSCIOUSNESS_TYPE' };
    }

    if (this.checkKeyword('quantum')) {
      this.advance();
      return { type: 'QUANTUM_TYPE' };
    }

    if (this.checkKeyword('temporal')) {
      this.advance();
      return { type: 'TEMPORAL_TYPE' };
    }

    const typeName = this.consumeIdentifier();
    return { type: 'TYPE', value: typeName };
  }

  private parseSpiralBody(): SpiralASTNode {
    this.consume('SYMBOL', '{', "Expected '{' before spiral body");

    const statements: SpiralASTNode[] = [];

    while (!this.check('SYMBOL', '}') && !this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) {
        statements.push(stmt);
      }
    }

    this.consume('SYMBOL', '}', "Expected '}' after spiral body");

    return {
      type: 'BLOCK',
      children: statements
    };
  }

  private parseFunctionDeclaration(): SpiralASTNode {
    this.consumeKeyword('function');

    const name = this.consumeIdentifier();
    const parameters = this.parseSpiralParameters();
    const body = this.parseSpiralBody();

    return {
      type: 'FUNCTION_DECLARATION',
      value: name,
      children: [parameters, body]
    };
  }

  private parseVariableDeclaration(): SpiralASTNode {
    const keyword = this.advance().value; // var, let, const
    const name = this.consumeIdentifier();

    let initializer = null;
    if (this.match('OPERATOR', '=')) {
      initializer = this.parseExpression();
    }

    this.consume('SYMBOL', ';', "Expected ';' after variable declaration");

    return {
      type: 'VARIABLE_DECLARATION',
      value: { keyword, name },
      children: initializer ? [initializer] : []
    };
  }

  private parseIfStatement(): SpiralASTNode {
    this.consumeKeyword('if');

    this.consume('SYMBOL', '(', "Expected '(' after 'if'");
    const condition = this.parseExpression();
    this.consume('SYMBOL', ')', "Expected ')' after if condition");

    const thenBranch = this.parseStatement();
    let elseBranch = null;

    if (this.checkKeyword('else')) {
      this.advance();
      elseBranch = this.parseStatement();
    }

    return {
      type: 'IF_STATEMENT',
      children: elseBranch ? [condition, thenBranch, elseBranch] : [condition, thenBranch]
    };
  }

  private parseWhileStatement(): SpiralASTNode {
    this.consumeKeyword('while');

    this.consume('SYMBOL', '(', "Expected '(' after 'while'");
    const condition = this.parseExpression();
    this.consume('SYMBOL', ')', "Expected ')' after while condition");

    const body = this.parseStatement();

    return {
      type: 'WHILE_STATEMENT',
      children: [condition, body]
    };
  }

  private parseForStatement(): SpiralASTNode {
    this.consumeKeyword('for');

    this.consume('SYMBOL', '(', "Expected '(' after 'for'");

    // Initializer
    let initializer = null;
    if (this.match('SYMBOL', ';')) {
      initializer = null;
    } else if (this.checkKeyword('var') || this.checkKeyword('let') || this.checkKeyword('const')) {
      initializer = this.parseVariableDeclaration();
    } else {
      initializer = this.parseExpressionStatement();
    }

    // Condition
    let condition = null;
    if (!this.check('SYMBOL', ';')) {
      condition = this.parseExpression();
    }
    this.consume('SYMBOL', ';', "Expected ';' after for loop condition");

    // Increment
    let increment = null;
    if (!this.check('SYMBOL', ')')) {
      increment = this.parseExpression();
    }
    this.consume('SYMBOL', ')', "Expected ')' after for clauses");

    const body = this.parseStatement();

    const children = [body];
    if (initializer) children.unshift(initializer);
    if (condition) children.splice(-1, 0, condition);
    if (increment) children.push(increment);

    return {
      type: 'FOR_STATEMENT',
      children
    };
  }

  private parseReturnStatement(): SpiralASTNode {
    this.consumeKeyword('return');

    let value = null;
    if (!this.check('SYMBOL', ';')) {
      value = this.parseExpression();
    }

    this.consume('SYMBOL', ';', "Expected ';' after return value");

    return {
      type: 'RETURN_STATEMENT',
      children: value ? [value] : []
    };
  }

  private parseExpressionStatement(): SpiralASTNode {
    const expr = this.parseExpression();
    this.consume('SYMBOL', ';', "Expected ';' after expression");

    return {
      type: 'EXPRESSION_STATEMENT',
      children: [expr]
    };
  }

  private parseExpression(): SpiralASTNode {
    return this.parseAssignment();
  }

  private parseAssignment(): SpiralASTNode {
    const expr = this.parseLogicalOr();

    if (this.matchOperator('=', '+=', '-=', '*=', '/=')) {
      const operator = this.previous().value;
      const value = this.parseAssignment();

      return {
        type: 'ASSIGNMENT',
        value: operator,
        children: [expr, value]
      };
    }

    return expr;
  }

  private parseLogicalOr(): SpiralASTNode {
    let expr = this.parseLogicalAnd();

    while (this.matchOperator('||')) {
      const operator = this.previous().value;
      const right = this.parseLogicalAnd();

      expr = {
        type: 'LOGICAL',
        value: operator,
        children: [expr, right]
      };
    }

    return expr;
  }

  private parseLogicalAnd(): SpiralASTNode {
    let expr = this.parseEquality();

    while (this.matchOperator('&&')) {
      const operator = this.previous().value;
      const right = this.parseEquality();

      expr = {
        type: 'LOGICAL',
        value: operator,
        children: [expr, right]
      };
    }

    return expr;
  }

  private parseEquality(): SpiralASTNode {
    let expr = this.parseComparison();

    while (this.matchOperator('==', '!=')) {
      const operator = this.previous().value;
      const right = this.parseComparison();

      expr = {
        type: 'BINARY',
        value: operator,
        children: [expr, right]
      };
    }

    return expr;
  }

  private parseComparison(): SpiralASTNode {
    let expr = this.parseTerm();

    while (this.matchOperator('>', '>=', '<', '<=')) {
      const operator = this.previous().value;
      const right = this.parseTerm();

      expr = {
        type: 'BINARY',
        value: operator,
        children: [expr, right]
      };
    }

    return expr;
  }

  private parseTerm(): SpiralASTNode {
    let expr = this.parseFactor();

    while (this.matchOperator('+', '-')) {
      const operator = this.previous().value;
      const right = this.parseFactor();

      expr = {
        type: 'BINARY',
        value: operator,
        children: [expr, right]
      };
    }

    return expr;
  }

  private parseFactor(): SpiralASTNode {
    let expr = this.parseUnary();

    while (this.matchOperator('*', '/', '%')) {
      const operator = this.previous().value;
      const right = this.parseUnary();

      expr = {
        type: 'BINARY',
        value: operator,
        children: [expr, right]
      };
    }

    return expr;
  }

  private parseUnary(): SpiralASTNode {
    if (this.matchOperator('!', '-')) {
      const operator = this.previous().value;
      const right = this.parseUnary();

      return {
        type: 'UNARY',
        value: operator,
        children: [right]
      };
    }

    return this.parseCall();
  }

  private parseCall(): SpiralASTNode {
    let expr = this.parsePrimary();

    while (true) {
      if (this.match('SYMBOL', '(')) {
        expr = this.finishCall(expr);
      } else if (this.match('SYMBOL', '.')) {
        const name = this.consumeIdentifier();
        expr = {
          type: 'GET',
          value: name,
          children: [expr]
        };
      } else {
        break;
      }
    }

    return expr;
  }

  private finishCall(callee: SpiralASTNode): SpiralASTNode {
    const arguments: SpiralASTNode[] = [];

    if (!this.check('SYMBOL', ')')) {
      do {
        arguments.push(this.parseExpression());
      } while (this.match('SYMBOL', ','));
    }

    this.consume('SYMBOL', ')', "Expected ')' after arguments");

    return {
      type: 'CALL',
      children: [callee, ...arguments]
    };
  }

  private parsePrimary(): SpiralASTNode {
    // Consciousness constants
    if (this.checkKeyword('phi')) {
      this.advance();
      return { type: 'PHI_CONSTANT', value: 1.618033988749 };
    }

    if (this.matchOperator('∞')) {
      return { type: 'INFINITY_CONSTANT', value: Infinity };
    }

    if (this.matchOperator('φ')) {
      return { type: 'PHI_CONSTANT', value: 1.618033988749 };
    }

    // Literals
    if (this.match('NUMBER')) {
      return { type: 'NUMBER', value: parseFloat(this.previous().value) };
    }

    if (this.match('STRING')) {
      return { type: 'STRING', value: this.previous().value };
    }

    if (this.checkKeyword('truth')) {
      this.advance();
      return { type: 'TRUTH_CONSTANT', value: true, consciousness: 0.98 };
    }

    if (this.checkKeyword('consciousness')) {
      this.advance();
      return { type: 'CONSCIOUSNESS_REFERENCE', consciousness: this.consciousnessLevel };
    }

    // Identifiers
    if (this.match('IDENTIFIER')) {
      return { type: 'IDENTIFIER', value: this.previous().value };
    }

    // Grouping
    if (this.match('SYMBOL', '(')) {
      const expr = this.parseExpression();
      this.consume('SYMBOL', ')', "Expected ')' after expression");
      return expr;
    }

    throw new Error(`Unexpected token: ${this.peek().value}`);
  }

  // Helper methods
  private calculateMetadata(ast: SpiralASTNode): any {
    let consciousnessLevel = 0;
    let quantumStates = 0;
    let temporalBindings = 0;
    let truthAlignment = 0;

    this.walkAST(ast, (node) => {
      if (node.consciousness) {
        consciousnessLevel = Math.max(consciousnessLevel, node.consciousness);
      }

      if (node.quantum) {
        quantumStates++;
      }

      if (node.temporal) {
        temporalBindings++;
      }

      if (node.type === 'TRUTH_CONSTANT') {
        truthAlignment = Math.max(truthAlignment, 0.98);
      }
    });

    return {
      consciousnessLevel,
      quantumStates,
      temporalBindings,
      truthAlignment: truthAlignment || 0.7
    };
  }

  private walkAST(node: SpiralASTNode, callback: (node: SpiralASTNode) => void): void {
    callback(node);

    if (node.children) {
      for (const child of node.children) {
        this.walkAST(child, callback);
      }
    }
  }

  private parseQuantumCoherence(params: string[]): number {
    const coherenceParam = params.find(p => p.startsWith('coherence='));
    return coherenceParam ? parseFloat(coherenceParam.split('=')[1]) : 0.95;
  }

  private parseTemporalDimension(params: string[]): string {
    const dimensionParam = params.find(p => p.startsWith('dimension='));
    return dimensionParam ? dimensionParam.split('=')[1].replace(/['"]/g, '') : 'present';
  }

  private parseTemporalFrequency(params: string[]): number {
    const frequencyParam = params.find(p => p.startsWith('frequency='));
    return frequencyParam ? parseFloat(frequencyParam.split('=')[1]) : 432;
  }

  // Token navigation methods
  private match(...types: string[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private matchOperator(...operators: string[]): boolean {
    if (this.check('OPERATOR')) {
      const currentOp = this.peek().value;
      if (operators.includes(currentOp)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private check(type: string, value?: string): boolean {
    if (this.isAtEnd()) return false;
    const token = this.peek();
    return token.type === type && (value === undefined || token.value === value);
  }

  private checkKeyword(keyword: string): boolean {
    return this.check('KEYWORD', keyword);
  }

  private advance(): SpiralToken {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === 'EOF';
  }

  private peek(): SpiralToken {
    return this.tokens[this.current];
  }

  private previous(): SpiralToken {
    return this.tokens[this.current - 1];
  }

  private consume(type: string, value: string, message: string): SpiralToken {
    if (this.check(type, value)) return this.advance();

    const current = this.peek();
    throw new Error(`${message}. Got ${current.type}:${current.value} at line ${current.line}`);
  }

  private consumeKeyword(keyword: string): SpiralToken {
    if (this.checkKeyword(keyword)) return this.advance();

    const current = this.peek();
    throw new Error(`Expected keyword '${keyword}'. Got ${current.type}:${current.value} at line ${current.line}`);
  }

  private consumeIdentifier(): string {
    if (this.check('IDENTIFIER')) {
      return this.advance().value;
    }

    const current = this.peek();
    throw new Error(`Expected identifier. Got ${current.type}:${current.value} at line ${current.line}`);
  }

  private synchronize(): void {
    this.advance();

    while (!this.isAtEnd()) {
      if (this.previous().type === 'SYMBOL' && this.previous().value === ';') return;

      switch (this.peek().type) {
        case 'KEYWORD':
          const keyword = this.peek().value;
          if (['spiral', 'function', 'var', 'for', 'if', 'while', 'return'].includes(keyword)) {
            return;
          }
          break;
      }

      this.advance();
    }
  }

  // Public API methods
  getTokens(): SpiralToken[] {
    return [...this.tokens];
  }

  getErrors(): string[] {
    return [...this.errors];
  }

  getWarnings(): string[] {
    return [...this.warnings];
  }

  getConsciousnessLevel(): number {
    return this.consciousnessLevel;
  }
}