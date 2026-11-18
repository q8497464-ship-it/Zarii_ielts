import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Mic,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
  Sliders,
  Check,
  Headphones,
  Monitor,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import {
  speakExaminerText,
  stopExaminerSpeech,
  createSpeechRecognizer,
  isSpeechRecognitionSupported,
} from '../../features/speaking/speechUtils';

export interface ExamTestSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadyToStart?: () => void;
  requiredChecks?: ('audio' | 'mic' | 'fullscreen')[];
  title?: string;
}

export const ExamTestSetupModal: React.FC<ExamTestSetupModalProps> = ({
  isOpen,
  onClose,
  onReadyToStart,
  requiredChecks = ['audio', 'mic', 'fullscreen'],
  title = 'Official IELTS Computer-Delivered System Check',
}) => {
  // Check completion states
  const [audioWorking, setAudioWorking] = useState(false);
  const [micWorking, setMicWorking] = useState(false);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);

  // Audio test states
  const [isPlayingAudioTest, setIsPlayingAudioTest] = useState(false);
  const [testVolume, setTestVolume] = useState(0.85);

  // Mic test states
  const [isMicTesting, setIsMicTesting] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0); // 0 to 100
  const [micTranscript, setMicTranscript] = useState('');
  const [micError, setMicError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const recognizerRef = useRef<any>(null);

  // Check initial fullscreen state
  useEffect(() => {
    setIsFullscreenActive(!!document.fullscreenElement);
    const handleFsChange = () => {
      setIsFullscreenActive(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Cleanup mic & audio on unmount or close
  useEffect(() => {
    return () => {
      stopAudioTest();
      stopMicTest();
    };
  }, []);

  // Audio Test Handler
  const handlePlayAudioTest = () => {
    if (isPlayingAudioTest) {
      stopAudioTest();
      return;
    }

    setIsPlayingAudioTest(true);
    speakExaminerText(
      'This is a sound check for your computer-delivered IELTS exam. If you can hear this voice clearly and at a comfortable volume, select the checkbox below.',
      () => {
        setIsPlayingAudioTest(false);
        setAudioWorking(true);
      },
      0.9
    );
  };

  const stopAudioTest = () => {
    stopExaminerSpeech();
    setIsPlayingAudioTest(false);
  };

  // Mic Test Handler (Web Audio API Analyser)
  const handleToggleMicTest = async () => {
    if (isMicTesting) {
      stopMicTest();
      return;
    }

    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      setIsMicTesting(true);

      const updateLevel = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioLevel(normalized);

        if (normalized > 15) {
          setMicWorking(true);
        }

        animFrameRef.current = requestAnimationFrame(updateLevel);
      };

      updateLevel();

      // Also start speech recognition if supported
      if (isSpeechRecognitionSupported()) {
        const recognizer = createSpeechRecognizer({
          onInterim: (text: string) => setMicTranscript(text),
          onFinal: (text: string) => {
            setMicTranscript(text);
            if (text.trim().length > 0) {
              setMicWorking(true);
            }
          },
          onError: (err: any) => console.warn('Recognition warning', err),
          onEnd: () => {},
        });
        recognizerRef.current = recognizer;
        if (recognizer) {
          try {
            recognizer.start();
          } catch (e) {}
        }
      }
    } catch (err: any) {
      console.error('Failed to access microphone', err);
      setMicError('Microphone permission denied. Please allow microphone access in your browser settings.');
      setIsMicTesting(false);
    }
  };

  const stopMicTest = () => {
    setIsMicTesting(false);
    setAudioLevel(0);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (recognizerRef.current) {
      try {
        recognizerRef.current.stop();
      } catch (e) {}
      recognizerRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  // Fullscreen toggle
  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreenActive(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreenActive(false);
      }
    } catch (e) {
      console.warn('Fullscreen failed', e);
    }
  };

  const handleFinishSetup = () => {
    stopAudioTest();
    stopMicTest();
    onClose();
    if (onReadyToStart) {
      onReadyToStart();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        stopAudioTest();
        stopMicTest();
        onClose();
      }}
      title={title}
      size="lg"
    >
      <div className="space-y-6">
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Ensure your equipment matches official computer-delivered IELTS testing conditions. Complete the hardware verification below before beginning.
        </p>

        {/* 1. Audio Check */}
        {requiredChecks.includes('audio') && (
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    1. Audio & Headphone Check
                  </h4>
                  <p className="text-2xs text-slate-500 dark:text-slate-400">
                    Verify that your headphones or speakers are active and set to an audible level.
                  </p>
                </div>
              </div>

              {audioWorking && (
                <Badge variant="success" dot size="xs">
                  Audio Verified
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Button
                variant={isPlayingAudioTest ? 'secondary' : 'teal'}
                size="sm"
                onClick={handlePlayAudioTest}
                leftIcon={isPlayingAudioTest ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                className="text-xs h-8"
              >
                {isPlayingAudioTest ? 'Stop Sound' : 'Play Test Sound'}
              </Button>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={audioWorking}
                  onChange={(e) => setAudioWorking(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span>I can hear the audio clearly</span>
              </label>
            </div>
          </div>
        )}

        {/* 2. Microphone Check */}
        {requiredChecks.includes('mic') && (
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    2. Microphone Check
                  </h4>
                  <p className="text-2xs text-slate-500 dark:text-slate-400">
                    Test live input sensitivity and speech recognition clarity.
                  </p>
                </div>
              </div>

              {micWorking && (
                <Badge variant="success" dot size="xs">
                  Mic Active
                </Badge>
              )}
            </div>

            {micError ? (
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-2xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{micError}</span>
              </div>
            ) : null}

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Button
                  variant={isMicTesting ? 'secondary' : 'teal'}
                  size="sm"
                  onClick={handleToggleMicTest}
                  leftIcon={<Mic className="w-3.5 h-3.5" />}
                  className="text-xs h-8"
                >
                  {isMicTesting ? 'Stop Mic Test' : 'Test Microphone'}
                </Button>

                {isMicTesting && (
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-2xs font-mono text-slate-400">Level:</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className={cn(
                          'h-full transition-all duration-75',
                          audioLevel > 50 ? 'bg-emerald-500' : 'bg-teal-500'
                        )}
                        style={{ width: `${audioLevel}%` }}
                      />
                    </div>
                    <span className="text-2xs font-mono w-8 text-right text-slate-500 dark:text-slate-400">
                      {audioLevel}%
                    </span>
                  </div>
                )}
              </div>

              {isMicTesting && micTranscript && (
                <p className="text-2xs text-slate-500 dark:text-slate-400 italic">
                  Recognized: "{micTranscript}"
                </p>
              )}
            </div>
          </div>
        )}

        {/* 3. Distraction-Free Fullscreen Check */}
        {requiredChecks.includes('fullscreen') && (
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950/80 text-brand-800 dark:text-brand-300 flex items-center justify-center">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    3. Distraction-Free Exam Screen
                  </h4>
                  <p className="text-2xs text-slate-500 dark:text-slate-400">
                    Official IELTS test centers run in dedicated fullscreen to eliminate popups and browser tabs.
                  </p>
                </div>
              </div>

              {isFullscreenActive ? (
                <Badge variant="primary" dot size="xs">
                  Fullscreen Active
                </Badge>
              ) : (
                <Badge variant="slate" size="xs">
                  Windowed Mode
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={isFullscreenActive ? 'outline' : 'teal'}
                size="sm"
                onClick={handleToggleFullscreen}
                leftIcon={<Maximize2 className="w-3.5 h-3.5" />}
                className="text-xs h-8"
              >
                {isFullscreenActive ? 'Exit Fullscreen' : 'Enable Fullscreen Mode'}
              </Button>
              <span className="text-2xs text-slate-400 dark:text-slate-400">
                You can toggle fullscreen anytime with the top bar icon or press Esc.
              </span>
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs text-slate-500 dark:text-slate-400"
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleFinishSetup}
            rightIcon={<CheckCircle2 className="w-4 h-4" />}
            className="bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-sm h-9 px-5"
          >
            I am Ready — Start Exam
          </Button>
        </div>
      </div>
    </Modal>
  );
};
