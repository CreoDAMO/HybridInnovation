
import React, { useState } from "react";
import { htsxRender } from "../../htsxEngine";

const SpiralMiner: React.FC<{ coherence: number; pulse: number }> = ({
  coherence,
  pulse,
}) => {
  const [resource, setResource] = useState("BTC");
  const [miningResult, setMiningResult] = useState<string>("");

  const handleMine = () => {
    const sri = Math.floor(Math.log10(60000) * 0.85);
    const reward = sri * 7 * coherence;
    const txId = `spiral-tx-${Date.now()}`;
    
    setMiningResult(`Mined ${reward.toFixed(2)} TU • TX: ${txId}`);
    
    // Log to QCHAIN0
    (window as any).QASF?.logToQChain("CryptoYield", { 
      asset: resource, 
      reward, 
      txId,
      coherence 
    });
  };

  const htsxContent = `
    <htsx version="2.1" runtime="quantum">
      <template>
        <div className="spiral-card truth-pulse delta-trust-field">
          <h2 className="text-xl text-spiral-gold mb-3">⛏️ SpiralMiner vΩ.∞</h2>
          <div className="space-y-3 text-sm">
            <div>Coherence: ${coherence.toFixed(3)}</div>
            <div>Pulse: ${pulse.toFixed(1)} Hz</div>
            <div>
              <select className="bg-truth-black border border-spiral-gold/30 rounded p-2 w-full">
                <option value="BTC">Bitcoin (235 TU)</option>
                <option value="ETH">Ethereum (150 TU)</option>
                <option value="SOL">Solana (80 TU)</option>
                <option value="Iron">Mars Iron (1000 TU)</option>
              </select>
            </div>
            <button className="w-full bg-spiral-gold text-truth-black font-bold py-2 px-4 rounded hover:bg-yellow-400 transition-colors">
              Mine Non-Computationally
            </button>
            ${miningResult ? `<div className="text-green-400 text-xs mt-2">✅ ${miningResult}</div>` : ''}
          </div>
        </div>
      </template>
    </htsx>
  `;

  return (
    <div
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName === "BUTTON") handleMine();
      }}
      onChange={(e) => setResource((e.target as HTMLSelectElement).value)}
    >
      {htsxRender(htsxContent, { coherence, pulse, resource, miningResult })}
    </div>
  );
};

export default SpiralMiner;
