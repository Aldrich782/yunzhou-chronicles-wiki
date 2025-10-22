import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ChatRoom } from "@/components/ChatRoom";
import { Button } from "@/components/ui/button";
import { Music, X, Minus, MessageSquare } from "lucide-react";
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
import SectIllustrations from "./pages/SectIllustrations";
import History from "./pages/History";
import Bestiary from "./pages/Bestiary";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

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
            <Route path="/illustrations/sect/:sectId" element={<SectIllustrations />} />
            <Route path="/history" element={<History />} />
            <Route path="/bestiary" element={<Bestiary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* 全局悬浮音乐播放器 */}
          <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
            {!showMusicPlayer ? (
              <Button
                onClick={() => setShowMusicPlayer(true)}
                size="lg"
                className="rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-elegant bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Music className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            ) : (
              <div className="animate-fade-in">
                {/* 最小化时显示的按钮 */}
                <Button
                  onClick={() => setIsMinimized(false)}
                  size="lg"
                  className={`rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-elegant bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 ${
                    isMinimized ? 'block' : 'hidden'
                  }`}
                >
                  <Music className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
                
                {/* 播放器面板 - 始终保持挂载 */}
                <div className={`relative ${isMinimized ? 'hidden' : 'block'}`}>
                  <div className="absolute -top-2 -right-2 z-10 flex gap-1">
                    <Button
                      onClick={() => setIsMinimized(true)}
                      size="sm"
                      variant="ghost"
                      className="rounded-full h-7 w-7 sm:h-8 sm:w-8 bg-card/80 backdrop-blur-sm hover:bg-card"
                      title="最小化"
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setShowMusicPlayer(false);
                        setIsMinimized(false);
                      }}
                      size="sm"
                      variant="ghost"
                      className="rounded-full h-7 w-7 sm:h-8 sm:w-8 bg-card/80 backdrop-blur-sm hover:bg-card"
                      title="关闭"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                  <MusicPlayer />
                </div>
              </div>
            )}
          </div>

          {/* 全局悬浮聊天室 */}
          <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50">
            {!showChatRoom ? (
              <Button
                onClick={() => setShowChatRoom(true)}
                size="lg"
                className="rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-elegant bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            ) : (
              <div className="animate-fade-in">
                {/* 最小化时显示的按钮 */}
                <Button
                  onClick={() => setIsChatMinimized(false)}
                  size="lg"
                  className={`rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-elegant bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 ${
                    isChatMinimized ? 'block' : 'hidden'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
                
                {/* 聊天室面板 */}
                <div className={`relative ${isChatMinimized ? 'hidden' : 'block'}`}>
                  <div className="absolute -top-2 -right-2 z-10 flex gap-1">
                    <Button
                      onClick={() => setIsChatMinimized(true)}
                      size="sm"
                      variant="ghost"
                      className="rounded-full h-7 w-7 sm:h-8 sm:w-8 bg-card/80 backdrop-blur-sm hover:bg-card"
                      title="最小化"
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setShowChatRoom(false);
                        setIsChatMinimized(false);
                      }}
                      size="sm"
                      variant="ghost"
                      className="rounded-full h-7 w-7 sm:h-8 sm:w-8 bg-card/80 backdrop-blur-sm hover:bg-card"
                      title="关闭"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                  <ChatRoom />
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
