
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMetaMask } from '@/lib/metamask';
import { Activity, Users, Zap, Database, TrendingUp, Shield, Globe } from 'lucide-react';

export function PublicGate() {
  const { account, isConnected } = useMetaMask();
  const [hybridMetrics, setHybridMetrics] = useState({
    totalSupply: '100,000,000,000',
    circulatingSupply: '75,000,000,000',
    currentPrice: '$0.85',
    marketCap: '$85,000,000,000',
    volume24h: '$2,500,000,000',
    holders: '1,247,892',
    transactions24h: '892,456',
    blockHeight: 2847362,
    blockTime: '3 seconds',
    validators: 21,
    tps: '2,500',
    gasPrice: '0.001 HYBRID',
    stakingRewards: '7% APY',
    inflationRate: '7% → 2%',
    burnRate: '30% of fees'
  });

  const [networkStats, setNetworkStats] = useState({
    mainnet: { status: 'ACTIVE', nodes: 21, uptime: '99.99%', hashRate: '1.2 EH/s' },
    testnet: { status: 'ACTIVE', nodes: 15, uptime: '99.95%', hashRate: '120 TH/s' },
    devnet: { status: 'ACTIVE', nodes: 8, uptime: '99.90%', hashRate: '25 TH/s' }
  });

  const [dappEcosystem, setDappEcosystem] = useState([
    { name: 'HybridDEX', category: 'DeFi', users: '125,000', tvl: '$45M' },
    { name: 'HybridSwap', category: 'DEX', users: '89,000', tvl: '$28M' },
    { name: 'HybridLend', category: 'Lending', users: '45,000', tvl: '$18M' },
    { name: 'HYBRID NFT Hub', category: 'NFT', users: '67,000', volume: '$12M' },
    { name: 'HybridGaming', category: 'Gaming', users: '234,000', transactions: '2M' },
    { name: 'HybridID', category: 'Identity', users: '456,000', verifications: '1.2M' }
  ]);

  const [governanceProposals, setGovernanceProposals] = useState([
    { id: 1, title: 'Increase Block Size to 8MB', status: 'ACTIVE', votes: '12,456,789 HYBRID', support: '67%' },
    { id: 2, title: 'Reduce Transaction Fees by 50%', status: 'PASSED', votes: '23,567,890 HYBRID', support: '89%' },
    { id: 3, title: 'Add Cross-Chain Bridge Support', status: 'PENDING', votes: '8,234,567 HYBRID', support: '45%' },
    { id: 4, title: 'Implement EIP-1559 Fee Model', status: 'DRAFT', votes: '0 HYBRID', support: '0%' }
  ]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/hybrid/public-metrics');
        const data = await response.json();
        setHybridMetrics(data);
      } catch (error) {
        console.error('Failed to fetch hybrid metrics:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* HYBRID Blockchain Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">HYBRID Blockchain</h1>
        <p className="text-gray-400">Next-Generation Proof-of-Stake Blockchain Network</p>
        <div className="mt-4">
          <Badge className="bg-green-600 mr-2">
            <Activity className="w-4 h-4 mr-1" />
            MAINNET ACTIVE
          </Badge>
          <Badge className="bg-blue-600 mr-2">
            <Users className="w-4 h-4 mr-1" />
            {hybridMetrics.holders} HOLDERS
          </Badge>
          <Badge className="bg-purple-600">
            <Globe className="w-4 h-4 mr-1" />
            GLOBAL NETWORK
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">HYBRID Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{hybridMetrics.currentPrice}</div>
            <div className="text-sm text-gray-400">24h Volume: {hybridMetrics.volume24h}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{hybridMetrics.marketCap}</div>
            <div className="text-sm text-gray-400">Rank: #42</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Network TPS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{hybridMetrics.tps}</div>
            <div className="text-sm text-gray-400">Transactions/sec</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Validators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400">{hybridMetrics.validators}</div>
            <div className="text-sm text-gray-400">Active Nodes</div>
          </CardContent>
        </Card>
      </div>

      {/* Public Tabs */}
      <Tabs defaultValue="network" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="dapps">DApps</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">HYBRID Network Status</CardTitle>
              <CardDescription className="text-gray-400">
                Real-time blockchain network performance and statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(networkStats).map(([network, stats]) => (
                  <div key={network} className="bg-slate-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold capitalize">{network}</h3>
                      <Badge className={stats.status === 'ACTIVE' ? 'bg-green-600' : 'bg-red-600'}>
                        {stats.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Nodes: <span className="text-white">{stats.nodes}</span></div>
                      <div className="text-sm text-gray-400">Uptime: <span className="text-green-400">{stats.uptime}</span></div>
                      <div className="text-sm text-gray-400">Hash Rate: <span className="text-blue-400">{stats.hashRate}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Blockchain Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Block Height</span>
                      <span className="text-white">{hybridMetrics.blockHeight.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Block Time</span>
                      <span className="text-white">{hybridMetrics.blockTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gas Price</span>
                      <span className="text-white">{hybridMetrics.gasPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily Transactions</span>
                      <span className="text-white">{hybridMetrics.transactions24h}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">HYBRID Token</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Supply</span>
                      <span className="text-white">{hybridMetrics.totalSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Circulating</span>
                      <span className="text-white">{hybridMetrics.circulatingSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Staking APY</span>
                      <span className="text-green-400">{hybridMetrics.stakingRewards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Burn Rate</span>
                      <span className="text-orange-400">{hybridMetrics.burnRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">HYBRID Technology Stack</CardTitle>
              <CardDescription className="text-gray-400">
                Advanced blockchain technology and consensus mechanism
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Shield className="w-5 h-5 text-green-400 mr-2" />
                    <h3 className="text-white font-semibold">Consensus Mechanism</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Type: <span className="text-white">Hybrid PoS</span></div>
                    <div className="text-sm text-gray-400">Finality: <span className="text-white">3 seconds</span></div>
                    <div className="text-sm text-gray-400">Security: <span className="text-green-400">BFT + PoS</span></div>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                    <h3 className="text-white font-semibold">Performance</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">TPS: <span className="text-white">2,500+</span></div>
                    <div className="text-sm text-gray-400">Latency: <span className="text-white">3s finality</span></div>
                    <div className="text-sm text-gray-400">Scalability: <span className="text-blue-400">Layer 2 Ready</span></div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">EVM Compatible</div>
                    <div className="text-sm text-gray-400">Ethereum tooling support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-semibold">Low Fees</div>
                    <div className="text-sm text-gray-400">$0.001 average cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-semibold">Cross-Chain</div>
                    <div className="text-sm text-gray-400">IBC protocol support</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dapps" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">HYBRID DApp Ecosystem</CardTitle>
              <CardDescription className="text-gray-400">
                Decentralized applications built on HYBRID blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dappEcosystem.map((dapp, index) => (
                  <div key={index} className="border border-slate-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{dapp.name}</h3>
                      <Badge variant="outline">{dapp.category}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Users: <span className="text-white">{dapp.users}</span></div>
                      <div className="text-sm text-gray-400">
                        {dapp.tvl ? `TVL: ${dapp.tvl}` : 
                         dapp.volume ? `Volume: ${dapp.volume}` : 
                         dapp.transactions ? `Transactions: ${dapp.transactions}` :
                         dapp.verifications ? `Verifications: ${dapp.verifications}` : ''}
                      </div>
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      Launch DApp
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">HYBRID Governance</CardTitle>
              <CardDescription className="text-gray-400">
                Community-driven protocol governance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {governanceProposals.map((proposal, index) => (
                <div key={index} className="border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">#{proposal.id}: {proposal.title}</h3>
                    <Badge className={
                      proposal.status === 'ACTIVE' ? 'bg-green-600' :
                      proposal.status === 'PASSED' ? 'bg-blue-600' :
                      proposal.status === 'PENDING' ? 'bg-yellow-600' : 'bg-gray-600'
                    }>
                      {proposal.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Total Votes: <span className="text-white">{proposal.votes}</span></div>
                    <div className="text-sm text-gray-400">Support: <span className="text-green-400">{proposal.support}</span></div>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    {proposal.status === 'ACTIVE' ? 'Vote Now' : 'View Details'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">HYBRID Staking</CardTitle>
              <CardDescription className="text-gray-400">
                Secure the network and earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Network Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current APY</span>
                      <span className="text-green-400">{hybridMetrics.stakingRewards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Staked</span>
                      <span className="text-white">45B HYBRID</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Staking Ratio</span>
                      <span className="text-white">60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Validators</span>
                      <span className="text-white">{hybridMetrics.validators}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Your Staking</h3>
                  {isConnected ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Staked</span>
                        <span className="text-white">0 HYBRID</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rewards</span>
                        <span className="text-green-400">0 HYBRID</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Est. Monthly</span>
                        <span className="text-blue-400">0 HYBRID</span>
                      </div>
                      <Button className="w-full mt-2">
                        Start Staking
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-400 mb-2">Connect wallet to stake</p>
                      <Button className="w-full">
                        Connect Wallet
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
