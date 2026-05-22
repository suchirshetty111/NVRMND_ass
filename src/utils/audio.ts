// Premium UI synthesizer sounds via native WebAudio API context
// Generates low-latency high-fidelity digital audio cues dynamically on interactions

class PremiumSynthSystem {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = false;

  constructor() {
    // Lazy initialisation to prevent audio playing warnings before user interacts
  }

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleSound(enabled: boolean) {
    this.soundEnabled = enabled;
    if (enabled) {
      this.init();
      this.playChirp(); // Confirmation sound
    }
  }

  public isEnabled() {
    return this.soundEnabled;
  }

  // Soft futuristic web chirp for interactive buttons
  public playChirp() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);

      gain.gain.setValueAtTime(0.015, now); // Low comfortable volume
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch (err) {
      console.warn("Synth trigger failed: ", err);
    }
  }

  // Low heavy feedback sweep for modal launches/case studies
  public playSweep() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.45);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(1500, now + 0.45);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (err) {
      console.warn("Sweep sound failed: ", err);
    }
  }

  // Elegant slide click sound for tabs & checkboxes
  public playClick() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.05);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (err) {
      console.warn("Click sound failed: ", err);
    }
  }
}

export const premiumSynth = new PremiumSynthSystem();
