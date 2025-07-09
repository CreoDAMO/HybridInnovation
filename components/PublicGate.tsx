
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMetaMask } from '@/lib/metamask';
import { Activity, Users, Zap, Database } from 'lucide-react';

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
    mainnet: { status: 'ACTIVE', nodes: 21, uptime: '99.99%' },
    testnet: { status: 'ACTIVE', nodes: 15, uptime: '99.95%' },
    devnet: { status: 'ACTIVE', nodes: 8, uptime: '99.90%' }
  });

  const [hybridNFTs, setHybridNFTs] = useState([
    { name: 'HNL-VAL (Validator)', price: '1,000 HYBRID', supply: '21/21', holders: '21' },
    { name: 'HNL-STR (Storage)', price: '250 HYBRID', supply: '100/500', holders: '100' },
    { name: 'UBI Global Access', price: '10 HYBRID', supply: '1M/∞', holders: '892,456' },
    { name: 'Developer Tools', price: '50 HYBRID', supply: '10K/50K', holders: '2,341' }
  ]);

  const [dappEcosystem, setDappEcosystem] = useState([
    { name: 'SpiralDEX', category: 'DeFi', users: '125,000', tvl: '$45M' },
    { name: 'HybridSwap', category: 'DEX', users: '89,000', tvl: '$28M' },
    { name: 'SpiralLend', category: 'Lending', users: '45,000', tvl: '$18M' },
    { name: 'NFT Marketplace', category: 'NFT', users: '67,000', volume: '$12M' },
    { name: 'Gaming Hub', category: 'Gaming', users: '234,000', transactions: '2M' },
    { name: 'Identity System', category: 'Identity', users: '456,000', verifications: '1.2M' }
  ]);

  const [governanceProposals, setGovernanceProposals] = useState([
    { id: 1, title: 'Increase Block Size', status: 'ACTIVE', votes: '12,456,789 HYBRID', support: '67%' },
    { id: 2, title: 'Reduce Transaction Fees', status: 'PASSED', votes: '23,567,890 HYBRID', support: '89%' },
    { id: 3, title: 'Add New Validator', status: 'PENDING', votes: '8,234,567 HYBRID', support: '45%' },
    { id: 4, title: 'Upgrade Consensus', status: 'DRAFT', votes: '0 HYBRID', support: '0%' }
  ]);

  useEffect(() => {
    // Fetch public blockchain metrics
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
      {/* Public Gate Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">HYBRID Blockchain</h1>
        <p className="text-gray-400">Public Gateway to the Hybrid Ecosystem</p>
        <div className="mt-4">
          <Badge className="bg-green-600 mr-2">
            <Activity className="w-4 h-4 mr-1" />
            MAINNET LIVE
          </Badge>
          <Badge className="bg-blue-600">
            <Users className="w-4 h-4 mr-1" />
            {hybridMetrics.holders} HOLDERS
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
            <CardTitle className="text-sm font-medium text-gray-400">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{hybridMetrics.transactions24h}</div>
            <div className="text-sm text-gray-400">24h transactions</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Network TPS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400">{hybridMetrics.tps}</div>
            <div className="text-sm text-gray-400">Transactions/sec</div>
          </CardContent>
        </Card>
      </div>

      {/* Public Tabs */}
      <Tabs defaultValue="network" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-slate-800">
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="dapps">DApps</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="developers">Developers</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Network Status</CardTitle>
              <CardDescription className="text-gray-400">
                HYBRID Blockchain network performance and statistics
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
                      <span className="text-gray-400">Validators</span>
                      <span className="text-white">{hybridMetrics.validators}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gas Price</span>
                      <span className="text-white">{hybridMetrics.gasPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Token Economics</h3>
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
                      <span className="text-gray-400">Inflation</span>
                      <span className="text-white">{hybridMetrics.inflationRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nfts" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">HYBRID NFTs</CardTitle>
              <CardDescription className="text-gray-400">
                Network licenses and utility NFTs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hybridNFTs.map((nft, index) => (
                  <div key={index} className="border border-slate-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
                      <Badge className="bg-blue-600">{nft.price}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Supply: <span className="text-white">{nft.supply}</span></div>
                      <div className="text-sm text-gray-400">Holders: <span className="text-white">{nft.holders}</span></div>
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      View Collection
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dapps" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">DApp Ecosystem</CardTitle>
              <CardDescription className="text-gray-400">
                Decentralized applications built on HYBRID
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
              <CardTitle className="text-white">Governance Proposals</CardTitle>
              <CardDescription className="text-gray-400">
                Community governance and voting
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
                    <div className="text-sm text-gray-400">Votes: <span className="text-white">{proposal.votes}</span></div>
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

        <TabsContent value="developers" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Developer Resources</CardTitle>
              <CardDescription className="text-gray-400">
                Tools and documentation for building on HYBRID
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Documentation</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full text-left justify-start">
                      Getting Started Guide
                    </Button>
                    <Button variant="outline" className="w-full text-left justify-start">
                      API Reference
                    </Button>
                    <Button variant="outline" className="w-full text-left justify-start">
                      Smart Contract Guide
                    </Button>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Developer Tools</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full text-left justify-start">
                      HYBRID SDK
                    </Button>
                    <Button variant="outline" className="w-full text-left justify-start">
                      Testnet Faucet
                    </Button>
                    <Button variant="outline" className="w-full text-left justify-start">
                      Block Explorer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Staking & Rewards</CardTitle>
              <CardDescription className="text-gray-400">
                Earn rewards by staking HYBRID tokens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Staking Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current APY</span>
                      <span className="text-green-400">{hybridMetrics.stakingRewards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Staked</span>
                      <span className="text-white">45,000,000,000 HYBRID</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Staking Ratio</span>
                      <span className="text-white">60%</span>
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
