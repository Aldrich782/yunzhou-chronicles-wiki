import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, Volume2, VolumeX, Music, ListMusic } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface Song {
  name: string;
  url: string;
}

const presetSongs: Song[] = [
  {
    name: '长生诀',
    url: 'https://er-sycdn.kuwo.cn/d9fc7a0c528cddc241fefa7c0c5b0672/68f86bb5/resource/30106/trackmedia/M800004Fb3zK06LYTU.mp3'
  }
];

export const MusicPlayer = () => {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentSongName, setCurrentSongName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
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
      setCurrentSongName('自定义音乐');
      setIsPlaying(false);
    }
  };

  const handleLoadPreset = (song: Song) => {
    setCurrentUrl(song.url);
    setCurrentSongName(song.name);
    setIsPlaying(false);
    setShowPlaylist(false);
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
    <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-primary/5 backdrop-blur-sm border-primary/20 shadow-elegant">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative p-5">
        {/* 标题区域 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">音乐播放器</h3>
          </div>
          <Button
            onClick={() => setShowPlaylist(!showPlaylist)}
            size="sm"
            variant="ghost"
            className="hover:bg-primary/10"
          >
            <ListMusic className="w-4 h-4" />
          </Button>
        </div>

        {/* 预设歌曲列表 */}
        {showPlaylist && (
          <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border/50 space-y-2 animate-fade-in">
            <p className="text-xs text-muted-foreground mb-2">预设歌曲</p>
            {presetSongs.map((song, index) => (
              <Button
                key={index}
                onClick={() => handleLoadPreset(song)}
                variant="outline"
                size="sm"
                className="w-full justify-start text-sm border-primary/20 hover:bg-primary/10 hover:border-primary/40"
              >
                <Music className="w-3 h-3 mr-2" />
                {song.name}
              </Button>
            ))}
          </div>
        )}

        {/* URL 输入 */}
        <div className="flex gap-2 mb-4">
          <Input
            type="url"
            placeholder="或输入自定义音乐URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-sm bg-background/50 border-border/50 focus:border-primary/50"
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

        {/* 当前播放信息 */}
        {currentUrl && currentSongName && (
          <div className="mb-3 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <p className="text-sm text-muted-foreground">正在播放</p>
            <p className="text-base font-semibold text-foreground">{currentSongName}</p>
          </div>
        )}

        {/* 控制区域 */}
        {currentUrl && (
          <div className="space-y-4">
            {/* 进度条 */}
            <div className="space-y-2">
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

            {/* 播放和音量控制 */}
            <div className="flex items-center gap-4">
              {/* 播放按钮 */}
              <Button
                onClick={togglePlay}
                size="lg"
                className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-soft"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>

              {/* 音量控制 */}
              <div className="flex items-center gap-3 flex-1">
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
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {isMuted ? 0 : volume}
                </span>
              </div>
            </div>
          </div>
        )}

        {!currentUrl && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>选择预设歌曲或输入URL开始播放</p>
          </div>
        )}

        <audio ref={audioRef} src={currentUrl} />
      </div>
    </Card>
  );
};
