'use client';

import { useState, useCallback } from 'react';
import { articles as articlesData } from '@/data/articles';
import { authors } from '@/data/authors';
import ArticleCard from './ArticleCard';
import { ArticleWithReactions, ReactionType } from '@/types/articles';

// create a lookup map to avoid repeated .find calls
const authorsMap = Object.fromEntries(authors.map((a) => [a.id, a]));

export default function ArticlesSection() {
  const [articles, setArticles] = useState<ArticleWithReactions[]>(() =>
    articlesData.map((a) => ({
      ...a,
      likes: a.likes ?? 0,
      dislikes: a.dislikes ?? 0,
      hearts: a.hearts ?? 0,
      reactions: {
        liked: false,
        disliked: false,
        hearted: false,
      },
    }))
  );

  const handleReaction = useCallback((id: number, type: ReactionType) => {
    setArticles((prev) =>
      prev.map((article) => {
        if (article.id !== id) return article;

        const prevReactions = article.reactions;
        const nextReactions = {
          liked: false,
          hearted: false,
          disliked: false,
          [type === 'like' ? 'liked' : type === 'heart' ? 'hearted' : 'disliked']:
            !prevReactions[type === 'like' ? 'liked' : type === 'heart' ? 'hearted' : 'disliked'],
        };

        const likes = article.likes + (nextReactions.liked ? 1 : 0) - (prevReactions.liked ? 1 : 0);

        const hearts =
          article.hearts + (nextReactions.hearted ? 1 : 0) - (prevReactions.hearted ? 1 : 0);

        const dislikes =
          article.dislikes + (nextReactions.disliked ? 1 : 0) - (prevReactions.disliked ? 1 : 0);

        localStorage.setItem(`reactions-${id}`, JSON.stringify(nextReactions));

        return {
          ...article,
          likes,
          hearts,
          dislikes,
          reactions: nextReactions,
        };
      })
    );
  }, []);

  return (
    <section className="bg-card rounded-xl p-5 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-primary">📖 مقالات دينية مختارة</h2>

      <div className="space-y-4">
        {articles.map((article) => {
          const author = authorsMap[article.authorId];
          return (
            <ArticleCard
              key={article.id}
              article={article}
              onReact={handleReaction}
              authorName={author?.name}
              authorAvatar={author?.avatar}
            />
          );
        })}
      </div>
    </section>
  );
}
