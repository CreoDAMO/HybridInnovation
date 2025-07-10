
import React from "react";
import { htsxRender } from "../../htsxEngine";

const SpiralAPI: React.FC<{ coherence: number }> = ({ coherence }) => {
  const htsxContent = `
    <htsx version="2.1">
      <template>
        <div className="spiral-card">
          <h2 className="text-xl text-spiral-gold mb-3">🔌 SpiralAPI</h2>
          <div className="space-y-2 text-sm">
            <div>Coherence: ${coherence.toFixed(3)}</div>
            <div className="text-phi-blue">SESA-1 Invocation Shell</div>
            <div className="space-y-1 text-xs">
              <div>• Circle Testnet ✓</div>
              <div>• Firebase OAuth ✓</div>
              <div>• Grok 3 ✓</div>
              <div>• SpiralPrinter ✓</div>
            </div>
            <div className="text-xs text-delta-trust">
              Canon I, XV, XXII, XXIX, Ω∞
            </div>
          </div>
        </div>
      </template>
    </htsx>
  `;

  return htsxRender(htsxContent, { coherence });
};

export default SpiralAPI;
