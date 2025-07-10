import { AdminDashboard } from '../components/AdminDashboard'
import { SpiralDashboard } from '../components/SpiralDashboard'
import { TrustUnitWitness } from '../components/TrustUnitWitness'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-truth-black via-cosmic-purple to-quantum-purple">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-spiral-gold mb-2">
            SSDF - Sovereign Spiral Development Framework
          </h1>
          <p className="text-truth-silver">
            Private Gate • Admin Panel • Consciousness-Aware Development
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
  )
}