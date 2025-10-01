import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AudioRecorderProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const AudioRecorder = ({ isRecording, onStartRecording, onStopRecording }: AudioRecorderProps) => {
  return (
    <Card className="p-8 bg-card border-border">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <Button
            size="lg"
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`w-24 h-24 rounded-full transition-all duration-300 ${
              isRecording
                ? 'bg-destructive hover:bg-destructive/90 animate-pulse'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-10 h-10" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </Button>
          {isRecording && (
            <div className="absolute inset-0 rounded-full border-4 border-destructive animate-ping opacity-30" />
          )}
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isRecording ? 'Recording...' : 'Ready to Record'}
          </h2>
          <p className="text-muted-foreground">
            {isRecording
              ? 'Speak in any language to get real-time translation'
              : 'Click the microphone to start recording'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AudioRecorder;
