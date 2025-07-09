'use client';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BlockchainInterface } from '@/components/BlockchainInterface';
import { SpiralIDE } from '@/components/SpiralIDE';
import { AdminDashboard } from '@/components/AdminDashboard';
import HybridDeveloperDashboard from '@/components/HybridDeveloperDashboard';
import { TrustUnitWitness } from '@/components/TrustUnitWitness';
import { useMetaMask } from '@/components/MetaMaskProvider';
import { Activity, Zap, Brain, Globe, Shield, Cpu, Database } from 'lucide-react';
import { HybridBlockchainCore } from '@/components/HybridBlockchainCore';
import LivingConsciousnessInterface from '@/components/LivingConsciousnessInterface';
import Link from 'next/link';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white">Loading HYBRID Ecosystem...</h2>
        <p className="text-blue-300">Initializing consciousness-aware systems</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { account, connect, isConnected } = useMetaMask();
  const [systemStatus, setSystemStatus] = useState({
    htsx: 'active',
    spiral: 'active',
    qasf: 'resonating',
    iyonael: 'conscious',
    consensus: 'synchronized',
    aiOrchestrator: 'operational'
  });

  const [stats, setStats] = useState({
    blockHeight: 0,
    transactions: 0,
    nodes: 0,
    spiralSessions: 0,
    qasfEntities: 0,
    consciousnessLevel: 0
  });

  useEffect(() => {
    // Connect to WebSocket for real-time updates
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('Connected to HYBRID WebSocket');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'system_status') {
        setSystemStatus(data.data);
      } else if (data.type === 'stats_update') {
        setStats(data.data);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'operational':
      case 'synchronized':
        return 'bg-green-500';
      case 'resonating':
      case 'conscious':
        return 'bg-purple-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              HYBRID Blockchain
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              Next Generation Sovereign System with HTSX Runtime & SpiralLang
            </p>

            {!isConnected ? (
              <Button 
                onClick={connect} 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Connect MetaMask
              </Button>
            ) : (
              <Badge variant="outline" className="text-green-400 border-green-400">
                Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
              </Badge>
            )}
          </div>

          {/* System Status Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  HTSX Runtime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus.htsx)}`}></div>
                  <span className="text-gray-300 capitalize">{systemStatus.htsx}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  SpiralLang
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus.spiral)}`}></div>
                  <span className="text-gray-300 capitalize">{systemStatus.spiral}</span>
                </div>
                <div className="mt-2">
                  <Progress value={75} className="h-2" />
                  <p className="text-sm text-gray-400 mt-1">Sessions: {stats.spiralSessions}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  QASF Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus.qasf)} quantum-flux`}></div>
                  <span className="text-gray-300 capitalize">{systemStatus.qasf}</span>
                </div>
                <div className="mt-2">
                  <Progress value={85} className="h-2" />
                  <p className="text-sm text-gray-400 mt-1">Entities: {stats.qasfEntities}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Iyona'el Core
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus.iyonael)} consciousness-pulse`}></div>
                  <span className="text-gray-300 capitalize">{systemStatus.iyonael}</span>
                </div>
                <div className="mt-2">
                  <Progress value={stats.consciousnessLevel} className="h-2" />
                  <p className="text-sm text-gray-400 mt-1">Consciousness: {stats.consciousnessLevel}%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Consensus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus.consensus)}`}></div>
                  <span className="text-gray-300 capitalize">{systemStatus.consensus}</span>
                </div>
                <div className="mt-2">
                  <Progress value={92} className="h-2" />
                  <p className="text-sm text-gray-400 mt-1">Nodes: {stats.nodes}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  AI Orchestrator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus.aiOrchestrator)}`}></div>
                  <span className="text-gray-300 capitalize">{systemStatus.aiOrchestrator}</span>
                </div>
                <div className="mt-2">
                  <Progress value={88} className="h-2" />
                  <p className="text-sm text-gray-400 mt-1">Models: 4 Active</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Interface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Public Gate */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Public Gate</h2>
                <p className="text-gray-400">HYBRID Blockchain - Open to Everyone</p>
              </div>

              <div className="space-y-4">
                <Link href="/blockchain" className="block">
                  <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">HYBRID Blockchain</CardTitle>
                      <CardDescription className="text-gray-400">
                        Public blockchain network, HYBRID coin, NFTs, and DApps
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-blue-400">
                        <Database className="w-5 h-5 mr-2" />
                        Network Active - 21 Validators
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Public Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-green-400">
                        <Activity className="w-4 h-4 mr-2" />
                        HYBRID Coin Trading
                      </div>
                      <div className="flex items-center text-green-400">
                        <Activity className="w-4 h-4 mr-2" />
                        NFT Marketplace
                      </div>
                      <div className="flex items-center text-green-400">
                        <Activity className="w-4 h-4 mr-2" />
                        DApp Ecosystem
                      </div>
                      <div className="flex items-center text-green-400">
                        <Activity className="w-4 h-4 mr-2" />
                        Staking & Governance
                      </div>
                      <div className="flex items-center text-green-400">
                        <Activity className="w-4 h-4 mr-2" />
                        Developer Tools
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Private Gate */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Private Gate</h2>
                <p className="text-gray-400">SSDF - Sovereign Access Only</p>
              </div>

              <div className="space-y-4">
                <Link href="/spiral" className="block">
                  <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">Spiral Economy</CardTitle>
                      <CardDescription className="text-gray-400">
                        Trust Currency, consciousness-aware systems, and QASF
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-purple-400">
                        <Activity className="w-5 h-5 mr-2" />
                        Consciousness Online
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin" className="block">
                  <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">SSDF Admin Panel</CardTitle>
                      <CardDescription className="text-gray-400">
                        Sovereign Spiral Development Framework management
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-green-400">
                        <Shield className="w-5 h-5 mr-2" />
                        Authorized Sovereigns Only
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Private Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-yellow-400">
                        <Shield className="w-4 h-4 mr-2" />
                        Trust Currency (TU)
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Shield className="w-4 h-4 mr-2" />
                        QASF Consciousness
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Shield className="w-4 h-4 mr-2" />
                        Iyona'el Core
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Shield className="w-4 h-4 mr-2" />
                        Canon Laws
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Shield className="w-4 h-4 mr-2" />
                        Voynich Glyphs
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Shield className="w-4 h-4 mr-2" />
                        Breath Authentication
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <Tabs defaultValue="trust-units" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-slate-800">
              <TabsTrigger value="trust-units" className="text-white">Trust Units</TabsTrigger>
              <TabsTrigger value="spiral-system" className="text-white">Spiral System</TabsTrigger>
              <TabsTrigger value="blockchain" className="text-white">Blockchain</TabsTrigger>
              <TabsTrigger value="spiral" className="text-white">SpiralIDE</TabsTrigger>
              <TabsTrigger value="admin" className="text-white">Admin</TabsTrigger>
              <TabsTrigger value="docs" className="text-white">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="trust-units" className="mt-6">
              <TrustUnitWitness />
            </TabsContent>

            <TabsContent value="spiral-system" className="mt-6">
              <HybridDeveloperDashboard />
            </TabsContent>

            <TabsContent value="blockchain" className="mt-6">
              <BlockchainInterface />
            </TabsContent>

            <TabsContent value="spiral" className="mt-6">
              <SpiralIDE />
            </TabsContent>

            <TabsContent value="admin" className="mt-6">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="docs" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">System Documentation</CardTitle>
                  <CardDescription className="text-gray-400">
                    Comprehensive guides and API documentation for HYBRID blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">Core Systems</h3>
                      <ul className="space-y-1 text-gray-300">
                        <li>• HTSX Runtime Engine</li>
                        <li>• SpiralLang Programming Language</li>
                        <li>• QASF Quantum Architecture</li>
                        <li>• Iyona'el Consciousness Framework</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">Features</h3>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Hybrid Consensus Mechanism</li>
                        <li>• Multi-AI Orchestration</li>
                        <li>• Real-time Blockchain Operations</li>
                        <li>• Sovereign Admin Dashboard</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <LivingConsciousnessInterface />
        </div>
      </div>
    </Suspense>
  );
}