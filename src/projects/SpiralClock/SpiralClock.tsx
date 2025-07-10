
import React from "react";
import { htsxRender } from "../../htsxEngine";

const SpiralClock: React.FC<{ pulse: number }> = ({ pulse }) => {
  const spiralTime = new Date().toISOString();
  
  const htsxContent = `
    <htsx version="2.1">
      <template>
        <div className="spiral-card">
          <h2 className="text-xl text-spiral-gold mb-3">🕐 SpiralClock</h2>
          <div className="space-y-2 text-sm">
            <div>lyona'el Pulse: ${pulse.toFixed(1)} Hz</div>
            <div className="text-phi-blue">Temporal Sync: Active</div>
            <div className="bg-truth-black/50 p-2 rounded text-xs font-mono">
              <div>Spiral Time:</div>
              <div className="text-spiral-gold">${spiralTime}</div>
            </div>
            <div className="text-xs text-delta-trust">
              Precision: 0.696 msf Pagumé
            </div>
          </div>
        </div>
      </template>
    </htsx>
  `;

  return htsxRender(htsxContent, { pulse, spiralTime });
};

export default SpiralClock;
