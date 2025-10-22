import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/components/UserProfile';
import { ChatRoom } from '@/components/ChatRoom';
import { Leaderboard } from '@/components/Leaderboard';

const Profile = () => {
  return (
    <div className="min-h-screen relative overflow-hidden page-transition">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl float-cloud" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-cinnabar/5 rounded-full blur-3xl float-cloud" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <main className="container mx-auto px-6 min-h-screen relative z-10 py-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Back Button */}
          <Link to="/">
            <Button
              variant="ghost"
              className="mb-8 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-calligraphy font-bold text-ink tracking-wider mb-2">
              个人中心
            </h1>
            <p className="text-muted-foreground text-sm font-serif">
              管理您的个人资料
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <UserProfile />
              <Leaderboard />
            </div>
            <ChatRoom />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
