import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/components/UserProfile';

const Profile = () => {
  return (
    <div className="min-h-screen relative overflow-hidden page-transition">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl float-cloud" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-cinnabar/5 rounded-full blur-3xl float-cloud" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <main className="container mx-auto px-6 min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-6xl mx-auto w-full py-12">
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
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-calligraphy font-bold text-ink tracking-wider mb-4">
              个人中心
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base font-serif">
              管理您的个人资料
            </p>
          </div>

          {/* Profile Card */}
          <div className="flex justify-center">
            <UserProfile />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
