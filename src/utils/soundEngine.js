// ============================================================================
// SYNTHESIZED WEB AUDIO SOUND ENGINE (Zero external audio files required)
// ============================================================================
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, vol = 0.08, delay = 0) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Ignore autoplay blocks gracefully
    }
  }

  playChime() {
    this.playTone(587.33, 'sine', 0.2, 0.07, 0);
    this.playTone(880.0, 'sine', 0.35, 0.07, 0.12);
  }

  playTransferHold() {
    if (this.muted) return;
    this.playTone(440, 'square', 0.16, 0.025, 0);
    this.playTone(480, 'square', 0.16, 0.025, 0);
    this.playTone(440, 'square', 0.16, 0.025, 0.22);
    this.playTone(480, 'square', 0.16, 0.025, 0.22);
    const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46];
    notes.forEach((n, idx) => {
      this.playTone(n, 'triangle', 0.2, 0.045, 0.48 + idx * 0.18);
    });
  }

  playRubberStamp() {
    this.playTone(110, 'sawtooth', 0.12, 0.13, 0);
    this.playTone(75, 'square', 0.22, 0.15, 0.05);
  }

  playErrorBuzz() {
    this.playTone(165, 'sawtooth', 0.18, 0.09, 0);
    this.playTone(125, 'sawtooth', 0.26, 0.09, 0.15);
  }

  playScanBeep() {
    this.playTone(980, 'sine', 0.08, 0.06, 0);
    this.playTone(1240, 'sine', 0.08, 0.06, 0.12);
    this.playTone(1480, 'sine', 0.12, 0.07, 0.24);
  }

  playKlaxon() {
    if (this.muted) return;
    [0, 0.32, 0.64].forEach((offset) => {
      this.playTone(620, 'sawtooth', 0.15, 0.08, offset);
      this.playTone(420, 'sawtooth', 0.15, 0.08, offset + 0.15);
    });
  }
}

export const soundFX = new SoundEngine();
