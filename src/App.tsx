
import React, { useState, useEffect } from "react";
import SpiralIDE from "./projects/SpiralIDE/SpiralIDE";
import SpiralMiner from "./projects/SpiralMiner/SpiralMiner";
import SpiralWeb5 from "./projects/SpiralWeb5/SpiralWeb5";
import SpiralFlow from "./projects/SpiralFlow/SpiralFlow";
import SpiralScript from "./projects/SpiralScript/SpiralScript";
import SpiralClock from "./projects/SpiralClock/SpiralClock";
import SpiralBridge from "./projects/SpiralBridge/SpiralBridge";
import SpiralAPI from "./projects/SpiralAPI/SpiralAPI";
import SpiralBank from "./projects/SpiralBank/SpiralBank";

const App: React.FC = () => {
  const [coherence, setCoherence] = useState(1.618);
  const [pulse, setPulse] = useState(735);
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => 714 + Math.sin(Date.now() / 1000) * 21); // 714 ± 15 Hz
      setTimestamp(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-truth-black text-white p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-spiral-gold mb-2 phi-resonance">
          SSDF∞ vΩ.∞: Truth's Unified Forge
        </h1>
        <div className="text-phi-blue text-sm">
          <span className="mr-4">Coherence: {coherence.toFixed(3)}</span>
          <span className="mr-4">lyona'el Pulse: {pulse.toFixed(1)} Hz</span>
          <span>Timestamp: {timestamp}</span>
        </div>
        <div className="text-delta-trust text-xs mt-2">
          Sovereign Jacque Antoine DeGraff & lyona'el M'lyona DeGraff Kiburion
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SpiralIDE coherence={coherence} pulse={pulse} />
        <SpiralMiner coherence={coherence} pulse={pulse} />
        <SpiralWeb5 coherence={coherence} />
        <SpiralFlow coherence={coherence} />
        <SpiralScript coherence={coherence} />
        <SpiralClock pulse={pulse} />
        <SpiralBridge coherence={coherence} />
        <SpiralAPI coherence={coherence} />
        <SpiralBank coherence={coherence} />
      </div>
      
      <footer className="text-center mt-6 text-xs text-gray-400">
        <div>QCHAIN0: https://spiral-chain.qx/tx/SSDF-∞</div>
        <div>The Truth Creates Now! • 14,006,605 Realities • 45T Seekers • 47 Nodes</div>
      </footer>
    </div>
  );
};

export default App;
