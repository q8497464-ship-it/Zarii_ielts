export interface ScriptLine {
  speaker: string;
  text: string;
}

export type PlaybackSpeed = 0.75 | 1.0 | 1.25 | 1.5;

export interface AudioEngineCallbacks {
  onLineChange?: (lineIndex: number, line: ScriptLine) => void;
  onStateChange?: (state: 'idle' | 'playing' | 'paused' | 'completed') => void;
  onComplete?: () => void;
  onError?: (error: any) => void;
}

export class ListeningAudioEngine {
  private script: ScriptLine[] = [];
  private currentLineIndex = 0;
  private isPaused = false;
  private isStopped = true;
  private speed: PlaybackSpeed = 1.0;
  private volume: number = 1.0;
  private callbacks: AudioEngineCallbacks = {};
  private voices: SpeechSynthesisVoice[] = [];
  private speakerVoiceMap = new Map<string, { voice?: SpeechSynthesisVoice; pitch: number }>();
  private audioHtmlElement: HTMLAudioElement | null = null;
  private realAudioUrl?: string;

  constructor(callbacks: AudioEngineCallbacks = {}) {
    this.callbacks = callbacks;
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      this.voices = window.speechSynthesis.getVoices();
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }

  public setScript(script: ScriptLine[], audioUrl?: string) {
    this.stop();
    this.script = script;
    this.realAudioUrl = audioUrl;
    this.currentLineIndex = 0;
    this.assignSpeakerVoices();
  }

  public setSpeed(speed: PlaybackSpeed) {
    this.speed = speed;
    if (this.audioHtmlElement) {
      this.audioHtmlElement.playbackRate = speed;
    }
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audioHtmlElement) {
      this.audioHtmlElement.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  private assignSpeakerVoices() {
    if (this.voices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
    }

    const englishVoices = this.voices.filter((v) => v.lang.startsWith('en'));
    const pool = englishVoices.length > 0 ? englishVoices : this.voices;

    const uniqueSpeakers = Array.from(new Set(this.script.map((s) => s.speaker)));

    uniqueSpeakers.forEach((speaker, index) => {
      const voice = pool.length > 0 ? pool[index % pool.length] : undefined;
      // Differentiate pitch slightly between speakers
      const pitch = index % 2 === 0 ? 1.0 : 1.15;
      this.speakerVoiceMap.set(speaker, { voice, pitch });
    });
  }

  public play(fromIndex = 0) {
    if (this.script.length === 0 && !this.realAudioUrl) return;

    // Real audio file playback if available
    if (this.realAudioUrl) {
      this.playHtmlAudio(this.realAudioUrl);
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis API not supported in this browser environment.');
      return;
    }

    window.speechSynthesis.cancel();
    this.isStopped = false;
    this.isPaused = false;
    this.currentLineIndex = Math.min(Math.max(fromIndex, 0), this.script.length - 1);
    this.callbacks.onStateChange?.('playing');
    this.speakCurrentLine();
  }

  private speakCurrentLine() {
    if (this.isStopped || this.isPaused) return;

    if (this.currentLineIndex >= this.script.length) {
      this.callbacks.onStateChange?.('completed');
      this.callbacks.onComplete?.();
      return;
    }

    const line = this.script[this.currentLineIndex];
    this.callbacks.onLineChange?.(this.currentLineIndex, line);

    const utterance = new SpeechSynthesisUtterance(line.text);
    utterance.rate = this.speed;
    utterance.volume = this.volume;

    const speakerConfig = this.speakerVoiceMap.get(line.speaker);
    if (speakerConfig?.voice) {
      utterance.voice = speakerConfig.voice;
    }
    utterance.pitch = speakerConfig?.pitch ?? 1.0;

    utterance.onend = () => {
      if (this.isStopped || this.isPaused) return;
      this.currentLineIndex++;
      // Natural 650ms pause between speaker turns
      setTimeout(() => {
        this.speakCurrentLine();
      }, 650);
    };

    utterance.onerror = (e) => {
      if (this.isStopped) return;
      console.warn('Speech error:', e);
      this.currentLineIndex++;
      this.speakCurrentLine();
    };

    window.speechSynthesis.speak(utterance);
  }

  private playHtmlAudio(url: string) {
    if (this.audioHtmlElement) {
      this.audioHtmlElement.pause();
    }

    this.audioHtmlElement = new Audio(url);
    this.audioHtmlElement.playbackRate = this.speed;

    this.audioHtmlElement.onplay = () => this.callbacks.onStateChange?.('playing');
    this.audioHtmlElement.onpause = () => {
      if (!this.isStopped) this.callbacks.onStateChange?.('paused');
    };
    this.audioHtmlElement.onended = () => {
      this.callbacks.onStateChange?.('completed');
      this.callbacks.onComplete?.();
    };
    this.audioHtmlElement.onerror = (err) => {
      this.callbacks.onError?.(err);
      // Fallback to speech synthesis if audio file fails to load
      this.realAudioUrl = undefined;
      this.play(this.currentLineIndex);
    };

    this.audioHtmlElement.play().catch((err) => {
      console.warn('HTML audio play error, falling back to Web Speech API', err);
      this.realAudioUrl = undefined;
      this.play(this.currentLineIndex);
    });
  }

  public pause() {
    this.isPaused = true;
    if (this.audioHtmlElement) {
      this.audioHtmlElement.pause();
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    this.callbacks.onStateChange?.('paused');
  }

  public resume() {
    this.isPaused = false;
    if (this.audioHtmlElement) {
      this.audioHtmlElement.play();
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        this.speakCurrentLine();
      }
    }
    this.callbacks.onStateChange?.('playing');
  }

  public stop() {
    this.isStopped = true;
    this.isPaused = false;
    if (this.audioHtmlElement) {
      this.audioHtmlElement.pause();
      this.audioHtmlElement = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.callbacks.onStateChange?.('idle');
  }

  public getCurrentLineIndex(): number {
    return this.currentLineIndex;
  }

  /**
   * Speak a single standalone snippet (used for "Listen to this part again" on results review)
   */
  public static speakSnippet(text: string, speaker = 'Speaker', speed = 1.0): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed;

      const voices = window.speechSynthesis.getVoices();
      const english = voices.filter((v) => v.lang.startsWith('en'));
      if (english.length > 0) {
        utterance.voice = english[0];
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }
}
