import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const ApiKeyNotice = () => {
  return (
    <Card className="p-4 bg-muted/50 border-primary/20">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="space-y-1 text-sm">
          <p className="font-medium text-foreground">
            Demo Mode - OpenAI Integration Required
          </p>
          <p className="text-muted-foreground">
            This UI demonstrates the audio recording interface. To enable real-time translation
            and AI suggestions, you'll need to integrate OpenAI's Whisper and GPT APIs with a secure backend.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ApiKeyNotice;
