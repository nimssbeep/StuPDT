import { useStuPDT } from '../contexts/StuPDTContext';

export function useToast() {
  const { toastNotification, triggerToast } = useStuPDT();
  return { toastNotification, triggerToast };
}
