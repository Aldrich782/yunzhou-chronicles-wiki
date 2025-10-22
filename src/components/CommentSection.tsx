import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  time: string;
}

export const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: '访客',
      content: newComment,
      time: new Date().toLocaleString('zh-CN')
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3>评论区</h3>
      </div>

      {/* 评论输入 */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-soft">
        <div className="space-y-4">
          <Textarea
            placeholder="写下你的看法..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary resize-none"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4 mr-2" />
              发送
            </Button>
          </div>
        </div>
      </Card>

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            暂无评论，来发表第一条吧
          </div>
        ) : (
          comments.map((comment) => (
            <Card
              key={comment.id}
              className="p-6 bg-card/30 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-primary">{comment.author}</span>
                  <span className="text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-foreground/90 leading-relaxed">{comment.content}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
