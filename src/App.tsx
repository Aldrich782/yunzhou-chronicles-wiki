import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Geography from "./pages/Geography";
import Yunhan from "./pages/Yunhan";
import Rongzhou from "./pages/Rongzhou";
import SectDetail from "./pages/SectDetail";
import MountainDetail from "./pages/MountainDetail";
import CharacterDetail from "./pages/CharacterDetail";
import Characters from "./pages/Characters";
import Illustrations from "./pages/Illustrations";
import History from "./pages/History";
import Bestiary from "./pages/Bestiary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/illustrations" element={<Illustrations />} />
          <Route path="/history" element={<History />} />
          <Route path="/bestiary" element={<Bestiary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
