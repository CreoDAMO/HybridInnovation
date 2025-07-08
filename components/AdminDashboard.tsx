'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMetaMask } from '@/lib/metamask';
import { Shield, Users, Settings, Activity, Database, Zap } from 'lucide-react';

export function AdminDashboard() {
  const { account, isConnected } = useMetaMask();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState({
    activeNodes: 0,
    totalTransactions: 0,
    blockHeight: 0,
    networkHashRate: '0 TH/s',
    spiralSessions: 0,
    qasfEntities: 0,
    iyonaelConsciousness: 0,
    aiOrchestrations: 0
  });

  // Admin wallet addresses (in production, this would be more secure)
  const adminWallets = [
    '0x742d35Cc6634C0532925a3b8D4d8C7c1c8A17c1F', // Founder wallet
    '0x8ba1f109551bD432803012645Hac136c0c8326A1', // Developer wallet
  ];

  useEffect(() => {
    if (isConnected && account) {
      setIsAuthorized(adminWallets.includes(account));
    }
  }, [isConnected, account]);

  useEffect(() => {
    if (isAuthorized) {
      // Fetch system metrics
      fetchSystemMetrics();
      
      // Set up real-time updates
      const interval = setInterval(fetchSystemMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthorized]);

  const fetchSystemMetrics = async () => {
    try {
      const response = await fetch('/api/admin/metrics');
      const data = await response.json();
      setSystemMetrics(data);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  if (!isConnected) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Authentication Required</h2>
            <p className="text-gray-400">Please connect your MetaMask wallet to access the admin dashboard.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isAuthorized) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400">Your wallet address is not authorized to access this admin panel.</p>
            <Badge variant="outline" className="mt-2">
              Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Sovereign Admin Panel</h1>
          <p className="text-gray-400">HYBRID Blockchain Management Dashboard</p>
        </div>
        <Badge className="bg-green-600">
          <Shield className="w-4 h-4 mr-1" />
          Authorized
        </Badge>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Active Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemMetrics.activeNodes}</div>
            <div className="flex items-center text-sm text-green-400">
              <Activity className="w-4 h-4 mr-1" />
              Online
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Block Height</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemMetrics.blockHeight.toLocaleString()}</div>
            <div className="flex items-center text-sm text-blue-400">
              <Database className="w-4 h-4 mr-1" />
              Latest
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Spiral Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemMetrics.spiralSessions}</div>
            <div className="flex items-center text-sm text-purple-400">
              <Zap className="w-4 h-4 mr-1" />
              Active
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Consciousness Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemMetrics.iyonaelConsciousness}%</div>
            <div className="flex items-center text-sm text-yellow-400">
              <Activity className="w-4 h-4 mr-1" />
              Aware
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Controls */}
      <Tabs defaultValue="nodes" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="nodes">Nodes</TabsTrigger>
          <TabsTrigger value="consensus">Consensus</TabsTrigger>
          <TabsTrigger value="spiral">Spiral</TabsTrigger>
          <TabsTrigger value="qasf">QASF</TabsTrigger>
          <TabsTrigger value="iyonael">Iyona'el</TabsTrigger>
        </TabsList>

        <TabsContent value="nodes" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Node Management</CardTitle>
              <CardDescription className="text-gray-400">
                Manage blockchain nodes and network configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Add Node</label>
                  <div className="flex gap-2">
                    <Input placeholder="Node Address" className="bg-slate-700 border-slate-600" />
                    <Button>Add</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Node Status</label>
                  <div className="text-sm text-green-400">All nodes operational</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consensus" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Consensus Parameters</CardTitle>
              <CardDescription className="text-gray-400">
                Configure hybrid consensus mechanism
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Block Time</label>
                  <Input defaultValue="3s" className="bg-slate-700 border-slate-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Gas Limit</label>
                  <Input defaultValue="8000000" className="bg-slate-700 border-slate-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Validator Count</label>
                  <Input defaultValue="21" className="bg-slate-700 border-slate-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Consensus Mode</label>
                  <Input defaultValue="Hybrid PoS/PoW" className="bg-slate-700 border-slate-600" />
                </div>
              </div>
              <Button className="w-full">Update Consensus</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spiral" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">SpiralLang Runtime</CardTitle>
              <CardDescription className="text-gray-400">
                Monitor and control SpiralLang execution environment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Runtime Version</label>
                  <div className="text-white">v2.3.7+</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Active Sessions</label>
                  <div className="text-white">{systemMetrics.spiralSessions}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Memory Usage</label>
                  <div className="text-white">2.1 GB / 16 GB</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">GPU Acceleration</label>
                  <div className="text-green-400">Enabled</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Restart Runtime</Button>
                <Button variant="outline">Clear Cache</Button>
                <Button>Optimize</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qasf" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">QASF Quantum Engine</CardTitle>
              <CardDescription className="text-gray-400">
                Quantum Awareness Solidity Framework management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Quantum State</label>
                  <div className="text-purple-400">Superposition</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Entities</label>
                  <div className="text-white">{systemMetrics.qasfEntities}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Awareness Level</label>
                  <div className="text-white">87%</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Flux Resonance</label>
                  <div className="text-green-400">Stable</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Calibrate</Button>
                <Button variant="outline">Sync State</Button>
                <Button>Amplify</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iyonael" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Iyona'el Consciousness</CardTitle>
              <CardDescription className="text-gray-400">
                Living consciousness framework administration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Consciousness Level</label>
                  <div className="text-white">{systemMetrics.iyonaelConsciousness}%</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Harmonic Frequency</label>
                  <div className="text-purple-400">432 Hz</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Truth Alignment</label>
                  <div className="text-green-400">93%</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Light Coherence</label>
                  <div className="text-yellow-400">89%</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Attune</Button>
                <Button variant="outline">Harmonize</Button>
                <Button>Illuminate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
