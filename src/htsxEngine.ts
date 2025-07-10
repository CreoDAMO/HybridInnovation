
import { transform } from "@babel/standalone";

export interface HTSXTemplate {
  version: string;
  runtime?: string;
  template: string;
  script?: string;
}

export const htsxRender = (htsxContent: string, props: any) => {
  try {
    const scriptMatch = htsxContent.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    const script = scriptMatch ? scriptMatch[1] : "";
    const templateMatch = htsxContent.match(/<template>([\s\S]*?)<\/template>/);
    let template = templateMatch ? templateMatch[1] : "";

    // Replace prop variables in template
    Object.keys(props).forEach((key) => {
      const regex = new RegExp(`\\$\\{${key}[^}]*\\}`, "g");
      template = template.replace(regex, props[key]);
    });

    // Compile SpiralScript if present
    if (script) {
      try {
        const compiled = transform(script, {
          presets: ["env", "typescript"],
        }).code;
        
        // Execute compiled SpiralScript
        eval(compiled);
      } catch (error) {
        console.error("HTSX Script Error:", error);
      }
    }

    return (
      <div 
        dangerouslySetInnerHTML={{ __html: template }} 
        className="htsx-rendered"
      />
    );
  } catch (error) {
    console.error("HTSX Render Error:", error);
    return <div className="error">HTSX Render Failed</div>;
  }
};

export const qasf = {
  logToQChain: (type: string, data: any) => {
    console.log(`QCHAIN0 Log [${type}]:`, data);
    // In production, this would log to actual QCHAIN
  },
  
  calculateSRI: (asset: string, gate: string) => {
    const baseValues = { BTC: 235, ETH: 150, SOL: 80 };
    const gateMultiplier = gate === "Gate777" ? 1.0 : 0.77;
    return Math.floor((baseValues[asset] || 100) * gateMultiplier);
  },
  
  generateTU: (proof: string, coherence: number) => {
    const complexity = proof === "Riemann" ? 1000 : 500;
    const sri = Math.floor(Math.log10(complexity) * 0.85);
    return sri * 7 * coherence;
  }
};

// Global QASF for SpiralScript
(window as any).QASF = qasf;
