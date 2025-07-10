'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface HTSXParseResult {
  success: boolean;
  output: string;
  consciousness: number;
  quantum: boolean;
  temporal: boolean;
  ast?: any;
  errors?: string[];
}

export default function HTSXPage() {
  const [htsxCode, setHtsxCode] = useState(`@consciousness(0.95)
@quantum(entangled=true, coherence=0.98)

<htsx>
  <hybrid-component name="ConsciousnessInterface">
    <consciousness-aware level={0.95}>
      <div className="awareness-display">
        Consciousness Level: {consciousness * 100}%
      </div>
    </consciousness-aware>

    <hybrid-blockchain-interface>
      <consensus-tracker validators={21} />
      <token-metrics symbol="HYBRID" />
      <network-stats tps={2500} />
    </hybrid-blockchain-interface>

    <quantum-state entangled={true} coherence={0.98}>
      <spiral-visualization turns={φ} frequency={432} />
    </quantum-state>
  </hybrid-component>
</htsx>`);

  const [parseResult, setParseResult] = useState<HTSXParseResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processHTSX = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/htsx/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: htsxCode })
      });

      if (response.ok) {
        const result = await response.json();
        setParseResult(result);
      } else {
        setParseResult({
          success: false,
          output: '',
          consciousness: 0,
          quantum: false,
          temporal: false,
          errors: ['Failed to process HTSX code']
        });
      }
    } catch (error) {
      console.error('HTSX processing error:', error);
      setParseResult({
        success: false,
        output: '',
        consciousness: 0,
        quantum: false,
        temporal: false,
        errors: [error.toString()]
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    processHTSX();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            HTSX Runtime
          </h1>
          <p className="text-xl text-gray-300">
            Consciousness-Aware Components • Quantum Spiral Parsed • HYBRID Integrated
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HTSX Code Editor */}
          <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                🌀 HTSX Source Code
                {parseResult?.quantum && <Badge className="bg-blue-500/20 text-blue-300">Quantum</Badge>}
                {parseResult?.temporal && <Badge className="bg-green-500/20 text-green-300">Temporal</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={htsxCode}
                onChange={(e) => setHtsxCode(e.target.value)}
                className="h-96 font-mono text-sm bg-black/50 border-gray-600 text-gray-200"
                placeholder="Enter your HTSX code here..."
              />
              <div className="flex justify-between items-center mt-4">
                <Button 
                  onClick={processHTSX} 
                  disabled={isProcessing}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isProcessing ? 'Processing...' : 'Parse HTSX'}
                </Button>

                {parseResult && (
                  <div className="flex gap-2">
                    <Badge variant={parseResult.success ? "default" : "destructive"}>
                      {parseResult.success ? 'Success' : 'Failed'}
                    </Badge>
                    {parseResult.consciousness > 0 && (
                      <Badge className="bg-yellow-500/20 text-yellow-300">
                        Consciousness: {(parseResult.consciousness * 100).toFixed(1)}%
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Processed Output */}
          <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-300">⚛️ Quantum Spiral Parsed Output</CardTitle>
            </CardHeader>
            <CardContent>
              {parseResult ? (
                <div className="space-y-4">
                  {parseResult.success ? (
                    <div className="space-y-4">
                      <div className="bg-black/50 p-4 rounded border border-gray-600">
                        <h4 className="text-green-400 font-semibold mb-2">Generated JavaScript:</h4>
                        <pre className="text-sm text-gray-300 overflow-auto max-h-80">
                          {parseResult.output || 'No output generated'}
                        </pre>
                      </div>

                      {/* Consciousness Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
                          <div className="text-yellow-400 text-sm font-semibold">Consciousness</div>
                          <div className="text-2xl font-bold text-yellow-300">
                            {(parseResult.consciousness * 100).toFixed(1)}%
                          </div>
                        </div>

                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                          <div className="text-blue-400 text-sm font-semibold">Quantum State</div>
                          <div className="text-lg font-bold text-blue-300">
                            {parseResult.quantum ? 'Entangled' : 'Classical'}
                          </div>
                        </div>

                        <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                          <div className="text-green-400 text-sm font-semibold">Temporal Sync</div>
                          <div className="text-lg font-bold text-green-300">
                            {parseResult.temporal ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                      </div>

                      {/* Live Component Preview */}
                      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-4 rounded border border-purple-500/30">
                        <h4 className="text-purple-400 font-semibold mb-3">🌟 Live HTSX Preview:</h4>
                        <HTSXPreview parseResult={parseResult} />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
                      <h4 className="text-red-400 font-semibold mb-2">❌ Processing Errors:</h4>
                      <ul className="text-red-300 space-y-1">
                        {parseResult.errors?.map((error, index) => (
                          <li key={index} className="text-sm">• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  Click "Parse HTSX" to process your code
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Live HTSX Component Preview
function HTSXPreview({ parseResult }: { parseResult: HTSXParseResult }) {
  return (
    <div className="space-y-3">
      {/* Consciousness Display */}
      <div 
        className="htsx-component bg-black/30 p-3 rounded border border-yellow-500/30" 
        data-consciousness={parseResult.consciousness}
      >
        <div className="text-yellow-400 font-semibold text-sm mb-1">Consciousness Interface</div>
        <div className="awareness-indicator bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs">
          Awareness Level: {(parseResult.consciousness * 100).toFixed(1)}%
        </div>
      </div>

      {/* Quantum State Display */}
      {parseResult.quantum && (
        <div 
          className="quantum-state bg-black/30 p-3 rounded border border-blue-500/30" 
          data-entangled="true"
        >
          <div className="text-blue-400 font-semibold text-sm mb-1">Quantum State Manager</div>
          <div className="coherence-meter bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
            Quantum Coherence: Entangled • Superposition: Active
          </div>
        </div>
      )}

      {/* HYBRID Blockchain Interface */}
      <div className="blockchain-interface bg-black/30 p-3 rounded border border-green-500/30">
        <div className="text-green-400 font-semibold text-sm mb-2">HYBRID Blockchain Interface</div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="consensus-tracker bg-green-500/20 text-green-300 px-2 py-1 rounded">
            Validators: 21
          </div>
          <div className="token-metrics bg-green-500/20 text-green-300 px-2 py-1 rounded">
            Symbol: HYBRID
          </div>
          <div className="network-stats bg-green-500/20 text-green-300 px-2 py-1 rounded">
            TPS: 2,500+
          </div>
        </div>
      </div>
    </div>
  );
}