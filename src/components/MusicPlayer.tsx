import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export const MusicPlayer = () => {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handleLoadUrl = () => {
    if (url.trim()) {
      setCurrentUrl(url);
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-muted/30 to-card backdrop-blur-sm border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <Music className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">音乐播放器</h3>
      </div>

      {/* URL Input */}
      <div className="flex gap-2 mb-3">
        <Input
          type="url"
          placeholder="输入音乐URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="text-xs bg-background/50"
        />
        <Button 
          onClick={handleLoadUrl} 
          size="sm"
          variant="outline"
          className="whitespace-nowrap border-primary/30 hover:bg-primary/10"
        >
          加载
        </Button>
      </div>

      {/* Controls */}
      {currentUrl && (
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="space-y-1">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play and Volume Controls */}
          <div className="flex items-center justify-between">
            <Button
              onClick={togglePlay}
              size="sm"
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>

            <div className="flex items-center gap-2 flex-1 ml-4">
              <Button
                onClick={toggleMute}
                size="sm"
                variant="ghost"
                className="hover:bg-primary/10"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="w-20"
              />
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} src={currentUrl} />
    </Card>
  );
};
