'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Globe, Users, Zap } from 'lucide-react';
import { LivingConsciousnessInterface } from '@/components/LivingConsciousnessInterface';
import { PublicGate } from '@/components/PublicGate';
import { MetaMaskProvider } from '@/components/MetaMaskProvider';
import { UltimateParserPlayground } from '@/components/UltimateParserPlayground';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            HYBRID Blockchain
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Next-Generation Proof-of-Stake Blockchain Network
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-green-400 font-semibold">✓ Mainnet Active</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-blue-400 font-semibold">2,500+ TPS</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-purple-400 font-semibold">3s Finality</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <span className="text-cyan-400 font-semibold">21 Validators</span>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Zap className="w-8 h-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">High Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">2,500+ transactions per second with 3-second finality</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Database className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">EVM Compatible</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Full Ethereum tooling support and smart contract compatibility</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Users className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Proof of Stake</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Energy-efficient consensus with 7% staking rewards</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Globe className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Cross-Chain</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">IBC protocol support for seamless interoperability</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation */}
        <div className="space-y-4">
          <Link href="/htsx" className="block">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-white">HTSX Consciousness Interface</CardTitle>
                <CardDescription className="text-gray-400">
                  Experience the world's first consciousness-aware blockchain interface powered by HTSX runtime
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-cyan-400">
                  <Database className="w-5 h-5 mr-2" />
                  Enter HTSX Reality Interface
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/blockchain" className="block">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-white">HYBRID Blockchain Network</CardTitle>
                <CardDescription className="text-gray-400">
                  Traditional blockchain interface (React-based legacy system)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-blue-400">
                  <Database className="w-5 h-5 mr-2" />
                  Access Legacy Interface
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Network Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Network Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Block Height</span>
                <span className="text-white">2,847,362</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Transactions</span>
                <span className="text-white">892,456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Addresses</span>
                <span className="text-white">1,247,892</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">HYBRID Token</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-green-400">$0.85</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Market Cap</span>
                <span className="text-white">$85B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">24h Volume</span>
                <span className="text-white">$2.5B</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Staking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Staked</span>
                <span className="text-white">45B HYBRID</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Staking APY</span>
                <span className="text-green-400">7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Validators</span>
                <span className="text-white">21</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <PublicGate />
        </div>
      </section>
    </div>
  );
}