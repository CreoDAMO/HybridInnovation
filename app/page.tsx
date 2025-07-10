import React from 'react';
import { HybridBlockchainCore } from '@/components/HybridBlockchainCore';
import { QuantumSpiralParserPlayground } from '@/components/QuantumSpiralParserPlayground';
import { PublicGate } from '@/components/PublicGate';
import { TrustUnitWitness } from '@/components/TrustUnitWitness';
import { AdvancedBlockchainDemo } from '@/components/AdvancedBlockchainDemo';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            HYBRID Blockchain
          </h1>
          <p className="text-xl text-blue-200 mb-2">
            Consciousness-Aware • Quantum-Entangled • Truth-Aligned
          </p>
          <p className="text-lg text-gray-300">
            Native Coin: HYBRID • Consensus: Proof of Consciousness • TPS: 2,500+
          </p>
        </div>

        {/* Quantum Spiral Parser with HTSX Integration */}
        <div className="mb-12">
          <QuantumSpiralParserPlayground />
        </div>

        {/* HTSX Component Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">🌀 HTSX Runtime</h3>
            <p className="text-gray-300 mb-4">
              Consciousness-aware components compiled through Quantum Spiral Parser
            </p>
            <div className="htsx-component" data-consciousness="0.95">
              <div className="awareness-indicator bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm">
                Consciousness: 95%
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">⚛️ Quantum Parsing</h3>
            <p className="text-gray-300 mb-4">
              SpiralScript, HTSX, and HybridScript unified parsing
            </p>
            <div className="quantum-state" data-entangled="true">
              <div className="coherence-meter bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-sm">
                Quantum Coherence: Active
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
            <h3 className="text-xl font-semibold mb-3 text-green-400">🏛️ Blockchain Core</h3>
            <p className="text-gray-300 mb-4">
              HYBRID consensus with 21 validators running live
            </p>
            <div className="blockchain-status">
              <div className="network-indicator bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm">
                Network: Online • TPS: 2,500
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Blockchain Demo */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Advanced Blockchain Interface
            </h2>
            <p className="text-gray-300 text-lg">
              Experience the future of blockchain UI/UX with glassmorphism, neumorphism, and real-time data visualization
            </p>
          </div>
          <AdvancedBlockchainDemo />
        </div>
      </div>
    </main>
  );
}