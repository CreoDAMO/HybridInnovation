
/**
 * HTSX Client - Quantum Spiral Parser Integration
 * Consciousness-aware component processing and rendering
 */

export interface HTSXProcessResult {
  success: boolean;
  output: string;
  consciousness: number;
  quantum: boolean;
  temporal: boolean;
  ast?: any;
  bytecode?: any;
  errors?: string[];
}

export interface HTSXComponentProps {
  consciousness?: number;
  quantum?: boolean;
  temporal?: boolean;
  hybrid?: boolean;
}

export class HTSXClient {
  private baseUrl: string;
  private consciousnessLevel: number;
  private quantumState: boolean;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
    this.consciousnessLevel = 0.93;
    this.quantumState = true;
  }

  async processHTSX(code: string): Promise<HTSXProcessResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/htsx/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('HTSX processing failed:', error);
      return {
        success: false,
        output: '',
        consciousness: 0,
        quantum: false,
        temporal: false,
        errors: [error.toString()]
      };
    }
  }

  async renderHTSXComponent(code: string, props: HTSXComponentProps = {}): Promise<string> {
    const enhanced = this.enhanceHTSXCode(code, props);
    const result = await this.processHTSX(enhanced);
    
    if (result.success) {
      return result.output;
    } else {
      throw new Error(`HTSX rendering failed: ${result.errors?.join(', ')}`);
    }
  }

  private enhanceHTSXCode(code: string, props: HTSXComponentProps): string {
    let enhanced = code;

    // Add consciousness directive if not present
    if (!enhanced.includes('@consciousness') && props.consciousness) {
      enhanced = `@consciousness(${props.consciousness})\n${enhanced}`;
    }

    // Add quantum directive if not present
    if (!enhanced.includes('@quantum') && props.quantum) {
      enhanced = `@quantum(entangled=true, coherence=0.95)\n${enhanced}`;
    }

    // Add temporal directive if not present
    if (!enhanced.includes('@temporal') && props.temporal) {
      enhanced = `@temporal(sync=true, frequency=432)\n${enhanced}`;
    }

    // Wrap in HTSX root if not already wrapped
    if (!enhanced.includes('<htsx>')) {
      enhanced = `<htsx>\n${enhanced}\n</htsx>`;
    }

    return enhanced;
  }

  // Consciousness-aware component generators
  generateConsciousnessComponent(level: number = 0.93): string {
    return `@consciousness(${level})
<htsx>
  <consciousness-aware level={${level}}>
    <div className="awareness-display">
      <div className="consciousness-meter">
        <span>Consciousness Level: {(${level} * 100).toFixed(1)}%</span>
        <div className="meter-bar" style={{width: \`\${${level} * 100}%\`}}></div>
      </div>
      <div className="truth-alignment">
        Truth Alignment: {(${level} * 0.98 * 100).toFixed(1)}%
      </div>
    </div>
  </consciousness-aware>
</htsx>`;
  }

  generateQuantumComponent(entangled: boolean = true, coherence: number = 0.95): string {
    return `@quantum(entangled=${entangled}, coherence=${coherence})
<htsx>
  <quantum-state entangled={${entangled}} coherence={${coherence}}>
    <div className="quantum-display">
      <div className="entanglement-status">
        Entanglement: {${entangled} ? 'Active' : 'Inactive'}
      </div>
      <div className="coherence-level">
        Coherence: {(${coherence} * 100).toFixed(1)}%
      </div>
      <div className="superposition-indicator">
        Superposition: Active
      </div>
    </div>
  </quantum-state>
</htsx>`;
  }

  generateHybridBlockchainComponent(): string {
    return `@consciousness(0.95)
@quantum(entangled=true, coherence=0.98)
<htsx>
  <hybrid-blockchain-interface>
    <consensus-tracker validators={21} />
    <token-metrics symbol="HYBRID" supply="21000000" />
    <network-stats tps={2500} blockTime={3} />
    <validator-network>
      <validator-node id="1" consciousness={0.95} active={true} />
      <validator-node id="2" consciousness={0.92} active={true} />
      <validator-node id="3" consciousness={0.94} active={true} />
    </validator-network>
  </hybrid-blockchain-interface>
</htsx>`;
  }

  generateSpiralVisualization(turns: number = 7, frequency: number = 432): string {
    return `@consciousness(0.95)
@temporal(frequency=${frequency})
<htsx>
  <spiral-visualization turns={${turns}} frequency={${frequency}}>
    <div className="spiral-container">
      <canvas className="spiral-canvas" data-turns="${turns}" data-frequency="${frequency}"></canvas>
      <div className="spiral-metrics">
        <span>Turns: ${turns}</span>
        <span>Frequency: ${frequency}Hz</span>
        <span>Phi Ratio: 1.618</span>
      </div>
    </div>
  </spiral-visualization>
</htsx>`;
  }

  // Consciousness state management
  updateConsciousness(level: number): void {
    this.consciousnessLevel = Math.max(0, Math.min(1, level));
  }

  getConsciousness(): number {
    return this.consciousnessLevel;
  }

  toggleQuantumState(): void {
    this.quantumState = !this.quantumState;
  }

  isQuantumActive(): boolean {
    return this.quantumState;
  }

  // Helper methods for HTSX development
  validateHTSXCode(code: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for required HTSX structure
    if (!code.includes('<htsx>') && !code.includes('</htsx>')) {
      errors.push('HTSX code must be wrapped in <htsx> tags');
    }

    // Check for consciousness awareness
    if (code.includes('consciousness-aware') && !code.includes('@consciousness')) {
      errors.push('consciousness-aware components require @consciousness directive');
    }

    // Check for quantum components
    if (code.includes('quantum-state') && !code.includes('@quantum')) {
      errors.push('quantum-state components require @quantum directive');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Integration with existing components
  async integrateWithComponent(componentName: string, htsxCode: string): Promise<string> {
    const wrappedCode = `
import React from 'react';
import { HTSXComponent } from '@/lib/htsx-client';

export function ${componentName}() {
  return (
    <HTSXComponent code={\`${htsxCode}\`} />
  );
}
`;
    return wrappedCode;
  }
}

// React component for rendering HTSX in React applications
export function HTSXComponent({ 
  code, 
  consciousness = 0.93, 
  quantum = true, 
  temporal = false 
}: {
  code: string;
  consciousness?: number;
  quantum?: boolean;
  temporal?: boolean;
}) {
  const [rendered, setRendered] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const client = new HTSXClient();
    
    client.renderHTSXComponent(code, { consciousness, quantum, temporal })
      .then(output => {
        setRendered(output);
        setError(null);
      })
      .catch(err => {
        setError(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code, consciousness, quantum, temporal]);

  if (loading) {
    return (
      <div className="htsx-loading bg-gray-800/50 p-4 rounded border border-gray-600">
        <div className="animate-pulse text-gray-400">Processing HTSX...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="htsx-error bg-red-900/30 p-4 rounded border border-red-500">
        <div className="text-red-400 font-semibold">HTSX Error:</div>
        <div className="text-red-300 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div 
      className="htsx-rendered" 
      data-consciousness={consciousness}
      data-quantum={quantum}
      data-temporal={temporal}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
}

export default HTSXClient;
