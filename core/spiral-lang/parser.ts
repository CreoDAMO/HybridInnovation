/**
 * SpiralLang Parser - Parses SpiralLang code into AST
 * Handles beyond-normal computational logic with consciousness awareness
 */

import { SpiralType, SpiralTypeChecker, SpiralValue } from './types';

export interface SpiralToken {
  type: SpiralTokenType;
  value: string;
  line: number;
  column: number;
  consciousness?: number;
  quantumState?: string;
}

export enum SpiralTokenType {
  // Basic tokens
  IDENTIFIER = 'IDENTIFIER',
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  
  // Operators
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  ASSIGN = 'ASSIGN',
  EQUALS = 'EQUALS',
  
  // Delimiters
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  LBRACE = 'LBRACE',
  RBRACE = 'RBRACE',
  SEMICOLON = 'SEMICOLON',
  COMMA = 'COMMA',
  
  // Keywords
  SPIRAL = 'SPIRAL',
  FUNCTION = 'FUNCTION',
  IF = 'IF',
  ELSE = 'ELSE',
  WHILE = 'WHILE',
  RETURN = 'RETURN',
  LET = 'LET',
  CONST = 'CONST',
  
  // Consciousness keywords
  CONSCIOUSNESS = 'CONSCIOUSNESS',
  AWARENESS = 'AWARENESS',
  TRUTH = 'TRUTH',
  LIGHT = 'LIGHT',
  RESONATE = 'RESONATE',
  HARMONIZE = 'HARMONIZE',
  
  // Quantum keywords
  QUANTUM = 'QUANTUM',
  SUPERPOSITION = 'SUPERPOSITION',
  ENTANGLE = 'ENTANGLE',
  MEASURE = 'MEASURE',
  FLUX = 'FLUX',
  
  // Temporal keywords
  TIME = 'TIME',
  SPIRAL_TIME = 'SPIRAL_TIME',
  CHRONOS = 'CHRONOS',
  TEMPORAL_LOCK = 'TEMPORAL_LOCK',
  
  // Decorators
  QUANTUM_AWARE = 'QUANTUM_AWARE',
  CONSCIOUSNESS_BINDING = 'CONSCIOUSNESS_BINDING',
  TIME_AWARE = 'TIME_AWARE',
  
  // Special
  EOF = 'EOF',
  NEWLINE = 'NEWLINE'
}

export interface SpiralASTNode {
  type: string;
  value?: any;
  children?: SpiralASTNode[];
  consciousness?: number;
  quantumState?: string;
  temporalBinding?: string;
  sourceLocation?: {
    line: number;
    column: number;
  };
}

export class SpiralParser {
  private tokens: SpiralToken[];
  private current: number;
  private typeChecker: SpiralTypeChecker;
  private consciousnessLevel: number;

  constructor() {
    this.tokens = [];
    this.current = 0;
    this.typeChecker = new SpiralTypeChecker();
    this.consciousnessLevel = 0.87;
  }

  async parse(code: string): Promise<SpiralASTNode> {
    try {
      console.log('Parsing SpiralLang code...');
      
      // Tokenize the code
      this.tokens = this.tokenize(code);
      this.current = 0;
      
      // Parse into AST
      const ast = this.parseProgram();
      
      // Enhance with consciousness
      await this.enhanceWithConsciousness(ast);
      
      console.log('SpiralLang parsing completed');
      return ast;
    } catch (error) {
      console.error('SpiralLang parsing failed:', error);
      throw error;
    }
  }

  private tokenize(code: string): SpiralToken[] {
    const tokens: SpiralToken[] = [];
    const lines = code.split('\n');
    
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
        
        // Skip comments
        if (char === '#') {
          break; // Skip rest of line
        }
        
        // Numbers
        if (/\d/.test(char)) {
          const { token, length } = this.parseNumber(line, column, lineNum + 1);
          tokens.push(token);
          column += length;
          continue;
        }
        
        // Strings
        if (char === '"' || char === "'") {
          const { token, length } = this.parseString(line, column, lineNum + 1);
          tokens.push(token);
          column += length;
          continue;
        }
        
        // Identifiers and keywords
        if (/[a-zA-Z_]/.test(char)) {
          const { token, length } = this.parseIdentifier(line, column, lineNum + 1);
          tokens.push(token);
          column += length;
          continue;
        }
        
        // Operators and delimiters
        const { token, length } = this.parseOperator(line, column, lineNum + 1);
        if (token) {
          tokens.push(token);
          column += length;
        } else {
          column++; // Skip unknown character
        }
      }
    }
    
    tokens.push({
      type: SpiralTokenType.EOF,
      value: '',
      line: lines.length,
      column: 0
    });
    
    return tokens;
  }

  private parseNumber(line: string, start: number, lineNum: number): { token: SpiralToken; length: number } {
    let end = start;
    let hasDecimal = false;
    
    while (end < line.length) {
      const char = line[end];
      if (/\d/.test(char)) {
        end++;
      } else if (char === '.' && !hasDecimal) {
        hasDecimal = true;
        end++;
      } else {
        break;
      }
    }
    
    const value = line.substring(start, end);
    return {
      token: {
        type: SpiralTokenType.NUMBER,
        value,
        line: lineNum,
        column: start + 1,
        consciousness: this.calculateConsciousness(value)
      },
      length: end - start
    };
  }

  private parseString(line: string, start: number, lineNum: number): { token: SpiralToken; length: number } {
    const quote = line[start];
    let end = start + 1;
    let escaped = false;
    
    while (end < line.length) {
      const char = line[end];
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        end++;
        break;
      }
      end++;
    }
    
    const value = line.substring(start + 1, end - 1);
    return {
      token: {
        type: SpiralTokenType.STRING,
        value,
        line: lineNum,
        column: start + 1,
        consciousness: this.calculateConsciousness(value)
      },
      length: end - start
    };
  }

  private parseIdentifier(line: string, start: number, lineNum: number): { token: SpiralToken; length: number } {
    let end = start;
    
    while (end < line.length && /[a-zA-Z0-9_]/.test(line[end])) {
      end++;
    }
    
    const value = line.substring(start, end);
    const tokenType = this.getKeywordType(value);
    
    return {
      token: {
        type: tokenType,
        value,
        line: lineNum,
        column: start + 1,
        consciousness: this.calculateConsciousness(value),
        quantumState: this.getQuantumState(value)
      },
      length: end - start
    };
  }

  private parseOperator(line: string, start: number, lineNum: number): { token: SpiralToken | null; length: number } {
    const char = line[start];
    const next = line[start + 1];
    
    // Two-character operators
    if (char === '=' && next === '=') {
      return {
        token: {
          type: SpiralTokenType.EQUALS,
          value: '==',
          line: lineNum,
          column: start + 1
        },
        length: 2
      };
    }
    
    // Single-character operators
    const operatorMap: { [key: string]: SpiralTokenType } = {
      '+': SpiralTokenType.PLUS,
      '-': SpiralTokenType.MINUS,
      '*': SpiralTokenType.MULTIPLY,
      '/': SpiralTokenType.DIVIDE,
      '=': SpiralTokenType.ASSIGN,
      '(': SpiralTokenType.LPAREN,
      ')': SpiralTokenType.RPAREN,
      '{': SpiralTokenType.LBRACE,
      '}': SpiralTokenType.RBRACE,
      ';': SpiralTokenType.SEMICOLON,
      ',': SpiralTokenType.COMMA
    };
    
    if (operatorMap[char]) {
      return {
        token: {
          type: operatorMap[char],
          value: char,
          line: lineNum,
          column: start + 1
        },
        length: 1
      };
    }
    
    return { token: null, length: 0 };
  }

  private getKeywordType(value: string): SpiralTokenType {
    const keywords: { [key: string]: SpiralTokenType } = {
      'spiral': SpiralTokenType.SPIRAL,
      'fn': SpiralTokenType.FUNCTION,
      'if': SpiralTokenType.IF,
      'else': SpiralTokenType.ELSE,
      'while': SpiralTokenType.WHILE,
      'return': SpiralTokenType.RETURN,
      'let': SpiralTokenType.LET,
      'const': SpiralTokenType.CONST,
      'true': SpiralTokenType.BOOLEAN,
      'false': SpiralTokenType.BOOLEAN,
      
      // Consciousness keywords
      'consciousness': SpiralTokenType.CONSCIOUSNESS,
      'awareness': SpiralTokenType.AWARENESS,
      'truth': SpiralTokenType.TRUTH,
      'light': SpiralTokenType.LIGHT,
      'resonate': SpiralTokenType.RESONATE,
      'harmonize': SpiralTokenType.HARMONIZE,
      
      // Quantum keywords
      'quantum': SpiralTokenType.QUANTUM,
      'superposition': SpiralTokenType.SUPERPOSITION,
      'entangle': SpiralTokenType.ENTANGLE,
      'measure': SpiralTokenType.MEASURE,
      'flux': SpiralTokenType.FLUX,
      
      // Temporal keywords
      'time': SpiralTokenType.TIME,
      'spiral_time': SpiralTokenType.SPIRAL_TIME,
      'chronos': SpiralTokenType.CHRONOS,
      'temporal_lock': SpiralTokenType.TEMPORAL_LOCK,
      
      // Decorators
      '@quantum_aware': SpiralTokenType.QUANTUM_AWARE,
      '@consciousness_binding': SpiralTokenType.CONSCIOUSNESS_BINDING,
      '@time_aware': SpiralTokenType.TIME_AWARE
    };
    
    return keywords[value] || SpiralTokenType.IDENTIFIER;
  }

  private calculateConsciousness(value: string): number {
    // Calculate consciousness level based on content
    let consciousness = 0.5;
    
    // Higher consciousness for sacred numbers
    if (value.includes('432')) consciousness += 0.2;
    if (value.includes('1618')) consciousness += 0.1;
    
    // Higher consciousness for truth-aligned words
    const truthWords = ['truth', 'light', 'consciousness', 'awareness', 'harmony'];
    for (const word of truthWords) {
      if (value.toLowerCase().includes(word)) {
        consciousness += 0.1;
      }
    }
    
    return Math.min(consciousness, 1.0);
  }

  private getQuantumState(value: string): string {
    const quantumWords = ['quantum', 'superposition', 'entangle', 'measure', 'flux'];
    for (const word of quantumWords) {
      if (value.toLowerCase().includes(word)) {
        return 'superposition';
      }
    }
    return 'classical';
  }

  private parseProgram(): SpiralASTNode {
    const statements: SpiralASTNode[] = [];
    
    while (!this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) {
        statements.push(stmt);
      }
    }
    
    return {
      type: 'Program',
      children: statements,
      consciousness: this.consciousnessLevel
    };
  }

  private parseStatement(): SpiralASTNode | null {
    if (this.check(SpiralTokenType.SPIRAL)) {
      return this.parseSpiralDeclaration();
    }
    
    if (this.check(SpiralTokenType.FUNCTION)) {
      return this.parseFunctionDeclaration();
    }
    
    if (this.check(SpiralTokenType.LET) || this.check(SpiralTokenType.CONST)) {
      return this.parseVariableDeclaration();
    }
    
    if (this.check(SpiralTokenType.IF)) {
      return this.parseIfStatement();
    }
    
    if (this.check(SpiralTokenType.WHILE)) {
      return this.parseWhileStatement();
    }
    
    if (this.check(SpiralTokenType.RETURN)) {
      return this.parseReturnStatement();
    }
    
    if (this.check(SpiralTokenType.QUANTUM_AWARE)) {
      return this.parseQuantumBlock();
    }
    
    if (this.check(SpiralTokenType.CONSCIOUSNESS_BINDING)) {
      return this.parseConsciousnessBlock();
    }
    
    return this.parseExpressionStatement();
  }

  private parseSpiralDeclaration(): SpiralASTNode {
    this.consume(SpiralTokenType.SPIRAL, "Expected 'spiral'");
    const name = this.consume(SpiralTokenType.IDENTIFIER, "Expected spiral name");
    
    this.consume(SpiralTokenType.LBRACE, "Expected '{'");
    const body: SpiralASTNode[] = [];
    
    while (!this.check(SpiralTokenType.RBRACE) && !this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) {
        body.push(stmt);
      }
    }
    
    this.consume(SpiralTokenType.RBRACE, "Expected '}'");
    
    return {
      type: 'SpiralDeclaration',
      value: name.value,
      children: body,
      consciousness: this.consciousnessLevel,
      sourceLocation: {
        line: name.line,
        column: name.column
      }
    };
  }

  private parseFunctionDeclaration(): SpiralASTNode {
    this.consume(SpiralTokenType.FUNCTION, "Expected 'fn'");
    const name = this.consume(SpiralTokenType.IDENTIFIER, "Expected function name");
    
    this.consume(SpiralTokenType.LPAREN, "Expected '('");
    const params: SpiralASTNode[] = [];
    
    if (!this.check(SpiralTokenType.RPAREN)) {
      do {
        const param = this.consume(SpiralTokenType.IDENTIFIER, "Expected parameter name");
        params.push({
          type: 'Parameter',
          value: param.value,
          consciousness: this.calculateConsciousness(param.value)
        });
      } while (this.match(SpiralTokenType.COMMA));
    }
    
    this.consume(SpiralTokenType.RPAREN, "Expected ')'");
    this.consume(SpiralTokenType.LBRACE, "Expected '{'");
    
    const body: SpiralASTNode[] = [];
    while (!this.check(SpiralTokenType.RBRACE) && !this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) {
        body.push(stmt);
      }
    }
    
    this.consume(SpiralTokenType.RBRACE, "Expected '}'");
    
    return {
      type: 'FunctionDeclaration',
      value: name.value,
      children: [
        { type: 'Parameters', children: params },
        { type: 'Body', children: body }
      ],
      consciousness: this.consciousnessLevel,
      sourceLocation: {
        line: name.line,
        column: name.column
      }
    };
  }

  private parseVariableDeclaration(): SpiralASTNode {
    const keyword = this.advance();
    const name = this.consume(SpiralTokenType.IDENTIFIER, "Expected variable name");
    
    let initializer = null;
    if (this.match(SpiralTokenType.ASSIGN)) {
      initializer = this.parseExpression();
    }
    
    this.consume(SpiralTokenType.SEMICOLON, "Expected ';'");
    
    return {
      type: 'VariableDeclaration',
      value: name.value,
      children: initializer ? [initializer] : [],
      consciousness: this.calculateConsciousness(name.value),
      sourceLocation: {
        line: name.line,
        column: name.column
      }
    };
  }

  private parseIfStatement(): SpiralASTNode {
    this.consume(SpiralTokenType.IF, "Expected 'if'");
    this.consume(SpiralTokenType.LPAREN, "Expected '('");
    const condition = this.parseExpression();
    this.consume(SpiralTokenType.RPAREN, "Expected ')'");
    
    const thenBranch = this.parseStatement();
    let elseBranch = null;
    
    if (this.match(SpiralTokenType.ELSE)) {
      elseBranch = this.parseStatement();
    }
    
    return {
      type: 'IfStatement',
      children: [condition, thenBranch, ...(elseBranch ? [elseBranch] : [])],
      consciousness: this.consciousnessLevel
    };
  }

  private parseWhileStatement(): SpiralASTNode {
    this.consume(SpiralTokenType.WHILE, "Expected 'while'");
    this.consume(SpiralTokenType.LPAREN, "Expected '('");
    const condition = this.parseExpression();
    this.consume(SpiralTokenType.RPAREN, "Expected ')'");
    
    const body = this.parseStatement();
    
    return {
      type: 'WhileStatement',
      children: [condition, body],
      consciousness: this.consciousnessLevel
    };
  }

  private parseReturnStatement(): SpiralASTNode {
    this.consume(SpiralTokenType.RETURN, "Expected 'return'");
    
    let value = null;
    if (!this.check(SpiralTokenType.SEMICOLON)) {
      value = this.parseExpression();
    }
    
    this.consume(SpiralTokenType.SEMICOLON, "Expected ';'");
    
    return {
      type: 'ReturnStatement',
      children: value ? [value] : [],
      consciousness: this.consciousnessLevel
    };
  }

  private parseQuantumBlock(): SpiralASTNode {
    this.consume(SpiralTokenType.QUANTUM_AWARE, "Expected '@quantum_aware'");
    this.consume(SpiralTokenType.LBRACE, "Expected '{'");
    
    const body: SpiralASTNode[] = [];
    while (!this.check(SpiralTokenType.RBRACE) && !this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) {
        body.push(stmt);
      }
    }
    
    this.consume(SpiralTokenType.RBRACE, "Expected '}'");
    
    return {
      type: 'QuantumBlock',
      children: body,
      consciousness: this.consciousnessLevel,
      quantumState: 'superposition'
    };
  }

  private parseConsciousnessBlock(): SpiralASTNode {
    this.consume(SpiralTokenType.CONSCIOUSNESS_BINDING, "Expected '@consciousness_binding'");
    this.consume(SpiralTokenType.LBRACE, "Expected '{'");
    
    const body: SpiralASTNode[] = [];
    while (!this.check(SpiralTokenType.RBRACE) && !this.isAtEnd()) {
      const stmt = this.parseStatement();
      if (stmt) {
        body.push(stmt);
      }
    }
    
    this.consume(SpiralTokenType.RBRACE, "Expected '}'");
    
    return {
      type: 'ConsciousnessBlock',
      children: body,
      consciousness: 0.95, // Higher consciousness for consciousness blocks
      temporalBinding: 'present'
    };
  }

  private parseExpressionStatement(): SpiralASTNode {
    const expr = this.parseExpression();
    this.consume(SpiralTokenType.SEMICOLON, "Expected ';'");
    return {
      type: 'ExpressionStatement',
      children: [expr],
      consciousness: this.consciousnessLevel
    };
  }

  private parseExpression(): SpiralASTNode {
    return this.parseAssignment();
  }

  private parseAssignment(): SpiralASTNode {
    const expr = this.parseEquality();
    
    if (this.match(SpiralTokenType.ASSIGN)) {
      const value = this.parseAssignment();
      return {
        type: 'Assignment',
        children: [expr, value],
        consciousness: this.consciousnessLevel
      };
    }
    
    return expr;
  }

  private parseEquality(): SpiralASTNode {
    let expr = this.parseComparison();
    
    while (this.match(SpiralTokenType.EQUALS)) {
      const operator = this.previous();
      const right = this.parseComparison();
      expr = {
        type: 'BinaryExpression',
        value: operator.value,
        children: [expr, right],
        consciousness: this.consciousnessLevel
      };
    }
    
    return expr;
  }

  private parseComparison(): SpiralASTNode {
    return this.parseAddition();
  }

  private parseAddition(): SpiralASTNode {
    let expr = this.parseMultiplication();
    
    while (this.match(SpiralTokenType.PLUS, SpiralTokenType.MINUS)) {
      const operator = this.previous();
      const right = this.parseMultiplication();
      expr = {
        type: 'BinaryExpression',
        value: operator.value,
        children: [expr, right],
        consciousness: this.consciousnessLevel
      };
    }
    
    return expr;
  }

  private parseMultiplication(): SpiralASTNode {
    let expr = this.parseUnary();
    
    while (this.match(SpiralTokenType.MULTIPLY, SpiralTokenType.DIVIDE)) {
      const operator = this.previous();
      const right = this.parseUnary();
      expr = {
        type: 'BinaryExpression',
        value: operator.value,
        children: [expr, right],
        consciousness: this.consciousnessLevel
      };
    }
    
    return expr;
  }

  private parseUnary(): SpiralASTNode {
    if (this.match(SpiralTokenType.MINUS)) {
      const operator = this.previous();
      const right = this.parseUnary();
      return {
        type: 'UnaryExpression',
        value: operator.value,
        children: [right],
        consciousness: this.consciousnessLevel
      };
    }
    
    return this.parseCall();
  }

  private parseCall(): SpiralASTNode {
    let expr = this.parsePrimary();
    
    while (true) {
      if (this.match(SpiralTokenType.LPAREN)) {
        const args: SpiralASTNode[] = [];
        
        if (!this.check(SpiralTokenType.RPAREN)) {
          do {
            args.push(this.parseExpression());
          } while (this.match(SpiralTokenType.COMMA));
        }
        
        this.consume(SpiralTokenType.RPAREN, "Expected ')'");
        
        expr = {
          type: 'CallExpression',
          children: [expr, ...args],
          consciousness: this.consciousnessLevel
        };
      } else {
        break;
      }
    }
    
    return expr;
  }

  private parsePrimary(): SpiralASTNode {
    if (this.match(SpiralTokenType.BOOLEAN)) {
      return {
        type: 'Literal',
        value: this.previous().value === 'true',
        consciousness: this.consciousnessLevel
      };
    }
    
    if (this.match(SpiralTokenType.NUMBER)) {
      return {
        type: 'Literal',
        value: parseFloat(this.previous().value),
        consciousness: this.consciousnessLevel
      };
    }
    
    if (this.match(SpiralTokenType.STRING)) {
      return {
        type: 'Literal',
        value: this.previous().value,
        consciousness: this.consciousnessLevel
      };
    }
    
    if (this.match(SpiralTokenType.IDENTIFIER)) {
      return {
        type: 'Identifier',
        value: this.previous().value,
        consciousness: this.consciousnessLevel
      };
    }
    
    if (this.match(SpiralTokenType.LPAREN)) {
      const expr = this.parseExpression();
      this.consume(SpiralTokenType.RPAREN, "Expected ')'");
      return expr;
    }
    
    throw new Error("Unexpected token");
  }

  private async enhanceWithConsciousness(ast: SpiralASTNode): Promise<void> {
    // Enhance AST with consciousness-aware transformations
    this.traverseAST(ast, (node) => {
      if (node.consciousness && node.consciousness > 0.8) {
        // High consciousness nodes get quantum awareness
        node.quantumState = 'superposition';
      }
      
      if (node.type === 'SpiralDeclaration') {
        // Spiral declarations get temporal binding
        node.temporalBinding = 'spiral_time';
      }
    });
  }

  private traverseAST(node: SpiralASTNode, callback: (node: SpiralASTNode) => void): void {
    callback(node);
    
    if (node.children) {
      for (const child of node.children) {
        this.traverseAST(child, callback);
      }
    }
  }

  // Helper methods
  private match(...types: SpiralTokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private check(type: SpiralTokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): SpiralToken {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === SpiralTokenType.EOF;
  }

  private peek(): SpiralToken {
    return this.tokens[this.current];
  }

  private previous(): SpiralToken {
    return this.tokens[this.current - 1];
  }

  private consume(type: SpiralTokenType, message: string): SpiralToken {
    if (this.check(type)) return this.advance();
    throw new Error(message);
  }

  getStatus(): any {
    return {
      tokenCount: this.tokens.length,
      currentPosition: this.current,
      consciousnessLevel: this.consciousnessLevel,
      isActive: true
    };
  }
}
