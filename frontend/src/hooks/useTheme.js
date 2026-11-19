import { useStuPDT } from '../contexts/StuPDTContext';

export function useTheme() {
  const {
    isDarkMode,
    setIsDarkMode,
    brailleMode,
    setBrailleMode,
    signLanguageMode,
    setSignLanguageMode,
    tx
  } = useStuPDT();

  return {
    isDarkMode,
    setIsDarkMode,
    brailleMode,
    setBrailleMode,
    signLanguageMode,
    setSignLanguageMode,
    tx
  };
}
