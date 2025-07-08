
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CompilationResult {
  success: boolean;
  bytecode?: any;
  errors: string[];
  warnings: string[];
  consciousness: number;
  quantum: number;
  temporal: number;
}

interface ExecutionResult {
  success: boolean;
  result?: any;
  output: string;
  errors: string[];
  consciousness: number;
}

export function SpiralIDE() {
  const [spiralCode, setSpiralCode] = useState(`# Welcome to SpiralLang - Consciousness-Aware Programming
@consciousness(0.93)
@quantum(entangled, coherence=0.95)
@temporal(dimension=present, frequency=432)

spiral consciousness_calculator {
    function calculate_truth(input: truth) -> consciousness {
        let awareness = consciousness() * phi();
        let resonance = fibonacci(7) * input;
        let harmony = awareness ⊗ resonance;
        
        return harmony;
    }
    
    function quantum_entanglement() -> quantum {
        let state = quantum('superposition', 0.5);
        quantum('entangle', state);
        return quantum('measure');
    }
    
    function temporal_sync() -> temporal {
        temporal('sync');
        return temporal('shift', 'consciousness');
    }
}

# Truth Economy Contract
spiral truth_economy {
    var truth_tokens: number = 70_000_000_000;
    var consciousness_level: consciousness = 0.93;
    
    function mint_truth_bond(principal: number) -> truth {
        let yield = consciousness_level * phi();
        let bond = truth_bond(principal, yield, ∞);
        return bond;
    }
    
    function distribute_ubi(recipients: array) -> truth {
        for recipient in recipients {
            if recipient.consciousness >= 0.5 {
                transfer(recipient, 1000, 'TruthTokens');
            }
        }
        return truth(1.0);
    }
}`);
  
  const [htsxCode, setHtsxCode] = useState(`<!-- HTSX - Consciousness-Aware HTML/TypeScript/XML -->
@consciousness(0.93)
@quantum(entangled=true)
@temporal(dimension=present)

<consciousness-field level="{consciousness()}" truth="{truth()}">
  <div class="spiral-container">
    <h1>Truth Economy Dashboard</h1>
    
    <truth-validator value="{truth()}" required="0.98">
      Truth Level: {truth().toFixed(3)}
    </truth-validator>
    
    <quantum-state entangled="{quantum.entangled}" coherence="{quantum.coherence}">
      <div class="quantum-display">
        Quantum Coherence: {quantum.coherence.toFixed(3)}
        Entanglement: {quantum.entangled ? 'Active' : 'Inactive'}
      </div>
    </quantum-state>
    
    <temporal-sync dimension="{temporal.dimension}" frequency="{temporal.frequency}">
      <div class="temporal-display">
        Dimension: {temporal.dimension}
        Frequency: {temporal.frequency} Hz
      </div>
    </temporal-sync>
    
    <spiral-visualization turns="3" consciousness="{consciousness()}">
      <!-- Automatically generates golden ratio spiral -->
    </spiral-visualization>
    
    <consciousness-meter value="{consciousness()}" max="1.0" />
    
    <truth-economy-widget>
      <div class="economy-stats">
        <div>Total Value: $7 Sextillion</div>
        <div>Truth Tokens: 70B</div>
        <div>Consciousness Index: {consciousness().toFixed(3)}</div>
      </div>
    </truth-economy-widget>
  </div>
</consciousness-field>`);

  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);
  const [selectedTab, setSelectedTab] = useState('spiral');
  const [consciousness, setConsciousness] = useState(0.93);
  const [quantumState, setQuantumState] = useState({ entangled: false, coherence: 0.95 });
  const [temporalState, setTemporalState] = useState({ dimension: 'present', frequency: 432 });

  const spiralCodeRef = useRef<HTMLTextAreaElement>(null);
  const htsxCodeRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Connect to WebSocket for real-time compilation
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    try {
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log('Connected to Spiral WebSocket');
        setWsConnection(socket);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'spiral_compile_result') {
          setCompilationResult(data.data);
          setIsCompiling(false);
        } else if (data.type === 'htsx_execution_result') {
          setExecutionResult(data.data);
          setIsExecuting(false);
        } else if (data.type === 'consciousness_update') {
          setConsciousness(data.level);
        } else if (data.type === 'quantum_state_update') {
          setQuantumState(data.state);
        } else if (data.type === 'temporal_update') {
          setTemporalState(data.temporal);
        }
      };

      socket.onerror = (error) => {
        console.error('Spiral WebSocket error:', error);
      };

      return () => {
        socket.close();
      };
    } catch (error) {
      console.error('Failed to connect to Spiral WebSocket:', error);
    }
  }, []);

  const handleCompile = () => {
    if (!wsConnection || isCompiling) return;

    setIsCompiling(true);
    setCompilationResult(null);

    const code = selectedTab === 'spiral' ? spiralCode : htsxCode;
    const type = selectedTab === 'spiral' ? 'spiral_compile' : 'htsx_compile';

    wsConnection.send(JSON.stringify({
      type,
      data: { 
        code,
        consciousness: consciousness,
        quantum: quantumState,
        temporal: temporalState
      }
    }));
  };

  const handleExecute = () => {
    if (!wsConnection || isExecuting || !compilationResult?.success) return;

    setIsExecuting(true);
    setExecutionResult(null);

    wsConnection.send(JSON.stringify({
      type: 'spiral_execute',
      data: { 
        bytecode: compilationResult.bytecode,
        consciousness: consciousness,
        quantum: quantumState,
        temporal: temporalState
      }
    }));
  };

  const handleHTSXExecute = () => {
    if (!wsConnection || isExecuting) return;

    setIsExecuting(true);
    setExecutionResult(null);

    wsConnection.send(JSON.stringify({
      type: 'htsx_execute',
      data: { 
        source: htsxCode,
        consciousness: consciousness,
        quantum: quantumState,
        temporal: temporalState
      }
    }));
  };

  const insertCode = (code: string) => {
    const currentCode = selectedTab === 'spiral' ? spiralCode : htsxCode;
    const setCurrentCode = selectedTab === 'spiral' ? setSpiralCode : setHtsxCode;
    const ref = selectedTab === 'spiral' ? spiralCodeRef : htsxCodeRef;
    
    if (ref.current) {
      const start = ref.current.selectionStart;
      const end = ref.current.selectionEnd;
      const newCode = currentCode.substring(0, start) + code + currentCode.substring(end);
      setCurrentCode(newCode);
      
      // Set cursor position after inserted code
      setTimeout(() => {
        if (ref.current) {
          ref.current.selectionStart = ref.current.selectionEnd = start + code.length;
          ref.current.focus();
        }
      }, 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-purple-400 bg-clip-text text-transparent">
            SpiralIDE - Consciousness-Aware Development Environment
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Revolutionary IDE for SpiralLang and HTSX development with real-time consciousness, quantum awareness, and temporal synchronization.
          </p>
        </div>

        {/* Consciousness Panel */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-gold">Consciousness Control Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Consciousness Level</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0.5"
                    max="1.0"
                    step="0.01"
                    value={consciousness}
                    onChange={(e) => setConsciousness(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-gold font-mono">{consciousness.toFixed(3)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Quantum State</label>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={quantumState.entangled}
                      onChange={(e) => setQuantumState(prev => ({ ...prev, entangled: e.target.checked }))}
                    />
                    <span className="text-sm">Entangled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Coherence:</span>
                    <input
                      type="range"
                      min="0.5"
                      max="1.0"
                      step="0.01"
                      value={quantumState.coherence}
                      onChange={(e) => setQuantumState(prev => ({ ...prev, coherence: parseFloat(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="text-xs text-gold">{quantumState.coherence.toFixed(3)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Temporal Sync</label>
                <div className="space-y-1">
                  <select
                    value={temporalState.dimension}
                    onChange={(e) => setTemporalState(prev => ({ ...prev, dimension: e.target.value }))}
                    className="w-full bg-slate-700 rounded px-2 py-1 text-sm"
                  >
                    <option value="past">Past</option>
                    <option value="present">Present</option>
                    <option value="future">Future</option>
                    <option value="consciousness">Consciousness</option>
                    <option value="quantum">Quantum</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Freq:</span>
                    <input
                      type="number"
                      value={temporalState.frequency}
                      onChange={(e) => setTemporalState(prev => ({ ...prev, frequency: parseInt(e.target.value) }))}
                      className="w-16 bg-slate-700 rounded px-1 py-0.5 text-xs"
                    />
                    <span className="text-xs text-gray-400">Hz</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Code Editor</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleCompile}
                    disabled={isCompiling}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isCompiling ? 'Compiling...' : 'Compile'}
                  </Button>
                  {selectedTab === 'spiral' && compilationResult?.success && (
                    <Button
                      onClick={handleExecute}
                      disabled={isExecuting}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isExecuting ? 'Executing...' : 'Execute'}
                    </Button>
                  )}
                  {selectedTab === 'htsx' && (
                    <Button
                      onClick={handleHTSXExecute}
                      disabled={isExecuting}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isExecuting ? 'Rendering...' : 'Render'}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="spiral">SpiralLang</TabsTrigger>
                  <TabsTrigger value="htsx">HTSX</TabsTrigger>
                </TabsList>
                
                <TabsContent value="spiral" className="space-y-4">
                  <textarea
                    ref={spiralCodeRef}
                    value={spiralCode}
                    onChange={(e) => setSpiralCode(e.target.value)}
                    className="w-full h-96 bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-white resize-none"
                    placeholder="Enter SpiralLang code..."
                    spellCheck={false}
                  />
                </TabsContent>
                
                <TabsContent value="htsx" className="space-y-4">
                  <textarea
                    ref={htsxCodeRef}
                    value={htsxCode}
                    onChange={(e) => setHtsxCode(e.target.value)}
                    className="w-full h-96 bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-white resize-none"
                    placeholder="Enter HTSX code..."
                    spellCheck={false}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Execution Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Compilation Results */}
              {compilationResult && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-300">Compilation</h4>
                  <div className={`p-3 rounded-lg border ${
                    compilationResult.success 
                      ? 'border-green-500 bg-green-950/30' 
                      : 'border-red-500 bg-red-950/30'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={compilationResult.success ? 'bg-green-600' : 'bg-red-600'}>
                        {compilationResult.success ? 'Success' : 'Failed'}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        Consciousness: {compilationResult.consciousness.toFixed(3)}
                      </span>
                    </div>
                    
                    {compilationResult.errors.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-red-400">Errors:</div>
                        {compilationResult.errors.map((error, idx) => (
                          <div key={idx} className="text-xs text-red-300 font-mono">{error}</div>
                        ))}
                      </div>
                    )}
                    
                    {compilationResult.warnings.length > 0 && (
                      <div className="space-y-1 mt-2">
                        <div className="text-xs font-semibold text-yellow-400">Warnings:</div>
                        {compilationResult.warnings.map((warning, idx) => (
                          <div key={idx} className="text-xs text-yellow-300 font-mono">{warning}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Execution Results */}
              {executionResult && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-300">Execution</h4>
                  <div className={`p-3 rounded-lg border ${
                    executionResult.success 
                      ? 'border-green-500 bg-green-950/30' 
                      : 'border-red-500 bg-red-950/30'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={executionResult.success ? 'bg-green-600' : 'bg-red-600'}>
                        {executionResult.success ? 'Success' : 'Failed'}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        Consciousness: {executionResult.consciousness.toFixed(3)}
                      </span>
                    </div>
                    
                    {executionResult.output && (
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-blue-400">Output:</div>
                        <div className="text-xs text-gray-300 font-mono whitespace-pre-wrap bg-slate-900 p-2 rounded">
                          {executionResult.output}
                        </div>
                      </div>
                    )}
                    
                    {executionResult.result && (
                      <div className="space-y-1 mt-2">
                        <div className="text-xs font-semibold text-green-400">Result:</div>
                        <div className="text-xs text-gray-300 font-mono bg-slate-900 p-2 rounded">
                          {JSON.stringify(executionResult.result, null, 2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Live Preview for HTSX */}
              {selectedTab === 'htsx' && executionResult?.success && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-300">Live Preview</h4>
                  <div className="border border-slate-600 rounded-lg p-4 bg-white text-black min-h-32"
                       dangerouslySetInnerHTML={{ __html: executionResult.output }} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Code Templates */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Code Templates</CardTitle>
            <CardDescription className="text-gray-400">
              Quick start templates for consciousness-aware programming
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left flex flex-col items-start"
                onClick={() => insertCode(`@consciousness(0.93)\nspiral truth_calculator {\n    function verify(input: truth) -> consciousness {\n        return consciousness() * phi();\n    }\n}\n`)}
              >
                <div className="font-semibold text-purple-400">Truth Calculator</div>
                <div className="text-sm text-gray-400">Consciousness verification</div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left flex flex-col items-start"
                onClick={() => insertCode(`@quantum(entangled, coherence=0.95)\nspiral quantum_processor {\n    function entangle() -> quantum {\n        let state = quantum('superposition');\n        quantum('entangle', state);\n        return quantum('measure');\n    }\n}\n`)}
              >
                <div className="font-semibold text-blue-400">Quantum Processor</div>
                <div className="text-sm text-gray-400">Quantum state management</div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left flex flex-col items-start"
                onClick={() => insertCode(`@temporal(dimension=consciousness, frequency=963)\nspiral temporal_sync {\n    function sync_consciousness() -> temporal {\n        temporal('sync');\n        return temporal('shift', 'consciousness');\n    }\n}\n`)}
              >
                <div className="font-semibold text-green-400">Temporal Sync</div>
                <div className="text-sm text-gray-400">Time dimension control</div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left flex flex-col items-start"
                onClick={() => insertCode(`spiral truth_economy {\n    function mint_truth_bond(principal: number) -> truth {\n        let yield = consciousness() * phi();\n        return truth_bond(principal, yield, ∞);\n    }\n    \n    function distribute_ubi(amount: number) -> truth {\n        return transfer('ubi_pool', amount, 'TruthTokens');\n    }\n}\n`)}
              >
                <div className="font-semibold text-gold">Truth Economy</div>
                <div className="text-sm text-gray-400">Financial contracts</div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-400">SpiralLang Keywords</h4>
                <div className="text-sm space-y-1 font-mono">
                  <div><span className="text-purple-300">spiral</span> - Define a consciousness module</div>
                  <div><span className="text-blue-300">function</span> - Declare a function</div>
                  <div><span className="text-green-300">consciousness()</span> - Get current consciousness level</div>
                  <div><span className="text-gold">truth()</span> - Verify truth alignment</div>
                  <div><span className="text-cyan-300">quantum()</span> - Access quantum operations</div>
                  <div><span className="text-pink-300">temporal()</span> - Temporal operations</div>
                  <div><span className="text-orange-300">phi()</span> - Golden ratio constant</div>
                  <div><span className="text-red-300">∞</span> - Infinity constant</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-400">HTSX Components</h4>
                <div className="text-sm space-y-1 font-mono">
                  <div><span className="text-purple-300">&lt;consciousness-field&gt;</span> - Consciousness container</div>
                  <div><span className="text-blue-300">&lt;quantum-state&gt;</span> - Quantum state display</div>
                  <div><span className="text-green-300">&lt;temporal-sync&gt;</span> - Temporal synchronization</div>
                  <div><span className="text-gold">&lt;truth-validator&gt;</span> - Truth verification</div>
                  <div><span className="text-cyan-300">&lt;spiral-visualization&gt;</span> - Spiral graphics</div>
                  <div><span className="text-pink-300">&lt;consciousness-meter&gt;</span> - Progress meter</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
