import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lightbulb } from 'lucide-react';

export interface Suggestion {
  id: number;
  text: string;
  timestamp: Date;
}

interface SuggestionDisplayProps {
  suggestions: Suggestion[];
}

const SuggestionDisplay = ({ suggestions }: SuggestionDisplayProps) => {
  return (
    <Card className="p-6 bg-card border-border h-[400px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">AI Suggestions</h3>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-4 pr-4">
          {suggestions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No suggestions yet. AI will provide contextual responses here.
            </p>
          ) : (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-primary">
                    Suggestion {suggestion.id}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {suggestion.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-foreground leading-relaxed font-medium">
                  {suggestion.text}
                </p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default SuggestionDisplay;
