import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Button } from "@/components/ui/button";
import { Music, X, Minus } from "lucide-react";
import Index from "./pages/Index";
import Geography from "./pages/Geography";
import Yunhan from "./pages/Yunhan";
import Rongzhou from "./pages/Rongzhou";
import SectDetail from "./pages/SectDetail";
import MountainDetail from "./pages/MountainDetail";
import DivisionDetail from "./pages/DivisionDetail";
import CharacterDetail from "./pages/CharacterDetail";
import Characters from "./pages/Characters";
import LandmarkDetail from "./pages/LandmarkDetail";
import Illustrations from "./pages/Illustrations";
import History from "./pages/History";
import Bestiary from "./pages/Bestiary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/yunhan" element={<Yunhan />} />
            <Route path="/rongzhou" element={<Rongzhou />} />
            <Route path="/sect/:id" element={<SectDetail />} />
            <Route path="/mountain/:id" element={<MountainDetail />} />
            <Route path="/division/:sectId/:divisionId" element={<DivisionDetail />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/landmark/:id" element={<LandmarkDetail />} />
            <Route path="/illustrations" element={<Illustrations />} />
            <Route path="/history" element={<History />} />
            <Route path="/bestiary" element={<Bestiary />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* 全局悬浮音乐播放器 */}
          <div className="fixed top-4 right-4 z-50">
            {!showMusicPlayer ? (
              <Button
                onClick={() => setShowMusicPlayer(true)}
                size="lg"
                className="rounded-full h-14 w-14 shadow-elegant bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Music className="w-6 h-6" />
              </Button>
            ) : (
              <div className="animate-fade-in">
                {/* 最小化时显示的按钮 */}
                <Button
                  onClick={() => setIsMinimized(false)}
                  size="lg"
                  className={`rounded-full h-14 w-14 shadow-elegant bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 ${
                    isMinimized ? 'block' : 'hidden'
                  }`}
                >
                  <Music className="w-6 h-6" />
                </Button>
                
                {/* 播放器面板 - 始终保持挂载 */}
                <div className={`relative ${isMinimized ? 'hidden' : 'block'}`}>
                  <div className="absolute -top-2 -right-2 z-10 flex gap-1">
                    <Button
                      onClick={() => setIsMinimized(true)}
                      size="sm"
                      variant="ghost"
                      className="rounded-full h-8 w-8 bg-card/80 backdrop-blur-sm hover:bg-card"
                      title="最小化"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setShowMusicPlayer(false);
                        setIsMinimized(false);
                      }}
                      size="sm"
                      variant="ghost"
                      className="rounded-full h-8 w-8 bg-card/80 backdrop-blur-sm hover:bg-card"
                      title="关闭"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <MusicPlayer />
                </div>
              </div>
            )}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
