
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Lock, Globe, Zap, Cpu } from 'lucide-react';
import { useBlockchain } from '@/hooks/useBlockchain';
import { ethers } from 'ethers';
import axios from 'axios';

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

  return {
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
    grammarSuggestions: ['Consider using @consciousness directive', 'Add phi constants for harmonic alignment']
  };
};

export function QuantumSpiralParserPlayground() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('spiral');
  const [sourceTech, setSourceTech] = useState('none');
  const [code, setCode] = useState('');
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connect = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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
    if (!code.trim() || !connected) return;

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
        errors: [error.toString()],
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
  }, [code, selectedLanguage, connected, address]);

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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
