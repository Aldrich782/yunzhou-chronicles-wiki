import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, Volume2, VolumeX, Music, ListMusic } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Song {
  name: string;
  url: string;
}

const presetSongs: Song[] = [
  {
    name: "长生诀",
    url: "https://er-sycdn.kuwo.cn/0850fa8ae75539239a42876507436168/68f89404/resource/30106/trackmedia/F000004Fb3zK06LYTU.flac",
  },
  {
    name: "明月天涯",
    url: "https://lv-sycdn.kuwo.cn/07b87865044025dc0d58c168ac5c4482/68f875c0/resource/30106/trackmedia/M800000rG1PF3BudFL.mp3",
  },
  {
    name: "天涯共此时",
    url: "https://er-sycdn.kuwo.cn/fa2369e9908cf7edaa522fd70d37e27a/68f87787/resource/30106/trackmedia/M800000MV46T0iYTN3.mp3",
  },
  {
    name: "大美江湖",
    url: "https://lw-sycdn.kuwo.cn/7905bb6064017a90e2855dd404b20fd3/68f877af/resource/30106/trackmedia/M800004e1kcE1EFF8M.mp3",
  },
];

export const MusicPlayer = () => {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentSongName, setCurrentSongName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (currentSongIndex >= 0 && currentSongIndex < presetSongs.length - 1) {
        handleLoadPreset(presetSongs[currentSongIndex + 1], currentSongIndex + 1);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handleLoadUrl = () => {
    if (url.trim()) {
      setCurrentUrl(url);
      setCurrentSongName("自定义音乐");
      setCurrentSongIndex(-1);
      setIsPlaying(false);
    }
  };

  const handleLoadPreset = (song: Song, index: number) => {
    setCurrentUrl(song.url);
    setCurrentSongName(song.name);
    setCurrentSongIndex(index);
    setShowPlaylist(false);
    setTimeout(() => audioRef.current?.play().then(() => setIsPlaying(true)), 100);
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

  const toggleMute = () => setIsMuted(!isMuted);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-primary/5 backdrop-blur-sm border-primary/20 shadow-elegant w-full max-w-sm">
      <div className="relative p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <h3 className="text-sm sm:text-base font-bold text-foreground">音乐播放器</h3>
          </div>
          <Button
            onClick={() => setShowPlaylist(!showPlaylist)}
            size="sm"
            variant="ghost"
            className="hover:bg-primary/10 h-7 w-7 sm:h-8 sm:w-8 p-0"
          >
            <ListMusic className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>

        {showPlaylist && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg bg-muted/30 border border-border/50 space-y-2 animate-fade-in">
            <p className="text-xs text-muted-foreground mb-2">预设歌曲</p>
            {presetSongs.map((song, index) => (
              <Button
                key={index}
                onClick={() => handleLoadPreset(song, index)}
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs sm:text-sm border-primary/20 hover:bg-primary/10 hover:border-primary/40 h-8 sm:h-9"
              >
                <Music className="w-3 h-3 mr-2" />
                {song.name}
              </Button>
            ))}
          </div>
        )}

        <div className="flex gap-2 mb-3 sm:mb-4">
          <Input
            type="url"
            placeholder="或输入自定义音乐URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-xs sm:text-sm bg-background/50 border-border/50 focus:border-primary/50 h-8 sm:h-10"
          />
          <Button
            onClick={handleLoadUrl}
            size="sm"
            variant="outline"
            className="whitespace-nowrap border-primary/30 hover:bg-primary/10 text-xs sm:text-sm h-8 sm:h-10 px-3"
          >
            加载
          </Button>
        </div>

        {currentUrl && currentSongName && (
          <div className="mb-3 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <p className="text-xs text-muted-foreground">正在播放</p>
            <p className="text-sm sm:text-base font-semibold text-foreground truncate">{currentSongName}</p>
          </div>
        )}

        {currentUrl && (
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
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

            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                onClick={togglePlay}
                size="lg"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-soft flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                )}
              </Button>

              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <Button
                  onClick={toggleMute}
                  size="sm"
                  variant="ghost"
                  className="hover:bg-primary/10 h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0"
                >
                  {isMuted ? (
                    <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0])}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-6 sm:w-8 text-right flex-shrink-0">
                  {isMuted ? 0 : volume}
                </span>
              </div>
            </div>
          </div>
        )}

        {!currentUrl && (
          <div className="text-center py-4 sm:py-6 text-muted-foreground text-xs sm:text-sm">
            <Music className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 opacity-50" />
            <p>选择预设歌曲或输入URL开始播放</p>
          </div>
        )}

        <audio ref={audioRef} src={currentUrl} />
      </div>
    </Card>
  );
};
