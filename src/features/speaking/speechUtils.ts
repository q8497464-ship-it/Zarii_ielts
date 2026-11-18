/**
 * Web Speech API and MediaRecorder Utilities for IELTS Speaking
 */

// Speech Recognition Type Definitions
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function isSpeechRecognitionSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  );
}

export function isMediaRecorderSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices &&
    !!window.MediaRecorder
  );
}

let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Read examiner question aloud using browser SpeechSynthesis
 */
export function speakExaminerText(
  text: string,
  onEnd?: () => void,
  rate = 0.95
): void {
  if (!isSpeechSynthesisSupported()) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  stopExaminerSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate; // slightly measured pace for examiner clarity
  utterance.pitch = 1.0;
  utterance.lang = 'en-GB';

  // Pick an English voice if available
  const voices = window.speechSynthesis.getVoices();
  const englishVoice =
    voices.find((v) => v.lang === 'en-GB' && v.name.includes('Natural')) ||
    voices.find((v) => v.lang.startsWith('en-GB')) ||
    voices.find((v) => v.lang.startsWith('en-US')) ||
    voices.find((v) => v.lang.startsWith('en'));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  utterance.onend = () => {
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('Speech synthesis notice:', e);
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopExaminerSpeech(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}

/**
 * Speech recognition session wrapper
 */
export interface SpeechRecognizerHandlers {
  onInterim: (text: string) => void;
  onFinal: (text: string) => void;
  onError: (errorType: string) => void;
  onEnd: () => void;
}

export function createSpeechRecognizer(handlers: SpeechRecognizerHandlers) {
  if (!isSpeechRecognitionSupported()) {
    return null;
  }

  const SpeechRecognitionConstructor =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognitionConstructor();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let finalAccumulated = '';

  recognition.onresult = (event: any) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalAccumulated += (finalAccumulated ? ' ' : '') + transcript.trim();
        handlers.onFinal(finalAccumulated);
      } else {
        interim += transcript;
      }
    }
    handlers.onInterim(interim);
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error:', event.error);
    handlers.onError(event.error);
  };

  recognition.onend = () => {
    handlers.onEnd();
  };

  return {
    start: () => {
      finalAccumulated = '';
      try {
        recognition.start();
      } catch (err) {
        console.warn('Recognition start caught:', err);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (err) {
        // already stopped
      }
    },
    abort: () => {
      try {
        recognition.abort();
      } catch (err) {
        // ignore
      }
    },
  };
}

/**
 * MediaRecorder Audio Recording
 */
export async function startAudioRecording(): Promise<{
  stop: () => Promise<{ blob: Blob; url: string }>;
}> {
  if (!isMediaRecorderSupported()) {
    throw new Error('MediaRecorder is not supported in this browser.');
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mimeType = MediaRecorder.isTypeSupported('audio/webm')
    ? 'audio/webm'
    : MediaRecorder.isTypeSupported('audio/ogg')
    ? 'audio/ogg'
    : '';

  const mediaRecorder = mimeType
    ? new MediaRecorder(stream, { mimeType })
    : new MediaRecorder(stream);

  const chunks: Blob[] = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  mediaRecorder.start(250); // slice chunks every 250ms

  return {
    stop: () =>
      new Promise<{ blob: Blob; url: string }>((resolve) => {
        mediaRecorder.onstop = () => {
          // Release microphone tracks
          stream.getTracks().forEach((track) => track.stop());

          const blob = new Blob(chunks, { type: mediaRecorder.mimeType || 'audio/webm' });
          const url = URL.createObjectURL(blob);
          resolve({ blob, url });
        };

        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }),
  };
}
