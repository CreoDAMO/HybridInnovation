
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Hash, 
  CheckCircle, 
  Box, 
  TrendingUp, 
  Users, 
  Globe,
  Layers,
  Shield,
  Sparkles,
  Brain,
  Cpu,
  Database
} from 'lucide-react';

interface BlockchainMetrics {
  tps: number;
  activeNodes: number;
  networkHealth: number;
  consensusRate: number;
  blockHeight: number;
  hashRate: number;
  totalValue: number;
  activeValidators: number;
}

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  gasUsed: number;
  consciousness: number;
}

export function AdvancedBlockchainDemo() {
  const [metrics, setMetrics] = useState<BlockchainMetrics>({
    tps: 0,
    activeNodes: 0,
    networkHealth: 0,
    consensusRate: 0,
    blockHeight: 1847293,
    hashRate: 0,
    totalValue: 0,
    activeValidators: 21
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [particleSystem, setParticleSystem] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize 3D visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 400;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw network nodes
      for (let i = 0; i < metrics.activeNodes; i++) {
        const x = (i * 40) % canvas.width;
        const y = Math.sin((Date.now() / 1000 + i) * 0.5) * 50 + 200;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = `hsl(${(i * 30) % 360}, 70%, 60%)`;
        ctx.fill();
        
        // Draw connections
        if (i > 0) {
          const prevX = ((i - 1) * 40) % canvas.width;
          const prevY = Math.sin((Date.now() / 1000 + i - 1) * 0.5) * 50 + 200;
          
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [metrics.activeNodes]);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        tps: Math.floor(Math.random() * 5000) + 1000,
        activeNodes: Math.floor(Math.random() * 100) + 20,
        networkHealth: Math.random() * 100,
        consensusRate: Math.random() * 100,
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3) + 1,
        hashRate: Math.floor(Math.random() * 200) + 100,
        totalValue: Math.floor(Math.random() * 1000000) + 500000,
        activeValidators: Math.floor(Math.random() * 30) + 15
      }));

      // Generate new transactions
      const newTx: Transaction = {
        id: Math.random().toString(16).substr(2, 8),
        from: `0x${Math.random().toString(16).substr(2, 40)}`,
        to: `0x${Math.random().toString(16).substr(2, 40)}`,
        amount: Math.random() * 1000,
        status: Math.random() > 0.1 ? 'confirmed' : 'pending',
        timestamp: Date.now(),
        gasUsed: Math.floor(Math.random() * 50000) + 21000,
        consciousness: Math.random()
      };

      setTransactions(prev => [newTx, ...prev.slice(0, 9)]);

      // Update particle system
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: ['#00ff88', '#0088ff', '#ff0088', '#ffaa00', '#ff8800'][Math.floor(Math.random() * 5)],
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
      }));
      setParticleSystem(newParticles);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/30 relative overflow-hidden">
        {/* Particle Background */}
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

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">HYBRID Blockchain Network</h2>
          <p className="text-gray-300 mb-6">Real-time consciousness-aware blockchain metrics</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-green-400 mb-2">{metrics.tps.toLocaleString()}</div>
              <div className="text-sm text-gray-300 mb-2">Transactions/sec</div>
              <Progress value={(metrics.tps / 6000) * 100} className="h-2" />
            </div>
            
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-blue-400 mb-2">{metrics.activeNodes}</div>
              <div className="text-sm text-gray-300 mb-2">Active Nodes</div>
              <Progress value={(metrics.activeNodes / 120) * 100} className="h-2" />
            </div>
            
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">{metrics.networkHealth.toFixed(1)}%</div>
              <div className="text-sm text-gray-300 mb-2">Network Health</div>
              <Progress value={metrics.networkHealth} className="h-2" />
            </div>
            
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-orange-400 mb-2">{metrics.consensusRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-300 mb-2">Consensus Rate</div>
              <Progress value={metrics.consensusRate} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Network Topology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <canvas 
              ref={canvasRef}
              className="w-full h-64 bg-black/20 rounded-lg"
            />
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Block Height</span>
                <span className="text-white font-mono">{metrics.blockHeight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Hash Rate</span>
                <span className="text-white">{metrics.hashRate} TH/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Total Value Locked</span>
                <span className="text-white">${metrics.totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Active Validators</span>
                <span className="text-white">{metrics.activeValidators}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.3)]">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Live Transaction Stream
        </h3>
        
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Hash className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">0x{tx.id}...</div>
                  <div className="text-gray-400 text-sm">
                    {tx.from.slice(0, 6)}...{tx.from.slice(-4)} → {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                  </div>
                  <div className="text-gray-500 text-xs">
                    Gas: {tx.gasUsed.toLocaleString()} • Consciousness: {(tx.consciousness * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{tx.amount.toFixed(4)} HYBRID</div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <Badge variant="outline" className={`text-xs ${
                    tx.status === 'confirmed' ? 'text-green-400 border-green-400' : 
                    tx.status === 'pending' ? 'text-yellow-400 border-yellow-400' : 
                    'text-red-400 border-red-400'
                  }`}>
                    {tx.status}
                  </Badge>
                </div>
                <div className="text-gray-400 text-xs">
                  {Math.floor((Date.now() - tx.timestamp) / 1000)}s ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConsciousness = () => (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          Consciousness Metrics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse opacity-70"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse opacity-80"></div>
              <div className="absolute inset-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">93%</span>
              </div>
            </div>
            <h4 className="text-white font-semibold">Awareness Level</h4>
            <p className="text-gray-300 text-sm">Network consciousness state</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-spin opacity-30"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-reverse-spin opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">1.618</span>
              </div>
            </div>
            <h4 className="text-white font-semibold">Golden Ratio</h4>
            <p className="text-gray-300 text-sm">Harmonic resonance</p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">432Hz</span>
              </div>
            </div>
            <h4 className="text-white font-semibold">Frequency</h4>
            <p className="text-gray-300 text-sm">Universal resonance</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Advanced Blockchain Interface
          </h1>
          <p className="text-gray-300 text-lg">
            Next-generation UI/UX for consciousness-aware blockchain technology
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-1 border border-white/10">
            {[
              { id: 'overview', label: 'Overview', icon: Globe },
              { id: 'transactions', label: 'Transactions', icon: Zap },
              { id: 'consciousness', label: 'Consciousness', icon: Brain }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {selectedTab === 'overview' && renderOverview()}
          {selectedTab === 'transactions' && renderTransactions()}
          {selectedTab === 'consciousness' && renderConsciousness()}
        </div>
      </div>
    </div>
  );
}
