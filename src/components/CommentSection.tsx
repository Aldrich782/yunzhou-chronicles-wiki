import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

interface CommentSectionProps {
  pageType: 'sect' | 'landmark' | 'mountain';
  pageId: string;
}

export const CommentSection = ({ pageType, pageId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Load comments
  useEffect(() => {
    loadComments();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`comments-${pageType}-${pageId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `page_type=eq.${pageType},page_id=eq.${pageId}`,
        },
        () => {
          loadComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pageType, pageId]);

  const loadComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('page_type', pageType)
      .eq('page_id', pageId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setComments(data);
    }
  };

  const handleSubmit = async () => {
    if (!newComment.trim() || !authorName.trim()) {
      toast({
        title: '请填写完整信息',
        description: '请输入您的名字和评论内容',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('comments').insert({
      page_type: pageType,
      page_id: pageId,
      author: authorName.trim(),
      content: newComment.trim(),
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: '评论失败',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: '评论成功',
        description: '您的评论已发布',
      });
      setNewComment('');
      setAuthorName('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-primary" />
        评论区
      </h2>

      {/* 发表评论 */}
      <div className="space-y-4 mb-8">
        <Input
          placeholder="您的名字"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="bg-background/50"
        />
        <Textarea
          placeholder="写下您的评论..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] bg-background/50"
        />
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="gap-2"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? '发送中...' : '发送'}
        </Button>
      </div>

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            暂无评论，来发表第一条评论吧！
          </div>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="p-4 bg-background/30">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-primary">{comment.author}</span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(comment.created_at)}
                </span>
              </div>
              <p className="text-muted-foreground">{comment.content}</p>
            </Card>
          ))
        )}
      </div>
    </Card>
  );
};
