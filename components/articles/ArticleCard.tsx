'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ReactionButton from './ReactionButton';
import { ArticleWithReactions, ReactionType } from '@/types/articles';

interface ArticleCardProps {
  article: ArticleWithReactions;
  onReact: (id: number, type: ReactionType) => void;
  authorName?: string;
  authorAvatar?: string;
}

const ArticleCard = ({ article, onReact, authorName, authorAvatar }: ArticleCardProps) => {
  return (
    <div className="border border-border rounded-lg p-4 hover:bg-muted/20 transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{article.title}</h3>
        {authorName && authorAvatar && (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={authorAvatar} alt={authorName} />
              <AvatarFallback>{authorName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{authorName}</span>
          </div>
        )}
      </div>

      {/* Content snippet */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {article.content.slice(0, 150)}...
      </p>

      {/* Reactions */}
      <div className="flex items-center gap-2 mt-2">
        <ReactionButton
          type="like"
          count={article.likes}
          active={article.reactions.liked}
          onClick={() => onReact(article.id, 'like')}
        />
        <ReactionButton
          type="dislike"
          count={article.dislikes}
          active={article.reactions.disliked}
          onClick={() => onReact(article.id, 'dislike')}
        />
        <ReactionButton
          type="heart"
          count={article.hearts}
          active={article.reactions.hearted}
          onClick={() => onReact(article.id, 'heart')}
        />

        {/* اقرأ المزيد */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm">
              اقرأ المزيد
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{article.title}</DialogTitle>
            </DialogHeader>

            {authorName && authorAvatar && (
              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={authorAvatar} alt={authorName} />
                  <AvatarFallback>{authorName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">بقلم: {authorName}</span>
              </div>
            )}

            <p className="text-sm leading-relaxed whitespace-pre-line">{article.content}</p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ArticleCard;
