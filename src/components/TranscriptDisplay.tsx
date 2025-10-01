import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare } from 'lucide-react';

export interface Transcript {
  id: number;
  text: string;
  timestamp: Date;
}

interface TranscriptDisplayProps {
  transcripts: Transcript[];
}

const TranscriptDisplay = ({ transcripts }: TranscriptDisplayProps) => {
  return (
    <Card className="p-6 bg-card border-border h-[400px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Transcripts (English)</h3>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-4 pr-4">
          {transcripts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No transcripts yet. Start recording to see translations.
            </p>
          ) : (
            transcripts.map((transcript) => (
              <div
                key={transcript.id}
                className="p-4 rounded-lg bg-muted/50 border border-border animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-primary">
                    Turn {transcript.id}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {transcript.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-foreground leading-relaxed">{transcript.text}</p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default TranscriptDisplay;
