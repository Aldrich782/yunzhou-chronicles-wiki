import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { LyricLine } from '@/lib/lrcParser';

interface LyricsDisplayProps {
  lyrics: LyricLine[];
  currentTime: number;
  currentIndex: number;
}

export const LyricsDisplay = ({ lyrics, currentTime, currentIndex }: LyricsDisplayProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (currentIndex >= 0) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  if (!lyrics.length || currentIndex < 0) return null;

  const prevLine = currentIndex > 0 ? lyrics[currentIndex - 1] : null;
  const currentLine = lyrics[currentIndex];
  const nextLine = currentIndex < lyrics.length - 1 ? lyrics[currentIndex + 1] : null;

  return (
    <Card 
      className={`fixed bottom-32 left-1/2 -translate-x-1/2 bg-gradient-to-br from-card/95 via-card/90 to-primary/5 backdrop-blur-md border-primary/20 shadow-elegant p-4 min-w-[300px] max-w-md transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      onClick={() => setVisible(!visible)}
      style={{ cursor: 'pointer' }}
    >
      <div className="space-y-2 text-center">
        {prevLine && (
          <div className="text-sm text-muted-foreground opacity-40 transition-all duration-300">
            {prevLine.text}
          </div>
        )}
        <div className="text-base font-bold text-primary animate-fade-in">
          {currentLine.text}
        </div>
        {nextLine && (
          <div className="text-sm text-muted-foreground opacity-40 transition-all duration-300">
            {nextLine.text}
          </div>
        )}
      </div>
    </Card>
  );
};
