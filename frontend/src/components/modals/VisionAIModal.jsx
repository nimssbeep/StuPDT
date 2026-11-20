import React, { useRef } from 'react';
import { ScanLine, Upload, Loader2, Mountain, Utensils, CupSoda } from 'lucide-react';
import { VISION_SAMPLES } from '../../constants';
import { SampleIllustrationSVG } from '../common/SampleIllustrationSVG';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function VisionAIModal({
  visionPreviewUrl,
  visionSampleId,
  visionScanning,
  visionScanStatus,
  visionResult,
  onRunSampleVisionScan,
  onImageFileUpload,
  onSendVisionResultToChat
}) {
  const { activeModal, setActiveModal, isDarkMode, tx } = useStuPDT();
  const fileInputRef = useRef(null);

  if (activeModal !== 'vision') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-xl w-full rounded-3xl p-6 space-y-4 border-2 shadow-2xl max-h-[90vh] overflow-y-auto ${
          isDarkMode
            ? 'bg-[#111116] border-[#1FE03F] text-white'
            : 'bg-white border-[#071638] text-[#071638]'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700/40 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
              <ScanLine className="w-5 h-5 text-[#1FE03F]" />
              <span>{tx('StuPDT Vision™ — Ultra-Advanced Detector')}</span>
            </h3>
            <p className="text-xs opacity-70 font-medium">
              {tx('Upload any photo OR click a sample below for 100% confident useless analysis')}
            </p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="px-3 py-1 rounded-xl bg-[#F52820] text-white text-xs font-black cursor-pointer"
          >
            {tx('Close')}
          </button>
        </div>

        {/* Instant 1-Click Demo Samples */}
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider opacity-75 block mb-2">
            {tx('Instant Live Demo Samples:')}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {VISION_SAMPLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onRunSampleVisionScan(sample)}
                className={`p-2.5 rounded-xl text-xs font-black border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  visionSampleId === sample.id
                    ? 'bg-[#1FE03F] text-[#08080A] border-[#1FE03F]'
                    : isDarkMode
                    ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35] text-white'
                    : 'bg-[#F4F9FF] hover:bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
                }`}
              >
                {sample.id === 'rock' ? (
                  <Mountain className="w-3.5 h-3.5" />
                ) : sample.id === 'spaghetti' ? (
                  <Utensils className="w-3.5 h-3.5" />
                ) : (
                  <CupSoda className="w-3.5 h-3.5" />
                )}
                <span>{tx(sample.label)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Real Drag & Drop / File Picker Upload Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const droppedFile = e.dataTransfer.files?.[0];
            if (droppedFile) onImageFileUpload(droppedFile);
          }}
          className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition ${
            isDarkMode
              ? 'border-[#0EC7F5]/60 bg-[#181820] hover:bg-[#20202b]'
              : 'border-[#071638] bg-[#F4F9FF] hover:bg-[#FFE600]/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageFileUpload(file);
              e.target.value = '';
            }}
          />
          <Upload className="w-6 h-6 mx-auto mb-1 text-[#0EC7F5]" />
          <p className="text-xs font-black">
            {tx('Click or Drag & Drop Your Own Photo (JPG / PNG / WebP)')}
          </p>
          <p className="text-[11px] opacity-65 mt-0.5">
            {tx('Powered by StuPDT Multi-Agent Tautological Vision Engine')}
          </p>
        </div>

        {/* Preview + Laser Scanning Animation + Results */}
        {(visionPreviewUrl || visionSampleId) && (
          <div
            className={`rounded-2xl p-4 border space-y-3 ${
              isDarkMode ? 'bg-[#0C0C10] border-[#2A2A35]' : 'bg-[#F4F9FF] border-2 border-[#071638]'
            }`}
          >
            <div className="relative h-44 w-full rounded-xl overflow-hidden flex items-center justify-center bg-black/40">
              {visionPreviewUrl ? (
                <img
                  src={visionPreviewUrl}
                  alt="Uploaded scan target"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <SampleIllustrationSVG sampleId={visionSampleId} />
              )}

              {/* Dramatic Fake Scanning Laser */}
              {visionScanning && (
                <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2">
                  <div className="w-full h-1 bg-[#1FE03F] shadow-[0_0_20px_#1FE03F] animate-bounce" />
                  <Loader2 className="w-7 h-7 text-[#1FE03F] animate-spin" />
                  <span className="text-xs font-black text-[#1FE03F] px-3 text-center">
                    {tx(visionScanStatus)}
                  </span>
                </div>
              )}
            </div>

            {visionResult && !visionScanning && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0EC7F5] block">
                      {tx(`Detected ${visionResult.category}`)}
                    </span>
                    <h4 className="text-xl font-black">{tx(visionResult.detectedItem)}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-[#1FE03F] text-[#08080A] font-black text-xs">
                    {tx(`Confidence: ${visionResult.confidence}`)}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold leading-relaxed">
                  "{tx(visionResult.verdict)}"
                </p>

                <div
                  className={`p-3 rounded-xl border ${
                    isDarkMode ? 'bg-[#181820] border-[#2A2A35]' : 'bg-white border-[#071638]'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B1A] block mb-1.5">
                    {tx('Detected Ingredients / Complete Breakdown:')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {visionResult.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-[#FF6B1A]/20 text-[#FF6B1A] border border-[#FF6B1A]/50 text-xs font-black"
                      >
                        • {tx(ing)}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] opacity-80 italic mt-2">{tx(visionResult.proTip)}</p>
                </div>

                <button
                  onClick={onSendVisionResultToChat}
                  className="w-full py-2.5 rounded-xl bg-[#0EC7F5] hover:bg-[#0bb2dc] text-[#08080A] font-black text-xs sm:text-sm cursor-pointer"
                >
                  {tx('Send Scan Result to Chat →')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
