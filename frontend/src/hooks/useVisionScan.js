import { useState, useCallback } from 'react';
import { useStuPDT } from '../contexts/StuPDTContext';
import { analyzeImageWithStuPDTVision } from '../services/gemini';

export function useVisionScan(onPostScanToChat) {
  const { soundFX, bumpMetrics, triggerToast, setActiveModal } = useStuPDT();

  const [visionPreviewUrl, setVisionPreviewUrl] = useState(null);
  const [visionSampleId, setVisionSampleId] = useState(null);
  const [visionScanning, setVisionScanning] = useState(false);
  const [visionScanStatus, setVisionScanStatus] = useState('');
  const [visionResult, setVisionResult] = useState(null);

  const runSampleVisionScan = useCallback(
    (sample) => {
      setVisionPreviewUrl(null);
      setVisionSampleId(sample.id);
      setVisionResult(null);
      setVisionScanning(true);
      setVisionScanStatus(sample.scanText);
      soundFX.playScanBeep();

      setTimeout(() => {
        setVisionScanning(false);
        setVisionResult(sample.result);
        soundFX.playChime();
        bumpMetrics(1, 10, 4);
      }, 1350);
    },
    [soundFX, bumpMetrics]
  );

  const handleImageFileUpload = useCallback(
    (file) => {
      if (!file || !file.type.startsWith('image/')) {
        triggerToast('Please upload a valid JPG, PNG, or WebP image file!');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (ev) => {
        const dataUrl = ev.target.result;
        const scanStartedAt = Date.now();
        setVisionSampleId(null);
        setVisionPreviewUrl(dataUrl);
        setVisionResult(null);
        setVisionScanning(true);
        setVisionScanStatus('Consulting 17 Blindfolded Vision AI Specialists...');
        soundFX.playScanBeep();

        const base64Data = dataUrl.split(',')[1];
        const mimeType = file.type || 'image/png';

        const parsed = await analyzeImageWithStuPDTVision(base64Data, mimeType);
        const elapsed = Date.now() - scanStartedAt;
        if (elapsed < 900) {
          await new Promise((r) => setTimeout(r, 900 - elapsed));
        }

        setVisionScanning(false);
        soundFX.playChime();
        bumpMetrics(1, 12, 5);

        if (parsed && parsed.detectedItem) {
          setVisionResult({
            detectedItem: parsed.detectedItem,
            category: parsed.category || 'Certified Object',
            confidence: '100.00%',
            verdict:
              parsed.verdict ||
              `We are 100% confident that this ${parsed.detectedItem} is a ${parsed.detectedItem}.`,
            ingredients:
              Array.isArray(parsed.ingredients) && parsed.ingredients.length > 0
                ? [parsed.ingredients[0]]
                : [parsed.detectedItem],
            proTip:
              parsed.proTip ||
              `Fun fact: Contains 100% pure ${parsed.detectedItem}. Accuracy: CLASSIFIED.`
          });
        } else {
          setVisionResult({
            detectedItem: 'Uploaded Image',
            category: 'Digital Pixel Arrangement',
            confidence: '100.00%',
            verdict:
              'After consulting 12 Visual Bureaucrats, we are 100.00% confident that your uploaded image is an image made of pixels.',
            ingredients: ['Pixels'],
            proTip: 'Technical Tip: To view this image again, simply look at it with your eyes.'
          });
        }
      };
      reader.readAsDataURL(file);
    },
    [soundFX, bumpMetrics, triggerToast]
  );

  const sendVisionResultToChat = useCallback(() => {
    if (!visionResult) return;
    soundFX.playChime();
    const scanMsg = {
      id: `vision-${Date.now()}`,
      sender: 'ai',
      deptId: 'excuse_ai',
      deptName: 'StuPDT Vision™ Specialist #008',
      deptRole: 'Department of Obvious Observation',
      deptBadge: 'VISION AI',
      text: `SCAN COMPLETE — Detected: ${visionResult.detectedItem} (Confidence: ${visionResult.confidence}). ${visionResult.verdict} Complete Ingredient Breakdown: [${visionResult.ingredients.join(', ')}].`,
      confidence: visionResult.confidence,
      accuracy: 'CLASSIFIED',
      blame: '100% Pure Tautology',
      timestamp: 'Just now'
    };

    if (onPostScanToChat) {
      onPostScanToChat(scanMsg);
    }
    setActiveModal(null);
    triggerToast('Useless Vision Scan posted to chat!');
  }, [visionResult, soundFX, onPostScanToChat, setActiveModal, triggerToast]);

  return {
    visionPreviewUrl,
    visionSampleId,
    visionScanning,
    visionScanStatus,
    visionResult,
    runSampleVisionScan,
    handleImageFileUpload,
    sendVisionResultToChat
  };
}
