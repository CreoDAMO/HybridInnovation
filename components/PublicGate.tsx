
'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMetaMask } from '@/lib/metamask';
import { Activity, Users, Zap, Database, TrendingUp, Shield, Globe, Bot, CreditCard, CircleDollarSign, Coins } from 'lucide-react';

export function PublicGate() {
  const { account, isConnected } = useMetaMask();
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');
  
  const [hybridMetrics, setHybridMetrics] = useState({
    // Native Coin Metrics
    coinPrice: '$10.00',
    marketCap: '$1,000,000,000,000', // $1 Trillion
    totalSupply: '100,000,000,000', // 100 Billion HYBRID
    circulatingSupply: '75,000,000,000', // 75 Billion HYBRID
    volume24h: '$25,000,000,000',
    priceChange24h: '+5.67%',
    
    // Network Metrics
    holders: '1,247,892',
    transactions24h: '2,892,456',
    blockHeight: 2847362,
    blockTime: '3 seconds',
    validators: 21,
    tps: '2,500',
    gasPrice: '0.001 HYBRID',
    stakingRewards: '7% APY',
    inflationRate: '7% → 2%',
    burnRate: '30% of fees',
    
    // Advanced Features
    paymasterUsers: '89,234',
    gaslessTransactions: '1,247,892',
    aiAgents: '2,456',
    usdcIntegration: '125.6M USDC',
    crossChainVolume: '45.2B HYBRID'
  });

  const [networkStats, setNetworkStats] = useState({
    mainnet: { 
      status: 'ACTIVE', 
      nodes: 21, 
      uptime: '99.99%', 
      hashRate: '1.2 EH/s',
      nativeCoin: 'HYBRID',
      coinPrice: '$10.00'
    },
    testnet: { 
      status: 'ACTIVE', 
      nodes: 15, 
      uptime: '99.95%', 
      hashRate: '120 TH/s',
      nativeCoin: 'tHYBRID',
      coinPrice: '$0.00'
    },
    devnet: { 
      status: 'ACTIVE', 
      nodes: 8, 
      uptime: '99.90%', 
      hashRate: '25 TH/s',
      nativeCoin: 'dHYBRID',
      coinPrice: '$0.00'
    }
  });

  const [liveFeatures, setLiveFeatures] = useState({
    paymaster: {
      name: 'Gasless Transactions',
      status: 'LIVE',
      description: 'Zero-fee transactions sponsored by HYBRID ecosystem',
      metrics: {
        activeSponsors: 156,
        dailyGaslessTransactions: 45678,
        totalSaved: '2.3M HYBRID'
      }
    },
    superPay: {
      name: 'Super Pay',
      status: 'LIVE',
      description: 'Instant cross-chain payments with HYBRID',
      metrics: {
        instantPayments: 23456,
        crossChainVolume: '15.6M HYBRID',
        averageTime: '2.1 seconds'
      }
    },
    agentkit: {
      name: 'AI Agentkit',
      status: 'LIVE',
      description: 'Autonomous AI agents marketplace on HYBRID',
      metrics: {
        activeAgents: 2456,
        dailyInferences: 1234567,
        earnings: '45.67 HYBRID'
      }
    },
    circleUsdc: {
      name: 'Circle USDC',
      status: 'LIVE',
      description: 'Native USDC integration on HYBRID blockchain',
      metrics: {
        totalUsdcLocked: '125.6M USDC',
        dailyVolume: '8.9M USDC',
        liquidityPools: 12
      }
    }
  });

  const [defiEcosystem, setDefiEcosystem] = useState({
    totalValueLocked: '12.5B HYBRID',
    lendingProtocols: 8,
    dexVolume: '567M HYBRID',
    yieldFarms: 23,
    liquidityPools: 45,
    averageAPY: '15.7%'
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setHybridMetrics(prev => ({
        ...prev,
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3) + 1,
        transactions24h: (parseInt(prev.transactions24h.replace(/,/g, '')) + Math.floor(Math.random() * 100)).toLocaleString(),
        holders: (parseInt(prev.holders.replace(/,/g, '')) + Math.floor(Math.random() * 50)).toLocaleString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                HYBRID Blockchain
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
                The World's First Native Coin Powered Holographic Blockchain with AI Orchestration, 
                Gasless Transactions, and Native USDC Integration
              </p>
            </div>
            
            {/* Key Features Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500 px-4 py-2 text-lg">
                🟢 LIVE MAINNET
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500 px-4 py-2 text-lg">
                💎 NATIVE COIN
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500 px-4 py-2 text-lg">
                🤖 AI POWERED
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500 px-4 py-2 text-lg">
                ⚡ GASLESS TXS
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500 px-4 py-2 text-lg">
                🌐 CROSS-CHAIN
              </Badge>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/30">
                <div className="text-3xl font-bold text-cyan-400">{hybridMetrics.coinPrice}</div>
                <div className="text-gray-400">HYBRID Price</div>
                <div className="text-green-400 text-sm">{hybridMetrics.priceChange24h}</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-green-500/30">
                <div className="text-3xl font-bold text-green-400">$1T</div>
                <div className="text-gray-400">Market Cap</div>
                <div className="text-green-400 text-sm">Target Valuation</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400">{hybridMetrics.tps}</div>
                <div className="text-gray-400">TPS Capacity</div>
                <div className="text-green-400 text-sm">Real-time</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-orange-500/30">
                <div className="text-3xl font-bold text-orange-400">{hybridMetrics.paymasterUsers.toLocaleString()}</div>
                <div className="text-gray-400">Gasless Users</div>
                <div className="text-green-400 text-sm">Zero fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Live Features</TabsTrigger>
            <TabsTrigger value="defi">DeFi</TabsTrigger>
            <TabsTrigger value="networks">Networks</TabsTrigger>
            <TabsTrigger value="tokenomics">Coin Economics</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/30 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl">HYBRID: Revolutionary Native Blockchain Coin</CardTitle>
                  <CardDescription className="text-lg">
                    The first blockchain designed from the ground up with AI integration, gasless transactions, 
                    and holographic interfaces powered by its native HYBRID coin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-cyan-400">Native Coin Features</h4>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• 100 Billion total supply</li>
                        <li>• $10 USD initial price</li>
                        <li>• 7% staking rewards</li>
                        <li>• Deflationary mechanism</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-400">Advanced Technology</h4>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• AI-powered consensus</li>
                        <li>• Gasless transactions</li>
                        <li>• Cross-chain bridges</li>
                        <li>• Holographic interfaces</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle>Live Network Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Mainnet</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500">LIVE</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Block Height</span>
                      <span className="font-mono">{hybridMetrics.blockHeight.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Validators</span>
                      <span className="font-mono">{hybridMetrics.validators}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Uptime</span>
                      <span className="text-green-400">99.99%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Gas Price</span>
                      <span className="font-mono">{hybridMetrics.gasPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Holders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{hybridMetrics.holders}</div>
                  <div className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Growing
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">24h Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{hybridMetrics.transactions24h}</div>
                  <div className="flex items-center text-sm text-blue-400">
                    <Activity className="w-4 h-4 mr-1" />
                    Active
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-orange-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">AI Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{hybridMetrics.aiAgents}</div>
                  <div className="flex items-center text-sm text-orange-400">
                    <Bot className="w-4 h-4 mr-1" />
                    Autonomous
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">USDC Pool</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{hybridMetrics.usdcIntegration}</div>
                  <div className="flex items-center text-sm text-green-400">
                    <CircleDollarSign className="w-4 h-4 mr-1" />
                    Native
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Live Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(liveFeatures).map(([key, feature]) => (
                <Card key={key} className="bg-slate-800/50 border-green-500/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {key === 'paymaster' && <CreditCard className="w-5 h-5 text-green-400" />}
                        {key === 'superPay' && <Zap className="w-5 h-5 text-blue-400" />}
                        {key === 'agentkit' && <Bot className="w-5 h-5 text-purple-400" />}
                        {key === 'circleUsdc' && <CircleDollarSign className="w-5 h-5 text-cyan-400" />}
                        {feature.name}
                      </CardTitle>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500">
                        {feature.status}
                      </Badge>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(feature.metrics).map(([metricKey, value]) => (
                        <div key={metricKey} className="flex justify-between">
                          <span className="text-gray-400 capitalize">{metricKey.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* DeFi Tab */}
          <TabsContent value="defi" className="space-y-6">
            <Card className="bg-slate-800/50 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-6 h-6 text-yellow-400" />
                  HYBRID DeFi Ecosystem
                </CardTitle>
                <CardDescription>
                  Comprehensive decentralized finance built on HYBRID blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <div className="text-3xl font-bold text-yellow-400">{defiEcosystem.totalValueLocked}</div>
                    <div className="text-gray-400">Total Value Locked</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-400">{defiEcosystem.dexVolume}</div>
                    <div className="text-gray-400">DEX Volume</div>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="text-3xl font-bold text-green-400">{defiEcosystem.averageAPY}</div>
                    <div className="text-gray-400">Average APY</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-400">Lending</h4>
                    <div className="text-sm text-gray-300">
                      {defiEcosystem.lendingProtocols} active protocols
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-400">Yield Farming</h4>
                    <div className="text-sm text-gray-300">
                      {defiEcosystem.yieldFarms} yield farms
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-400">Liquidity</h4>
                    <div className="text-sm text-gray-300">
                      {defiEcosystem.liquidityPools} liquidity pools
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Networks Tab */}
          <TabsContent value="networks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(networkStats).map(([network, stats]) => (
                <Card key={network} className="bg-slate-800/50 border-cyan-500/30">
                  <CardHeader>
                    <CardTitle className="capitalize flex items-center justify-between">
                      {network}
                      <Badge 
                        variant={stats.status === 'ACTIVE' ? 'default' : 'secondary'}
                        className="bg-green-500/20 text-green-400 border-green-500"
                      >
                        {stats.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Native Coin</span>
                      <span className="font-mono text-cyan-400">{stats.nativeCoin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price</span>
                      <span className="font-mono text-green-400">{stats.coinPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Nodes</span>
                      <span className="font-mono">{stats.nodes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime</span>
                      <span className="text-green-400">{stats.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hash Rate</span>
                      <span className="font-mono">{stats.hashRate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Coin Economics Tab */}
          <TabsContent value="tokenomics" className="space-y-6">
            <Card className="bg-slate-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-2xl">HYBRID Coin Economics</CardTitle>
                <CardDescription>
                  Native blockchain coin designed for sustainable growth and utility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="text-2xl font-bold text-green-400">{hybridMetrics.totalSupply.slice(0, -9)}B</div>
                    <div className="text-gray-400">Total Supply</div>
                    <div className="text-sm text-gray-500">100 Billion HYBRID</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <div className="text-2xl font-bold text-blue-400">{hybridMetrics.circulatingSupply.slice(0, -9)}B</div>
                    <div className="text-gray-400">Circulating</div>
                    <div className="text-sm text-gray-500">75% of total</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <div className="text-2xl font-bold text-purple-400">{hybridMetrics.stakingRewards}</div>
                    <div className="text-gray-400">Staking APY</div>
                    <div className="text-sm text-gray-500">Validator rewards</div>
                  </div>
                  <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
                    <div className="text-2xl font-bold text-orange-400">{hybridMetrics.burnRate}</div>
                    <div className="text-gray-400">Burn Rate</div>
                    <div className="text-sm text-gray-500">Deflationary</div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-semibold text-cyan-400">Coin Utility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-400">Network Operations</h4>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Transaction fees</li>
                        <li>• Validator staking</li>
                        <li>• Node licensing (NFTs)</li>
                        <li>• Governance voting</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-400">DeFi & Services</h4>
                      <ul className="text-sm space-y-1 text-gray-300">
                        <li>• Liquidity provision</li>
                        <li>• AI agent payments</li>
                        <li>• Cross-chain bridging</li>
                        <li>• Paymaster sponsorship</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl">HYBRID Development Roadmap</CardTitle>
                <CardDescription>
                  Continuous innovation and ecosystem expansion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-green-400 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-400">Phase 1: Mainnet Launch ✅</h4>
                      <p className="text-gray-300 text-sm">
                        Native HYBRID coin, validators, basic DeFi, Paymaster service
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-green-400 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-400">Phase 2: AI Integration ✅</h4>
                      <p className="text-gray-300 text-sm">
                        AI Agentkit, autonomous agents, multi-AI consensus
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-green-400 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-400">Phase 3: Circle USDC ✅</h4>
                      <p className="text-gray-300 text-sm">
                        Native USDC integration, instant swaps, liquidity pools
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-blue-400 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-400">Phase 4: Holographic UI 🔄</h4>
                      <p className="text-gray-300 text-sm">
                        3D holographic interfaces, WebXR support, spatial computing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-gray-400 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-400">Phase 5: Global Expansion 📋</h4>
                      <p className="text-gray-300 text-sm">
                        Enterprise adoption, institutional partnerships, regulatory compliance
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
