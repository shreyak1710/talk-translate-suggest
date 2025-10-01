import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import AudioRecorder from '@/components/AudioRecorder';
import TranscriptDisplay, { Transcript } from '@/components/TranscriptDisplay';
import SuggestionDisplay, { Suggestion } from '@/components/SuggestionDisplay';
import ApiKeyNotice from '@/components/ApiKeyNotice';

const Index = () => {
  const { toast } = useToast();
  const { isRecording, audioChunks, startRecording, stopRecording } = useAudioRecorder();
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleStartRecording = async () => {
    try {
      await startRecording();
      toast({
        title: 'Recording started',
        description: 'Speak in any language for translation',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not access microphone. Please check permissions.',
        variant: 'destructive',
      });
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    toast({
      title: 'Recording stopped',
      description: 'Audio processing complete',
    });
  };

  // Simulate processing when new audio chunks arrive (demo mode)
  useEffect(() => {
    if (audioChunks.length > 0) {
      const latestChunk = audioChunks[audioChunks.length - 1];
      
      // Demo: Add mock transcript
      const mockTranscript: Transcript = {
        id: transcripts.length + 1,
        text: `Demo translation ${transcripts.length + 1}: This is where the translated English text would appear from Whisper API.`,
        timestamp: latestChunk.timestamp,
      };
      
      setTranscripts((prev) => [...prev, mockTranscript]);
      
      // Demo: Add mock suggestion
      setTimeout(() => {
        const mockSuggestion: Suggestion = {
          id: suggestions.length + 1,
          text: `Demo suggestion ${suggestions.length + 1}: This is where GPT would provide contextual response suggestions.`,
          timestamp: new Date(),
        };
        setSuggestions((prev) => [...prev, mockSuggestion]);
      }, 500);
    }
  }, [audioChunks.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Real-Time Translation & Suggestions
          </h1>
          <p className="text-muted-foreground">
            Speak in any language and get instant English translations with AI-powered suggestions
          </p>
        </div>

        <div className="space-y-6">
          <ApiKeyNotice />
          
          <AudioRecorder
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <TranscriptDisplay transcripts={transcripts} />
            <SuggestionDisplay suggestions={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
