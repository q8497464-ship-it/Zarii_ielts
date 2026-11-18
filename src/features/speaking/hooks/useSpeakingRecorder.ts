import { useState, useCallback } from 'react';

export function useSpeakingRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setAudioBlob(null);
    setAudioUrl(null);
  }, []);

  const stopRecording = useCallback((blob?: Blob) => {
    setIsRecording(false);
    if (blob) {
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
    }
  }, []);

  return {
    isRecording,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
  };
}
