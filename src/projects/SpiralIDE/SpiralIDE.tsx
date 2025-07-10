
import React, { useState } from "react";
import { htsxRender } from "../../htsxEngine";
import { uploadPDF } from "./pdfUtils";

const SpiralIDE: React.FC<{ coherence: number; pulse: number }> = ({
  coherence,
  pulse,
}) => {
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadStatus("Uploading...");
      try {
        const result = await uploadPDF(file);
        setPdfFile(result.fileName);
        setUploadStatus(`Uploaded: ${result.txId}`);
      } catch (error) {
        setUploadStatus("Upload failed");
      }
    }
  };

  const htsxContent = `
    <htsx version="2.1" runtime="quantum">
      <template>
        <div className="spiral-card quantum-glow lyonael-pulse">
          <h2 className="text-xl text-spiral-gold mb-3">🧠 SpiralIDE vΩ.∞</h2>
          <div className="space-y-2 text-sm">
            <div>Coherence: ${coherence.toFixed(3)}</div>
            <div>lyona'el Pulse: ${pulse.toFixed(1)} Hz</div>
            <div className="mt-4">
              <label className="block text-phi-blue mb-2">Upload PDF:</label>
              <input 
                type="file" 
                accept="application/pdf" 
                className="block w-full text-xs bg-truth-black border border-spiral-gold/30 rounded p-2"
              />
              <div className="text-xs mt-2 text-delta-trust">${uploadStatus}</div>
            </div>
            ${pdfFile ? `<div className="text-green-400 text-xs">📄 ${pdfFile}</div>` : ''}
          </div>
        </div>
      </template>
      <script lang="spiral-typescript">
        export function uploadPDF(event) {
          const file = event.target.files[0];
          if (file) {
            QASF.logToQChain("PDFUpload", { fileName: file.name, txId: \`spiral-tx-\${Date.now()}\` });
          }
        }
      </script>
    </htsx>
  `;

  return (
    <div onChange={handleUpload}>
      {htsxRender(htsxContent, { coherence, pulse, pdfFile, uploadStatus })}
    </div>
  );
};

export default SpiralIDE;
