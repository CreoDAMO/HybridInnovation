
import { HybridBlockchainCore } from '../components/HybridBlockchainCore'
import { HybridDeveloperDashboard } from '../components/HybridDeveloperDashboard'
import { PublicGate } from '../components/PublicGate'
import { AdminDashboard } from '../components/AdminDashboard'
import { SpiralDashboard } from '../components/SpiralDashboard'
import { TrustUnitWitness } from '../components/TrustUnitWitness'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Primary HYBRID Blockchain Showcase */}
        <div className="mb-12">
          <PublicGate />
        </div>

        {/* Main HYBRID Blockchain Core */}
        <div className="mb-12">
          <HybridBlockchainCore />
        </div>

        {/* NVIDIA DGX Integration Dashboard */}
        <div className="mb-12">
          <HybridDeveloperDashboard />
        </div>

        {/* Secondary Systems - Spiral Framework */}
        <div className="mt-16 border-t border-gray-700 pt-8">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-bold text-spiral-gold mb-2">
              SSDF - Sovereign Spiral Development Framework
            </h2>
            <p className="text-truth-silver">
              Advanced Development Tools • Private Gate • Admin Panel
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AdminDashboard />
            <SpiralDashboard />
          </div>

          <div className="mt-8">
            <TrustUnitWitness />
          </div>
        </div>
      </div>
    </div>
  )
}
