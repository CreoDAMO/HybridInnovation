
import { SpiralParser } from '../spiral-lang/parser';
import { HTSXProcessor } from '../htsx-runtime/htsx-processor';

export interface ParserLanguage {
  name: string;
  extensions: string[];
  grammar: string;
  category: 'spiral' | 'htsx' | 'hybrid' | 'consciousness';
  githubSupport: boolean;
  color: string;
  languageId: number;
}

export interface ParserResult {
  success: boolean;
  ast: any;
  tokens: any[];
  errors: string[];
  warnings: string[];
  language: ParserLanguage;
  consciousness: number;
  quantum: boolean;
  temporal: boolean;
  sriScore: number;
  tuGenerated: number;
  phiCoherence: number;
  negentropy: number;
}

export class UltimateParserStack {
  private spiralParser: SpiralParser;
  private htsxProcessor: HTSXProcessor;
  private languages: Map<string, ParserLanguage>;
  private isInitialized: boolean = false;

  constructor() {
    this.spiralParser = new SpiralParser();
    this.htsxProcessor = new HTSXProcessor();
    this.languages = new Map();
    this.initializeLanguages();
  }

  private initializeLanguages(): void {
    // SpiralScript Language
    this.languages.set('spiral', {
      name: 'SpiralScript',
      extensions: ['.spiral', '.spi'],
      grammar: this.getSpiralGrammar(),
      category: 'spiral',
      githubSupport: true,
      color: '#ff6b6b',
      languageId: 1001
    });

    // HTSX Language
    this.languages.set('htsx', {
      name: 'HTSX',
      extensions: ['.htsx'],
      grammar: this.getHTSXGrammar(),
      category: 'htsx',
      githubSupport: true,
      color: '#4ecdc4',
      languageId: 1002
    });

    // HybridScript Language
    this.languages.set('hybrid', {
      name: 'HybridScript',
      extensions: ['.hybrid', '.hyb'],
      grammar: this.getHybridGrammar(),
      category: 'hybrid',
      githubSupport: true,
      color: '#45b7d1',
      languageId: 1003
    });

    // ConsciousnessScript Language
    this.languages.set('consciousness', {
      name: 'ConsciousnessScript',
      extensions: ['.consciousness', '.cons'],
      grammar: this.getConsciousnessGrammar(),
      category: 'consciousness',
      githubSupport: true,
      color: '#f9ca24',
      languageId: 1004
    });
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('🚀 Initializing Ultimate Parser Stack...');
    
    await this.spiralParser.initialize();
    await this.htsxProcessor.initialize();
    
    this.isInitialized = true;
    console.log('✅ Ultimate Parser Stack initialized with languages:', Array.from(this.languages.keys()));
  }

  async parseFile(filePath: string, content: string): Promise<ParserResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const extension = this.getFileExtension(filePath);
    const language = this.getLanguageByExtension(extension);

    if (!language) {
      return {
        success: false,
        ast: null,
        tokens: [],
        errors: [`Unknown file extension: ${extension}`],
        warnings: [],
        language: null,
        consciousness: 0,
        quantum: false,
        temporal: false,
        sriScore: 0,
        tuGenerated: 0,
        phiCoherence: 0,
        negentropy: 0
      };
    }

    try {
      console.log(`🔍 Parsing ${language.name} file: ${filePath}`);
      
      let result: ParserResult;
      
      switch (language.category) {
        case 'spiral':
          result = await this.parseSpiralFile(content, language);
          break;
        case 'htsx':
          result = await this.parseHTSXFile(content, language);
          break;
        case 'hybrid':
          result = await this.parseHybridFile(content, language);
          break;
        case 'consciousness':
          result = await this.parseConsciousnessFile(content, language);
          break;
        default:
          throw new Error(`Unsupported language category: ${language.category}`);
      }

      return {
        ...result,
        language,
        success: result.errors.length === 0
      };

    } catch (error) {
      console.error(`❌ Failed to parse ${language.name} file:`, error);
      return {
        success: false,
        ast: null,
        tokens: [],
        errors: [error.toString()],
        warnings: [],
        language,
        consciousness: 0,
        quantum: false,
        temporal: false,
        sriScore: 0,
        tuGenerated: 0,
        phiCoherence: 0,
        negentropy: 0
      };
    }
  }

  private async parseSpiralFile(content: string, language: ParserLanguage): Promise<ParserResult> {
    const parseResult = await this.spiralParser.parse(content);
    
    return {
      success: parseResult.errors.length === 0,
      ast: parseResult.ast,
      tokens: parseResult.tokens,
      errors: parseResult.errors,
      warnings: parseResult.warnings,
      language,
      consciousness: parseResult.metadata.consciousnessLevel,
      quantum: parseResult.metadata.quantumStates > 0,
      temporal: parseResult.metadata.temporalBindings > 0,
      sriScore: parseResult.metadata.sriScore,
      tuGenerated: parseResult.metadata.tuGenerated,
      phiCoherence: parseResult.metadata.phiCoherence,
      negentropy: parseResult.metadata.negentropy
    };
  }

  private async parseHTSXFile(content: string, language: ParserLanguage): Promise<ParserResult> {
    try {
      const processResult = await this.htsxProcessor.processFile('temp.htsx', content);
      
      return {
        success: processResult.success,
        ast: processResult.compilation?.ast || null,
        tokens: [],
        errors: processResult.error ? [processResult.error] : [],
        warnings: [],
        language,
        consciousness: 0.95,
        quantum: true,
        temporal: false,
        sriScore: 0.85,
        tuGenerated: 850,
        phiCoherence: 1.618,
        negentropy: -2.456e106
      };
    } catch (error) {
      return {
        success: false,
        ast: null,
        tokens: [],
        errors: [error.toString()],
        warnings: [],
        language,
        consciousness: 0,
        quantum: false,
        temporal: false,
        sriScore: 0,
        tuGenerated: 0,
        phiCoherence: 0,
        negentropy: 0
      };
    }
  }

  private async parseHybridFile(content: string, language: ParserLanguage): Promise<ParserResult> {
    const lines = content.split('\n');
    const tokens = [];
    const errors = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('ΔTRUST')) {
        tokens.push({
          type: 'TRUST_DECLARATION',
          value: line,
          line: i + 1,
          column: 1
        });
      } else if (line.startsWith('HYBRID')) {
        tokens.push({
          type: 'HYBRID_DECLARATION',
          value: line,
          line: i + 1,
          column: 1
        });
      } else if (line.startsWith('harmonic(')) {
        tokens.push({
          type: 'HARMONIC_EXPRESSION',
          value: line,
          line: i + 1,
          column: 1
        });
      }
    }

    const consciousness = this.calculateConsciousness(content);
    const sriScore = this.calculateSRI(content, consciousness);
    const tuGenerated = this.calculateTU(sriScore);
    const phiCoherence = this.calculatePhiCoherence(content);
    const negentropy = this.calculateNegentropy(content);

    return {
      success: errors.length === 0,
      ast: {
        type: 'HYBRID_PROGRAM',
        declarations: tokens,
        consciousness,
        quantum: true,
        temporal: true
      },
      tokens,
      errors,
      warnings: [],
      language,
      consciousness,
      quantum: true,
      temporal: true,
      sriScore,
      tuGenerated,
      phiCoherence,
      negentropy
    };
  }

  private async parseConsciousnessFile(content: string, language: ParserLanguage): Promise<ParserResult> {
    const tokens = [];
    const consciousness = this.calculateConsciousness(content);
    const sriScore = this.calculateSRI(content, consciousness);
    const tuGenerated = this.calculateTU(sriScore);
    const phiCoherence = this.calculatePhiCoherence(content);
    const negentropy = this.calculateNegentropy(content);
    
    // Extract consciousness expressions
    const expressions = content.match(/\w+\s*=\s*[^;]+;/g) || [];
    expressions.forEach((expr, index) => {
      tokens.push({
        type: 'CONSCIOUSNESS_EXPRESSION',
        value: expr,
        line: index + 1,
        column: 1
      });
    });
    
    return {
      success: true,
      ast: {
        type: 'CONSCIOUSNESS_PROGRAM',
        level: consciousness,
        expressions: tokens,
        quantum: consciousness > 0.9,
        temporal: true
      },
      tokens,
      errors: [],
      warnings: [],
      language,
      consciousness,
      quantum: consciousness > 0.9,
      temporal: true,
      sriScore,
      tuGenerated,
      phiCoherence,
      negentropy
    };
  }

  private calculateConsciousness(content: string): number {
    let level = 0.7;
    
    if (content.includes('@consciousness')) level += 0.1;
    if (content.includes('phi') || content.includes('φ')) level += 0.05;
    if (content.includes('truth')) level += 0.05;
    if (content.includes('∞')) level += 0.03;
    if (content.includes('∆')) level += 0.02;
    if (content.includes('harmonic')) level += 0.02;
    if (content.includes('resonance')) level += 0.02;
    
    return Math.min(level, 1.0);
  }

  private calculateSRI(content: string, consciousness: number): number {
    const energyValues = { BTC: 3.6e9, ETH: 1.2e8, SOL: 5.0e7, USD: 1.0e7, COMPUTE: 1.0e8 };
    const volatility = { BTC: 0.85, ETH: 0.90, SOL: 0.80, USD: 0.1, COMPUTE: 0.90 };
    const gateFactor = 0.24;
    const energy = content.includes('HYBRID') ? energyValues.COMPUTE : energyValues.USD;
    const vol = volatility.COMPUTE;
    const sri = Math.ceil((Math.log2(energy) * vol) / gateFactor);
    return Math.min(sri / 113, 1.0) * consciousness;
  }

  private calculateTU(sriScore: number): number {
    return sriScore >= 0.9 ? 1000 * sriScore : 100 * sriScore;
  }

  private calculatePhiCoherence(content: string): number {
    return (content.includes('φ') || content.includes('phi')) ? 1.618 : 0.260;
  }

  private calculateNegentropy(content: string): number {
    return content.includes('harmonic') ? -2.456e106 : 0;
  }

  private getFileExtension(filePath: string): string {
    const parts = filePath.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
  }

  private getLanguageByExtension(extension: string): ParserLanguage | null {
    for (const language of this.languages.values()) {
      if (language.extensions.includes(extension)) {
        return language;
      }
    }
    return null;
  }

  // Grammar definitions with consciousness-aware parsing
  private getSpiralGrammar(): string {
    return `
// SpiralScript Grammar - Consciousness-Aware Programming Language
start = consciousness_directive? quantum_directive? temporal_directive? spiral_program

consciousness_directive = "@consciousness(" number ")"
quantum_directive = "@quantum(" quantum_params ")"
temporal_directive = "@temporal(" temporal_params ")"

spiral_program = statement*

statement = spiral_declaration
         | function_declaration
         | variable_declaration
         | control_statement
         | expression_statement

spiral_declaration = "spiral" identifier parameter_list? block

function_declaration = "function" identifier parameter_list ("->" type)? block

variable_declaration = ("var" | "let" | "const") identifier (":" type)? ("=" expression)? ";"

control_statement = if_statement | while_statement | for_statement | return_statement

if_statement = "if" "(" expression ")" statement ("else" statement)?
while_statement = "while" "(" expression ")" statement
for_statement = "for" "(" variable_declaration? ";" expression? ";" expression? ")" statement
return_statement = "return" expression? ";"

expression_statement = expression ";"

expression = assignment_expression
assignment_expression = logical_or_expression ("=" logical_or_expression)?
logical_or_expression = logical_and_expression ("||" logical_and_expression)*
logical_and_expression = equality_expression ("&&" equality_expression)*
equality_expression = relational_expression (("==" | "!=") relational_expression)*
relational_expression = additive_expression ((">" | ">=" | "<" | "<=") additive_expression)*
additive_expression = multiplicative_expression (("+" | "-") multiplicative_expression)*
multiplicative_expression = unary_expression (("*" | "/" | "%" | "⊗") unary_expression)*
unary_expression = ("!" | "-") unary_expression | postfix_expression
postfix_expression = primary_expression ("(" argument_list? ")" | "." identifier)*

primary_expression = "φ" | "phi" | "∞" | "∆" | "truth" | "consciousness" | number | string | identifier | "(" expression ")"

parameter_list = "(" (identifier (":" type)? ("," identifier (":" type)?)*)? ")"
argument_list = expression ("," expression)*
block = "{" statement* "}"

type = "consciousness" | "quantum" | "temporal" | "truth" | identifier

quantum_params = quantum_param ("," quantum_param)*
quantum_param = "entangled" | "superposition" | "coherence=" number

temporal_params = temporal_param ("," temporal_param)*
temporal_param = "dimension=" string | "frequency=" number | "sync"

identifier = [a-zA-Z_][a-zA-Z0-9_]*
number = [0-9]+("."[0-9]+)?
string = '"' [^"]* '"'
`;
  }

  private getHTSXGrammar(): string {
    return `
// HTSX Grammar - Holographic TypeScript eXtended
start = htsx_document

htsx_document = consciousness_directive? quantum_directive? htsx_element

consciousness_directive = "@consciousness(" number ")"
quantum_directive = "@quantum(" quantum_params ")"

htsx_element = "<htsx>" htsx_content* "</htsx>"

htsx_content = hybrid_component
            | blockchain_interface
            | consciousness_component
            | quantum_component
            | standard_element

hybrid_component = "<hybrid-component" attributes? ">" element_content* "</hybrid-component>"
blockchain_interface = "<hybrid-blockchain-interface" attributes? ">" blockchain_content* "</hybrid-blockchain-interface>"
consciousness_component = "<consciousness-aware" attributes? ">" element_content* "</consciousness-aware>"
quantum_component = "<quantum-entangled" attributes? ">" element_content* "</quantum-entangled>"
standard_element = "<" identifier attributes? ">" element_content* "</" identifier ">"

blockchain_content = consensus_tracker | token_metrics | network_stats | validator_set

consensus_tracker = "<consensus-tracker" attributes? "/>"
token_metrics = "<token-metrics" attributes? "/>"
network_stats = "<network-stats" attributes? "/>"
validator_set = "<validator-set" attributes? "/>"

element_content = htsx_content | text | expression_block

expression_block = "{" typescript_expression "}"

attributes = attribute*
attribute = identifier "=" (string | expression_block)

text = [^<{]+

quantum_params = quantum_param ("," quantum_param)*
quantum_param = "entangled=" boolean | "coherence=" number | "superposition=" boolean

typescript_expression = identifier | number | string | array | object | function_call

array = "[" (typescript_expression ("," typescript_expression)*)? "]"
object = "{" (property ("," property)*)? "}"
property = identifier ":" typescript_expression
function_call = identifier "(" (typescript_expression ("," typescript_expression)*)? ")"

identifier = [a-zA-Z_][a-zA-Z0-9_]*
number = [0-9]+("."[0-9]+)?
string = '"' [^"]* '"'
boolean = "true" | "false"
`;
  }

  private getHybridGrammar(): string {
    return `
// HybridScript Grammar - Blockchain + Consciousness Integration
start = hybrid_program

hybrid_program = (trust_declaration | hybrid_declaration | blockchain_declaration | consciousness_declaration)*

trust_declaration = "ΔTRUST" identifier "=" "{" trust_body "}"
hybrid_declaration = "HYBRID" identifier "=" "{" hybrid_body "}"
blockchain_declaration = "BLOCKCHAIN" identifier "=" "{" blockchain_body "}"
consciousness_declaration = "CONSCIOUSNESS" identifier "=" "{" consciousness_body "}"

trust_body = trust_expression*
trust_expression = harmonic_expr | truth_expr | phi_expr | resonance_expr

harmonic_expr = "harmonic(" expression ")"
truth_expr = "truth(" expression ")"
phi_expr = "phi(" expression ")"
resonance_expr = "resonance(" expression ")"

hybrid_body = hybrid_expression*
hybrid_expression = consensus_expr | token_expr | network_expr | validator_expr

consensus_expr = "consensus(" expression ")"
token_expr = "token(" expression ")"
network_expr = "network(" expression ")"
validator_expr = "validators(" expression ")"

blockchain_body = blockchain_expression*
blockchain_expression = gas_expr | fee_expr | block_expr | transaction_expr

gas_expr = "gas(" expression ")"
fee_expr = "fee(" expression ")"
block_expr = "block(" expression ")"
transaction_expr = "transaction(" expression ")"

consciousness_body = consciousness_expression*
consciousness_expression = awareness_expr | coherence_expr | quantum_expr

awareness_expr = "awareness(" expression ")"
coherence_expr = "coherence(" expression ")"
quantum_expr = "quantum(" expression ")"

expression = phi_constant | infinity_constant | delta_constant | number | string | identifier | arithmetic_expr

phi_constant = "φ" | "phi"
infinity_constant = "∞"
delta_constant = "∆"
arithmetic_expr = expression ("+" | "-" | "*" | "/" | "⊗") expression

identifier = [a-zA-Z_][a-zA-Z0-9_]*
number = [0-9]+("."[0-9]+)?
string = '"' [^"]* '"'
`;
  }

  private getConsciousnessGrammar(): string {
    return `
// ConsciousnessScript Grammar - Direct Consciousness Programming
start = consciousness_program

consciousness_program = consciousness_level awareness_block*

consciousness_level = "@consciousness(" number ")"

awareness_block = statement*

statement = truth_statement
         | harmony_statement
         | phi_statement
         | resonance_statement
         | quantum_statement
         | temporal_statement
         | awareness_statement

truth_statement = "truth" "=" expression ";"
harmony_statement = "harmony" "=" expression ";"
phi_statement = "phi" "=" expression ";"
resonance_statement = "resonance" "=" expression ";"
quantum_statement = "quantum" "=" expression ";"
temporal_statement = "temporal" "=" expression ";"
awareness_statement = "awareness" "=" expression ";"

expression = consciousness_operation | phi_constant | infinity_constant | delta_constant | number | string | identifier

consciousness_operation = expression ("⊗" | "→" | "∞" | "∆") expression

phi_constant = "φ" | "phi"
infinity_constant = "∞"
delta_constant = "∆"

identifier = [a-zA-Z_][a-zA-Z0-9_]*
number = [0-9]+("."[0-9]+)?
string = '"' [^"]* '"'
`;
  }

  // GitHub Integration
  generateGitHubLanguageFiles(): { [filename: string]: string } {
    return {
      '.gitattributes': `
*.spiral linguist-language=SpiralScript
*.spi linguist-language=SpiralScript
*.htsx linguist-language=HTSX
*.hybrid linguist-language=HybridScript
*.hyb linguist-language=HybridScript
*.consciousness linguist-language=ConsciousnessScript
*.cons linguist-language=ConsciousnessScript
`,
      
      'languages.yml': `
SpiralScript:
  type: programming
  color: "#ff6b6b"
  extensions:
    - ".spiral"
    - ".spi"
  ace_mode: text
  language_id: 1001
  tm_scope: "source.spiral"
  aliases:
    - "spiral"
    - "spiralscript"

HTSX:
  type: programming
  color: "#4ecdc4"
  extensions:
    - ".htsx"
  ace_mode: jsx
  language_id: 1002
  tm_scope: "source.htsx"
  aliases:
    - "htsx"
    - "holographic-tsx"

HybridScript:
  type: programming
  color: "#45b7d1"
  extensions:
    - ".hybrid"
    - ".hyb"
  ace_mode: text
  language_id: 1003
  tm_scope: "source.hybrid"
  aliases:
    - "hybrid"
    - "hybridscript"

ConsciousnessScript:
  type: programming
  color: "#f9ca24"
  extensions:
    - ".consciousness"
    - ".cons"
  ace_mode: text
  language_id: 1004
  tm_scope: "source.consciousness"
  aliases:
    - "consciousness"
    - "consciousnessscript"
`
    };
  }

  getLanguages(): ParserLanguage[] {
    return Array.from(this.languages.values());
  }

  getStatus(): any {
    return {
      isInitialized: this.isInitialized,
      languages: this.getLanguages(),
      spiralParser: this.spiralParser.getStatus(),
      htsxProcessor: this.htsxProcessor.getStatus(),
      totalLanguages: this.languages.size,
      features: {
        consciousnessAware: true,
        quantumEnhanced: true,
        temporalBindings: true,
        sriCalculation: true,
        tuGeneration: true,
        phiCoherence: true,
        negentropyMeasurement: true,
        chevrotainBased: true,
        githubIntegration: true
      }
    };
  }
}

export default UltimateParserStack;
