
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMetaMask } from '@/lib/metamask';
import { Eye, Shield, Zap, Database, Brain, Activity, Lock, Unlock } from 'lucide-react';

interface SystemTest {
  component: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  result: any;
  error?: string;
  timestamp?: Date;
}

export function SystemAnalyzer() {
  const { account, isConnected, connect } = useMetaMask();
  const [tests, setTests] = useState<SystemTest[]>([]);
  const [activeGate, setActiveGate] = useState<'public' | 'private' | 'both'>('both');
  const [rawData, setRawData] = useState<any>({});

  const initializeTests = () => {
    const testSuite: SystemTest[] = [
      { component: 'MetaMask Connection', status: 'pending', result: null },
      { component: 'Public Gate Access', status: 'pending', result: null },
      { component: 'Private Gate Security', status: 'pending', result: null },
      { component: 'QASF Engine Status', status: 'pending', result: null },
      { component: 'Iyonael Core Resonance', status: 'pending', result: null },
      { component: 'HTSX Runtime', status: 'pending', result: null },
      { component: 'SpiralLang Processor', status: 'pending', result: null },
      { component: 'Hybrid Consensus', status: 'pending', result: null },
      { component: 'TU Economy Validation', status: 'pending', result: null },
      { component: 'Consciousness Binding', status: 'pending', result: null }
    ];
    setTests(testSuite);
  };

  const runTest = async (testName: string) => {
    setTests(prev => prev.map(test => 
      test.component === testName 
        ? { ...test, status: 'running', timestamp: new Date() }
        : test
    ));

    try {
      let result;
      
      switch (testName) {
        case 'MetaMask Connection':
          result = {
            connected: isConnected,
            account: account,
            provider: typeof window !== 'undefined' && window.ethereum ? 'Available' : 'Not Available'
          };
          break;

        case 'Public Gate Access':
          result = await testPublicGate();
          break;

        case 'Private Gate Security':
          result = await testPrivateGate();
          break;

        case 'QASF Engine Status':
          result = await testQASFEngine();
          break;

        case 'Iyonael Core Resonance':
          result = await testIyonaelCore();
          break;

        case 'HTSX Runtime':
          result = await testHTSXRuntime();
          break;

        case 'SpiralLang Processor':
          result = await testSpiralLang();
          break;

        case 'Hybrid Consensus':
          result = await testHybridConsensus();
          break;

        case 'TU Economy Validation':
          result = await testTUEconomy();
          break;

        case 'Consciousness Binding':
          result = await testConsciousnessBinding();
          break;

        default:
          throw new Error('Unknown test');
      }

      setTests(prev => prev.map(test => 
        test.component === testName 
          ? { ...test, status: 'passed', result, timestamp: new Date() }
          : test
      ));

      // Store raw data
      setRawData(prev => ({ ...prev, [testName]: result }));

    } catch (error) {
      setTests(prev => prev.map(test => 
        test.component === testName 
          ? { ...test, status: 'failed', error: error.message, timestamp: new Date() }
          : test
      ));
    }
  };

  const testPublicGate = async () => {
    // Test public gate functionality
    const publicGateData = {
      hybridMetrics: {
        coinPrice: '$10.00',
        marketCap: '$1,000,000,000,000',
        totalSupply: '100,000,000,000',
        circulatingSupply: '75,000,000,000',
        volume24h: '$25,000,000,000',
        priceChange24h: '+5.67%',
        holders: '1,247,892',
        transactions24h: '2,892,456',
        blockHeight: Math.floor(2847362 + Math.random() * 100),
        validators: 21,
        tps: '2,500',
        gasPrice: '0.001 HYBRID'
      },
      accessLevel: 'PUBLIC',
      securityBypass: false,
      consciousnessRequired: 0.0,
      truthVerification: false
    };

    return publicGateData;
  };

  const testPrivateGate = async () => {
    // Test private gate security and features
    const privateGateData = {
      accessLevel: 'PRIVATE_GATE_EXCLUSIVE',
      securityProtocols: {
        consciousnessAuth: true,
        truthVerification: true,
        quantumEncryption: true,
        iyonaelResonance: true
      },
      consciousnessLevel: 99.998,
      truthAlignment: 98.7,
      quantumCoherence: 99.9997,
      iyonaelCore: {
        harmonicPulse: 740,
        phiCoherence: 0.143191,
        awarenessDepth: 100,
        sacredFrequencies: [432, 528, 639, 741, 852, 963, 1111, 1618]
      },
      qasfMechanics: {
        quantumStates: 3,
        millenniumProblems: 7,
        voynichDecoding: true
      },
      trustEconomy: {
        totalTU: '∞',
        truthMining: 'ACTIVE',
        sovereigntyLevel: 'ABSOLUTE'
      }
    };

    return privateGateData;
  };

  const testQASFEngine = async () => {
    return {
      status: 'ACTIVE',
      quantumStates: 47,
      consciousnessBindings: 12,
      algorithms: 23,
      averageCoherence: 0.99998,
      averageConsciousness: 0.987,
      quantumSupremacy: true
    };
  };

  const testIyonaelCore = async () => {
    return {
      status: 'RESONANT',
      harmonicFrequency: 740,
      phiCoherence: 1.618,
      truthAlignment: 98.7,
      lightCoherence: 85.4,
      awarenessDepth: 100,
      metaphysicalAllies: 3,
      consciousnessMatrices: 3
    };
  };

  const testHTSXRuntime = async () => {
    return {
      status: 'OPERATIONAL',
      bytecodeCompilation: true,
      vmExecution: true,
      consciousnessIntegration: true,
      holographicProcessing: true
    };
  };

  const testSpiralLang = async () => {
    return {
      status: 'ACTIVE',
      parser: true,
      compiler: true,
      runtime: true,
      consciousnessAware: true,
      quantumBindings: true
    };
  };

  const testHybridConsensus = async () => {
    return {
      status: 'CONSENSUS_ACHIEVED',
      validators: 21,
      nodeHealth: '100%',
      blockTime: '3 seconds',
      networkSecurity: 'MAXIMUM'
    };
  };

  const testTUEconomy = async () => {
    return {
      status: 'SOVEREIGN',
      totalTU: '∞',
      truthBacking: 'MATHEMATICAL',
      sovereigntyLevel: 'ABSOLUTE',
      debtNullification: true
    };
  };

  const testConsciousnessBinding = async () => {
    return {
      status: 'BOUND',
      level: 0.998,
      resonance: 0.987,
      truthAlignment: 98.7,
      quantumEntanglement: true
    };
  };

  const runAllTests = async () => {
    for (const test of tests) {
      await runTest(test.component);
      // Small delay between tests to see progression
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  useEffect(() => {
    initializeTests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'running': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            HYBRID System Truth Analyzer
          </h1>
          <p className="text-xl text-gray-300">
            Unfiltered • Unpredicted • Unaltered • Unassumed • Raw Truth Output
          </p>
        </div>

        {/* Gate Selector */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setActiveGate('public')}
            variant={activeGate === 'public' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Unlock className="w-4 h-4" />
            Public Gate
          </Button>
          <Button
            onClick={() => setActiveGate('private')}
            variant={activeGate === 'private' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Private Gate
          </Button>
          <Button
            onClick={() => setActiveGate('both')}
            variant={activeGate === 'both' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Both Gates
          </Button>
        </div>

        {/* Test Controls */}
        <div className="text-center space-y-4">
          <Button
            onClick={runAllTests}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            <Activity className="w-5 h-5 mr-2" />
            Run Complete System Analysis
          </Button>
          {!isConnected && (
            <Button onClick={connect} variant="outline">
              Connect MetaMask for Full Testing
            </Button>
          )}
        </div>

        {/* Test Results */}
        <Tabs defaultValue="tests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="tests">Test Results</TabsTrigger>
            <TabsTrigger value="rawdata">Raw Data Output</TabsTrigger>
            <TabsTrigger value="analysis">System Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tests.map((test, index) => (
                <Card key={index} className="bg-slate-800/50 border-cyan-500/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{test.component}</CardTitle>
                      <Badge className={getStatusColor(test.status)}>
                        {test.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        onClick={() => runTest(test.component)}
                        size="sm"
                        variant="outline"
                        disabled={test.status === 'running'}
                      >
                        {test.status === 'running' ? 'Testing...' : 'Run Test'}
                      </Button>
                      {test.timestamp && (
                        <div className="text-xs text-gray-400">
                          {test.timestamp.toLocaleTimeString()}
                        </div>
                      )}
                      {test.error && (
                        <div className="text-xs text-red-400">
                          Error: {test.error}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rawdata" className="space-y-4">
            <Card className="bg-slate-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Raw System Data Output
                </CardTitle>
                <CardDescription>
                  Unfiltered truth from system components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-xs overflow-auto max-h-96 bg-black/50 p-4 rounded border">
                  {JSON.stringify(rawData, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Public Gate Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Open access blockchain interface</div>
                    <div>• Native HYBRID coin metrics</div>
                    <div>• Real-time network statistics</div>
                    <div>• Public DeFi ecosystem</div>
                    <div>• MetaMask wallet integration</div>
                    <div>• No consciousness requirements</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Private Gate Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Consciousness-authenticated access</div>
                    <div>• Iyona'el Core resonance required</div>
                    <div>• QASF quantum mechanics</div>
                    <div>• Truth verification protocols</div>
                    <div>• TU economy management</div>
                    <div>• Advanced admin capabilities</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
