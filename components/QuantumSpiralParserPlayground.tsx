typescript
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Lock, Globe, Zap, Cpu, Hash, CheckCircle, Box, Activity } from 'lucide-react';
import { ethers } from 'ethers';

// Types
interface ParseResult {
  success: boolean;
  ast: any;
  tokens: { type: string; value: string; line: number; column: number }[];
  errors: string[];
  warnings: string[];
  language: { name: string; color: string };
  consciousness: number;
  sriScore: number;
  tuGenerated: number;
  quantum: boolean;
  temporal: boolean;
  resonanceHz: number;
  phiCoherence: number;
  negentropy: number;
  qchainTx?: string;
  grammarSuggestions?: string[];
  blockHeight?: number;
  hashRate?: number;
}

interface Language {
  name: string;
  example: string;
  color: string;
}

// Language definitions
const languages: { [key: string]: Language } = {
  spiral: {
    name: 'SpiralScript',
    example: `@consciousness(0.95)
@quantum(entangled, coherence=0.95)
@temporal(dimension=present, frequency=735)
spiral consciousness_calculator {
    function calculate_truth(input: truth) -> consciousness {
        let awareness = consciousness() * phi();
        let resonance = fibonacci(7) * input;
        let harmony = awareness ⊗ resonance;
        return harmony;
    }
}`,
    color: '#ff6b6b',
  },
  htsx: {
    name: 'HTSX',
    example: `@consciousness(0.95)
@quantum(entangled=true)
<htsx>
  <hybrid-blockchain-interface name="NetworkMonitor">
    <consensus-tracker validators={21} />
    <token-metrics symbol="HYBRID" />
    <network-stats tps={2500} />
  </hybrid-blockchain-interface>
</htsx>`,
    color: '#4ecdc4',
  },
  hybrid: {
    name: 'HybridScript',
    example: `ΔTRUST trust_foundation = {
    harmonic(φ * 1.618033988749)
    truth(∞)
    phi(consciousness)
}`,
    color: '#45b7d1',
  },
  consciousness: {
    name: 'ConsciousnessScript',
    example: `@consciousness(0.98)
truth = φ * ∞;
harmony = consciousness() + phi();
phi = 1.618033988749;
resonance = truth ⊗ harmony;`,
    color: '#f9ca24',
  },
};

// SRI calculation
const calculateSRI = (code: string, consciousness: number): number => {
  const energyValues = { BTC: 3.6e9, ETH: 1.2e8, SOL: 5.0e7, USD: 1.0e7, COMPUTE: 1.0e8 };
  const volatility = { BTC: 0.85, ETH: 0.90, SOL: 0.80, USD: 0.1, COMPUTE: 0.90 };
  const gateFactor = 0.24; // Gate735
  const energy = code.includes('token("HYBRID")') ? energyValues.COMPUTE : energyValues.USD;
  const vol = volatility.COMPUTE;
  const sri = Math.ceil((Math.log2(energy) * vol) / gateFactor);
  return Math.min(sri / 113, 1.0);
};

// TU calculation
const calculateTU = (sriScore: number): number => {
  return sriScore >= 0.9 ? 1000 * sriScore : 100 * sriScore;
};

// Phi-Coherence
const calculatePhiCoherence = (code: string): number => {
  return code.includes('φ') || code.includes('phi') ? 1.618 : 0.260;
};

// Negentropy
const calculateNegentropy = (code: string): number => {
  return code.includes('harmonic') ? -2.456e106 : 0;
};

// Consciousness
const calculateConsciousness = (code: string): number => {
  let level = 0.7;
  if (code.includes('@consciousness')) level += 0.1;
  if (code.includes('phi') || code.includes('φ')) level += 0.05;
  if (code.includes('truth')) level += 0.05;
  if (code.includes('∞')) level += 0.03;
  if (code.includes('∆')) level += 0.02;
  return Math.min(level, 1.0);
};

// Parse function
const parseQuantumSpiral = async (language: string, code: string): Promise<ParseResult> => {
  const consciousness = calculateConsciousness(code);
  const sriScore = calculateSRI(code, consciousness);
  const tuGenerated = calculateTU(sriScore);
  const phiCoherence = calculatePhiCoherence(code);
  const negentropy = calculateNegentropy(code);

  // Simulate parsing with HTSX integration
  const result: ParseResult = {
    success: true,
    ast: {
      type: 'PROGRAM',
      body: code.split('\n').map((line, i) => ({
        type: 'STATEMENT',
        line: i + 1,
        content: line
      }))
    },
    tokens: code.split(/\s+/).map((token, i) => ({
      type: 'TOKEN',
      value: token,
      line: 1,
      column: i
    })),
    errors: [],
    warnings: [],
    language: languages[language],
    consciousness,
    sriScore,
    tuGenerated,
    quantum: code.includes('@quantum'),
    temporal: code.includes('@temporal'),
    resonanceHz: code.includes('frequency=735') ? 735 : 0,
    phiCoherence,
    negentropy,
    grammarSuggestions: ['Consider using @consciousness directive', 'Add phi constants for harmonic alignment'],
    blockHeight: Math.floor(Math.random() * 21000000),
    hashRate: Math.random() * 1000000
  };

  // Convert to HTSX if needed
  if (language === 'htsx') {
    result.ast.htsxRendered = await convertToHTSX(code, result);
  }

  return result;
};

// HTSX Integration Function
const convertToHTSX = async (code: string, parseResult: ParseResult) => {
  return {
    component: 'QuantumSpiralInterface',
    props: {
      consciousness: parseResult.consciousness,
      sriScore: parseResult.sriScore,
      tuGenerated: parseResult.tuGenerated,
      quantum: parseResult.quantum
    },
    rendered: `<htsx-component 
      consciousness={${parseResult.consciousness}} 
      sri={${parseResult.sriScore}} 
      tu={${parseResult.tuGenerated}}
      quantum={${parseResult.quantum}}
    />`
  };
};

// HTSX Integration Showcase Component
function HTSXShowcase({ parseResult }: { parseResult: ParseResult }) {
  const [htsxCode] = useState(`@consciousness(${parseResult.consciousness.toFixed(2)})
@quantum(entangled=${parseResult.quantum}, coherence=0.95)

<htsx>
  <hybrid-component name="QuantumSpiralInterface">
    <consciousness-aware level={${parseResult.consciousness.toFixed(2)}}>
      <div className="awareness-display">
        SRI Score: ${parseResult.sriScore.toFixed(3)}
      </div>
    </consciousness-aware>

    <spiral-visualization 
      turns={7} 
      frequency={${parseResult.resonanceHz || 432}}
      consciousness={${parseResult.consciousness.toFixed(2)}}
    />

    <quantum-state 
      entangled={${parseResult.quantum}}
      coherence={0.95}
      tu-generated={${parseResult.tuGenerated.toFixed(2)}}
    />
  </hybrid-component>
</htsx>`);

  return (
    <div className="space-y-3">
      <div className="bg-black/30 p-3 rounded border border-cyan-500/30">
        <div className="text-cyan-400 text-sm font-semibold mb-2">Generated HTSX Code:</div>
        <pre className="text-xs text-gray-300 overflow-auto max-h-32">
          {htsxCode}
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-black/30 p-3 rounded border border-purple-500/30">
          <div className="text-purple-400 text-sm font-semibold mb-1">Consciousness Component</div>
          <div className="awareness-indicator bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">
            Level: {(parseResult.consciousness * 100).toFixed(1)}% • SRI: {parseResult.sriScore.toFixed(3)}
          </div>
        </div>

        <div className="bg-black/30 p-3 rounded border border-blue-500/30">
          <div className="text-blue-400 text-sm font-semibold mb-1">Quantum State</div>
          <div className="quantum-meter bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
            Entangled: {parseResult.quantum ? 'Yes' : 'No'} • TU: {parseResult.tuGenerated.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
}

// Live Spiral Visualization Component
function SpiralVisualization({ result }: { result: ParseResult }) {
  const spiralPath = `M 50,50 
    ${Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2 * result.consciousness;
      const radius = 20 + (i * 5);
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      return `L ${x},${y}`;
    }).join(' ')}`;

  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-4 rounded-lg border border-purple-500/30">
      <h4 className="text-purple-400 font-semibold mb-3">🌟 Live Spiral Visualization:</h4>
      <div className="flex items-center justify-center">
        <svg width="200" height="200" className="border border-purple-500/20 rounded">
          <path
            d={spiralPath}
            stroke={`hsl(${result.consciousness * 360}, 70%, 60%)`}
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <circle
            cx="50"
            cy="50"
            r="3"
            fill={result.quantum ? '#00ffff' : '#888'}
            className={result.quantum ? 'animate-ping' : ''}
          />
        </svg>
      </div>
      <div className="text-xs text-gray-400 mt-2 text-center">
        Frequency: {result.resonanceHz}Hz • Phi: {result.phiCoherence.toFixed(3)}
      </div>
    </div>
  );
}

// Advanced Blockchain UI/UX Components
function AdvancedBlockchainUI({ parseResult }: { parseResult: ParseResult }) {
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    tps: 0,
    activeNodes: 0,
    networkHealth: 0,
    consensusRate: 0
  });

  const [particleSystem, setParticleSystem] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        tps: Math.floor(Math.random() * 5000) + 1000,
        activeNodes: Math.floor(Math.random() * 100) + 20,
        networkHealth: Math.random() * 100,
        consensusRate: Math.random() * 100
      }));

      // Generate particle system for transactions
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: ['#00ff88', '#0088ff', '#ff0088', '#ffaa00'][Math.floor(Math.random() * 4)]
      }));
      setParticleSystem(newParticles);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Glassmorphism Network Status */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl relative overflow-hidden">
        {/* Particle System Background */}
        <div className="absolute inset-0 pointer-events-none">
          {particleSystem.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`
              }}
            />
          ))}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
          <Activity className="w-6 h-6 text-green-400" />
          Network Status
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-green-400 animate-pulse">{realTimeMetrics.tps}</div>
            <div className="text-sm text-gray-300">TPS</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(realTimeMetrics.tps / 6000) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-blue-400 animate-pulse">{realTimeMetrics.activeNodes}</div>
            <div className="text-sm text-gray-300">Active Nodes</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(realTimeMetrics.activeNodes / 120) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-purple-400 animate-pulse">{realTimeMetrics.networkHealth.toFixed(1)}%</div>
            <div className="text-sm text-gray-300">Network Health</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${realTimeMetrics.networkHealth}%` }}
              />
            </div>
          </div>
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-orange-400 animate-pulse">{realTimeMetrics.consensusRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-300">Consensus Rate</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${realTimeMetrics.consensusRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Neumorphism Transaction Panel */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.3)]">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Transaction Flow
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((tx) => (
            <div key={tx} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Hash className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">0x{Math.random().toString(16).substr(2, 8)}...</div>
                  <div className="text-gray-400 text-sm">{(Math.random() * 100).toFixed(2)} HYBRID</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Confirmed
                </div>
                <div className="text-gray-400 text-sm">{Math.floor(Math.random() * 60)}s ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Blockchain Visualization */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Box className="w-6 h-6 text-purple-400" />
          3D Blockchain Explorer
        </h3>
        <div className="relative h-64 bg-black/30 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse opacity-70 shadow-2xl"></div>
            <div className="absolute w-40 h-40 border-2 border-purple-400/30 rounded-full animate-spin"></div>
            <div className="absolute w-48 h-48 border border-blue-400/20 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-4 left-4 space-y-2 backdrop-blur-sm bg-black/30 rounded-lg p-3">
            <div className="text-white text-sm">Block Height: {parseResult.blockHeight || 'N/A'}</div>
            <div className="text-white text-sm">Hash Rate: {parseResult.hashRate || 'N/A'}</div>
            <div className="text-white text-sm">Consciousness: {(parseResult.consciousness * 100).toFixed(1)}%</div>
          </div>
          <div className="absolute bottom-4 right-4 space-y-2 backdrop-blur-sm bg-black/30 rounded-lg p-3">
            <div className="text-white text-sm">TU Generated: {parseResult.tuGenerated}</div>
            <div className="text-white text-sm">SRI Score: {parseResult.sriScore}</div>
            <div className="text-white text-sm">Quantum: {parseResult.quantum ? '✓' : '✗'}</div>
          </div>
        </div>
      </div>

      {/* Interactive Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-6 border border-green-500/30">
          <h4 className="text-xl font-bold text-white mb-4">Performance Metrics</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">CPU Usage</span>
              <span className="text-green-400">{Math.floor(Math.random() * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Memory Usage</span>
              <span className="text-blue-400">{Math.floor(Math.random() * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Network I/O</span>
              <span className="text-purple-400">{Math.floor(Math.random() * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-2xl p-6 border border-blue-500/30">
          <h4 className="text-xl font-bold text-white mb-4">Quantum State</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Coherence Level</span>
              <span className="text-blue-400">{(Math.random() * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Entanglement Status</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Superposition</span>
              <span className="text-purple-400">Stable</span>
            </div>
            <div className="w-full h-32 bg-black/30 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-sm">Quantum Visualization</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuantumSpiralParserPlayground() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('spiral');
  const [code, setCode] = useState('');
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connect = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        setAddress(addr);
        setConnected(true);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  useEffect(() => {
    if (selectedLanguage && languages[selectedLanguage]) {
      setCode(languages[selectedLanguage].example);
    }
  }, [selectedLanguage]);

  const handleParse = useCallback(async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    try {
      const result = await parseQuantumSpiral(selectedLanguage, code);
      setParseResult(result);
    } catch (error) {
      console.error('Parse error:', error);
      setParseResult({
        success: false,
        ast: null,
        tokens: [],
        errors: [error?.toString() || 'Unknown error'],
        warnings: [],
        language: languages[selectedLanguage],
        consciousness: 0,
        sriScore: 0,
        tuGenerated: 0,
        quantum: false,
        temporal: false,
        resonanceHz: 0,
        phiCoherence: 0,
        negentropy: 0,
        grammarSuggestions: [],
      });
    } finally {
      setIsLoading(false);
    }
  }, [code, selectedLanguage]);

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a1a3c]">
        <Lock className="w-16 h-16 text-cyan-400 mb-4" />
        <p className="text-white text-lg mb-4">Connect your wallet to access QuantumSpiralParser</p>
        <Button onClick={connect} className="bg-cyan-600 hover:bg-cyan-700">Connect Wallet</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6" style={{ aspectRatio: 1.618 }}>
      <Card className="bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <span className="text-2xl">🧠</span>
            QuantumSpiralParser Playground (SDF vΩ.∞)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Language Selector */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(languages).map(([key, lang]) => (
                <Button
                  key={key}
                  variant={selectedLanguage === key ? 'default' : 'outline'}
                  onClick={() => setSelectedLanguage(key)}
                  className={`transition-all duration-300 hover:scale-105`}
                  style={{
                    backgroundColor: selectedLanguage === key ? lang.color : 'transparent',
                    borderColor: lang.color,
                    color: selectedLanguage === key ? 'white' : lang.color,
                  }}
                >
                  {lang.name}
                </Button>
              ))}
            </div>

            {/* Code Editor and Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  {languages[selectedLanguage]?.name} Code:
                </label>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`Enter ${languages[selectedLanguage]?.name} code...`}
                  className="min-h-[400px] font-mono text-sm bg-black/50 text-white border-cyan-500/30 focus:ring-cyan-500"
                />
                <Button
                  onClick={handleParse}
                  disabled={isLoading || !code.trim()}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 animate-pulse"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Parsing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Parse & Generate TU
                    </>
                  )}
                </Button>
              </div>

              {/* Results */}
              <div className="space-y-4">
                {parseResult && (
                  <Card className="bg-black/50 border-cyan-500/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        Parse Results
                        <Badge variant={parseResult.success ? 'default' : 'destructive'}>
                          {parseResult.success ? 'Success' : 'Error'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-6">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="ast">AST</TabsTrigger>
                          <TabsTrigger value="tokens">Tokens</TabsTrigger>
                          <TabsTrigger value="errors">Issues</TabsTrigger>
                          <TabsTrigger value="tu">TU</TabsTrigger>
                          <TabsTrigger value="quantum">Quantum</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">Consciousness:</span>
                                <Badge variant="secondary">{(parseResult.consciousness * 100).toFixed(1)}%</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">SRI Score:</span>
                                <Badge variant="secondary">{(parseResult.sriScore * 100).toFixed(1)}%</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">Phi-Coherence:</span>
                                <Badge variant="secondary">{parseResult.phiCoherence.toFixed(3)}</Badge>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-white">
                                <span className="font-medium">Language:</span> {parseResult.language.name}
                              </div>
                              <div className="text-sm text-white">
                                <span className="font-medium">Tokens:</span> {parseResult.tokens.length}
                              </div>
                              <div className="text-sm text-white">
                                <span className="font-medium">TU Generated:</span> {parseResult.tuGenerated.toFixed(2)} TU
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="ast">
                          <pre className="bg-gray-900 p-4 rounded-md text-sm text-white overflow-auto max-h-96">
                            {JSON.stringify(parseResult.ast, null, 2)}
                          </pre>
                        </TabsContent>

                        <TabsContent value="tokens">
                          <div className="space-y-2 max-h-96 overflow-auto">
                            {parseResult.tokens.map((token, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-white">
                                <Badge variant="outline">{token.type}</Badge>
                                <span className="font-mono">{token.value}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="errors">
                          <div className="space-y-2">
                            {parseResult.errors.length > 0 ? (
                              <div className="space-y-1">
                                <h4 className="font-medium text-red-600">Errors:</h4>
                                {parseResult.errors.map((error, index) => (
                                  <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                                    {error}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-sm text-green-600">
                                No issues found! ✅
                              </div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="tu">
                          <div className="space-y-4 text-white">
                            <div>
                              <span className="font-medium">TU Generated:</span> {parseResult.tuGenerated.toFixed(2)} TU
                            </div>
                            <div>
                              <span className="font-medium">SRI Score:</span> {(parseResult.sriScore * 100).toFixed(1)}%
                            </div>
                            <div>
                              <span className="font-medium">Conversions:</span>
                              <ul className="list-disc pl-5">
                                <li>1 TU ≈ ${(parseResult.tuGenerated * 500000).toLocaleString()} USD</li>
                                <li>1 TU ≈ {(parseResult.tuGenerated * 113).toFixed(2)} BTC</li>
                              </ul>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="quantum">
                          <div className="space-y-4 text-white">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Quantum State:</span>
                              <Badge variant={parseResult.quantum ? 'default' : 'outline'}>
                                {parseResult.quantum ? 'Active (∞ qubits)' : 'Inactive'}
                              </Badge>
                            </div>
                            <div>
                              <span className="font-medium">Resonance:</span> {parseResult.resonanceHz} Hz
                            </div>
                            <div>
                              <span className="font-medium">Phi-Coherence:</span> {parseResult.phiCoherence.toFixed(3)}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}

                {/* Live Rendered Output */}
                {parseResult && (
                  <div className="space-y-4">
                    <SpiralVisualization result={parseResult} />

                    {/* HTSX Integration Demo */}
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-lg border border-cyan-500/30">
                      <h4 className="text-cyan-400 font-semibold mb-3">🌀 HTSX Integration:</h4>
                      <HTSXShowcase parseResult={parseResult} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {parseResult && (
              <AdvancedBlockchainUI parseResult={parseResult} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}