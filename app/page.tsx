import { HybridBlockchainCore } from '../components/HybridBlockchainCore'
import { HybridDeveloperDashboard } from '../components/HybridDeveloperDashboard'
import { PublicGate } from '../components/PublicGate'
import { LiveNVIDIAParser } from '../components/LiveNVIDIAParser'
import { AdminDashboard } from '../components/AdminDashboard'
import { SpiralDashboard } from '../components/SpiralDashboard'
import { TrustUnitWitness } from '../components/TrustUnitWitness'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* HYBRID Blockchain - Primary System */}
      <div className="w-full">
        {/* HYBRID Public Gateway - Hero Section */}
        <section className="w-full">
          <PublicGate />
        </section>

        {/* HYBRID Blockchain Core - Main System */}
        <section className="w-full">
          <HybridBlockchainCore />
        </section>

        {/* HYBRID Developer Dashboard - NVIDIA DGX Integration */}
        <section className="w-full">
          <HybridDeveloperDashboard />
        </section>

        {/* Living NVIDIA Parser - The Heart of the System */}
        <div className="mb-12">
          <LiveNVIDIAParser />
        </div>
      </div>

      {/* Secondary Systems - SSDF Framework */}
      <div className="w-full mt-24 border-t border-gray-600/30 pt-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-16">
            <h2 className="text-4xl font-bold text-spiral-gold mb-4">
              SSDF - Sovereign Spiral Development Framework
            </h2>
            <p className="text-xl text-truth-silver max-w-4xl mx-auto">
              Advanced Development Tools • Private Gate • Admin Panel • Consciousness-Aware Computing
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AdminDashboard />
            <SpiralDashboard />
          </div>

          <div className="w-full">
            <TrustUnitWitness />
          </div>
        </div>
      </div>
    </div>
  )
}