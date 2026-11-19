import { useStuPDT } from '../contexts/StuPDTContext';

export function useAudio() {
  const { isMuted, toggleMute, soundFX } = useStuPDT();
  return { isMuted, toggleMute, soundFX };
}
