export interface LyricLine {
  time: number;
  text: string;
}

export function parseLRC(lrcContent: string): LyricLine[] {
  const lines = lrcContent.split('\n');
  const lyrics: LyricLine[] = [];

  lines.forEach(line => {
    const match = line.match(/\[(\d{2}):(\d{2}\.\d{1,3})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseFloat(match[2]);
      const time = minutes * 60 + seconds;
      const text = match[3].trim();
      if (text) {
        lyrics.push({ time, text });
      }
    }
  });

  return lyrics.sort((a, b) => a.time - b.time);
}

export function getCurrentLyricIndex(lyrics: LyricLine[], currentTime: number): number {
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (currentTime >= lyrics[i].time) {
      return i;
    }
  }
  return -1;
}
