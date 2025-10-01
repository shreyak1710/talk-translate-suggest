import { useState, useRef, useCallback } from 'react';

export interface AudioChunk {
  id: number;
  blob: Blob;
  timestamp: Date;
}

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<AudioChunk[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunkCounterRef = useRef(0);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const chunk: AudioChunk = {
            id: chunkCounterRef.current++,
            blob: event.data,
            timestamp: new Date(),
          };
          setAudioChunks((prev) => [...prev, chunk]);
        }
      };

      // Record in 5-second chunks
      mediaRecorder.start(5000);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, [isRecording]);

  const clearChunks = useCallback(() => {
    setAudioChunks([]);
    chunkCounterRef.current = 0;
  }, []);

  return {
    isRecording,
    audioChunks,
    startRecording,
    stopRecording,
    clearChunks,
  };
};
